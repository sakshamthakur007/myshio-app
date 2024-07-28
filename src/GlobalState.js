import { createContext, useEffect } from "react";
import ProductAPI from "./api/ProductAPI";
import { useState } from "react";
import axios from "axios";
import UserAPI from "./api/UserAPI";

export const GlobalState = createContext()

export const DataProvider = ({children}) => {

    const [token,setToken] = useState(false)

    const refreshToken = async () => {
    try {
      const res = await axios.get('https://my-shio-api.vercel.app/user/refresh_token', {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      setToken(res.data.accesstoken);
    } catch (error) {
      console.error("Failed to refresh token:", error.response ? error.response.data : error.message);
    }
  };

    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin) refreshToken()
    },[])

    const state = {
        token: [token,setToken],
        productsAPI:ProductAPI(),
        userAPI:UserAPI(token)
    }

    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
