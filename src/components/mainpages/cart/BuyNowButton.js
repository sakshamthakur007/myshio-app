// components/BuyNowButton.js

import React from 'react';
import { useHistory } from 'react-router-dom';

const BuyNowButton = ({ onClick, label = 'Buy Now' }) => {
    const history = useHistory();

    const handleClick = () => {
        if (onClick) {
            onClick(); // Call the provided onClick function
        }
        history.push('/checkout'); // Navigate to the checkout page
    };

    return (
        <button 
            className='buy-now-button' 
            onClick={handleClick}
            style={{ 
                padding: '10px 20px', 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                fontSize: '1rem'
            }}
        >
         Buy Now
        </button>
    );
};

export default BuyNowButton;
