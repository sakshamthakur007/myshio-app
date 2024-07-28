import { createContext, useEffect, useState } from "react";
import axios from "axios";
import ProductAPI from "./api/ProductAPI";
import UserAPI from "./api/UserAPI";

axios.defaults.withCredentials = true; // Ensure cookies are sent with every request

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);

    const refreshToken = async () => {
        try {
            const res = await axios.get('https://my-shio-api.vercel.app/user/refresh_token', {
                withCredentials: true,
            });
            setToken(res.data.accesstoken);
        } catch (error) {
            console.error("Failed to refresh token:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if (firstLogin) refreshToken(); // Refresh token only if the user is logged in
    }, []);

    const state = {
        token: [token, setToken],
        productsAPI: ProductAPI(),
        userAPI: UserAPI(token),
    };

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
};
