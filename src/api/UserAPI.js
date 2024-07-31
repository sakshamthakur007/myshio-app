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
                    console.log(res);
                } catch (err) {
                    alert(err.response.data.msg);
                }
            };
            getUser();
        }
    }, [token]);

   const addCart = (product) => {
    if (!isLogged) return alert("Please log in first.");

    setCart(prevCart => {
        const productId = String(product._id); // Ensure product ID is a string
        const isProductInCart = prevCart.some(item => String(item._id) === productId);

        console.log('Product ID to add:', productId);
        console.log('Is product in cart:', isProductInCart);

        if (isProductInCart) {
            alert("This product has already been added to the cart.");
            return prevCart; // No change to the cart
        } else {
            const newCart = [...prevCart, { ...product, quantity: 1 }];
            console.log('New cart:', newCart);
            return newCart;
        }
    });
};



    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart
    };
};

export default UserAPI;
