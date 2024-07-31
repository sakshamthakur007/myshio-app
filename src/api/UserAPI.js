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
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
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

        console.log('Adding product to cart:', product);
        console.log('Current cart:', cart);

        const check = cart.every(item => item._id !== product._id);
        console.log('Check result:', check);

        if (check) {
            setCart(prevCart => {
                const newCart = [...prevCart, { ...product, quantity: 1 }];
                // Optionally, you can add code to update the cart on the server here.
                console.log('Updated cart:', newCart);
                return newCart;
            });
            console.log('Product added to cart:', product);
        } else {
            alert("This product has already been added to the cart.");
        }
    };

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart
    };
};

export default UserAPI;
