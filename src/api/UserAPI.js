import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserAPI = (token) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('https://my-shio-api.vercel.app/user/infor', {
                        headers: { Authorization: token }
                    });

                    setIsLogged(true);
                    setIsAdmin(res.data.role === 1);
                } catch (err) {
                    alert(err.response.data.msg);
                }
            };
            getUser();
        }
    }, [token]);

    
   const addCart = (product) => {
        if (!isLogged) return alert("Please log in first.");
       
        const check = cart.every(item => item.id !== product._id);

        if (check) {
             console.log("hey");
            setCart([...cart, { ...product, quantity: 1 }]);
        } else {
             console.log("ney");
            alert("This product has already been added to the cart.");
        }
    };

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart
    };
};

export default UserAPI;
