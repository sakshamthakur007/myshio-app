import React from 'react';
import BtnRender from './BtnRender';

const ProductList = ({ product, isAdmin }) => {
  const handleCheckboxChange = (productId) => {
    // Handle checkbox change
    console.log(`Checkbox for product ${productId} changed`);
  };

  return (
    <div className='product_card'>import React from 'react';
import BtnRender from './BtnRender';

const ProductList = ({ product, isAdmin }) => {
  const handleCheckboxChange = (productId) => {
    // Handle checkbox change
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
      <img src={product.images || 'default_image_url.jpg'} alt={product.title} />

      <div className='product_box'>
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>

        <div className="row_btn">
          <BtnRender product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;

      
