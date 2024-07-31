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

    // Function to fetch full product details by ID
    const fetchProductById = async (productId) => {
        try {
            const res = await axios.get(`https://my-shio-api.vercel.app/product/${productId}`);
            return res.data;
        } catch (err) {
            console.error('Failed to fetch product:', err);
            return null;
        }
    };

    const addCart = async (productId) => {
        if (!isLogged) return alert("Please log in first.");

        // Fetch full product details
        const product = await fetchProductById(productId);
        if (!product) {
            return alert("Failed to fetch product details.");
        }

        setCart(prevCart => {
            const isProductInCart = prevCart.some(item => item._id === product._id);

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
        addCart
    };
};

export default UserAPI;
