import React from 'react';
import { Link } from 'react-router-dom';
import BtnRender from './BtnRender';

const ProductList = ({ product, isAdmin }) => {
  console.log(product);

  const handleCheckboxChange = (productId) => {
    // Implement the function to handle checkbox change for admin
    console.log(`Checkbox for product ${productId} changed`);
  };

  return (
    <div className='product_card'>
      {isAdmin && (
        <input 
          type='checkbox' 
          checked={product.checked} 
          onChange={() => handleCheckboxChange(product._id)}
          aria-label={`Select ${product.title}`}
        />
      )}
      <img src={product.images?.url || 'default_image_url.jpg'} alt={product.title} />

      <div className='product_box'>
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>

      <BtnRender product={product} />
    </div>
  );
};

export default ProductList;
