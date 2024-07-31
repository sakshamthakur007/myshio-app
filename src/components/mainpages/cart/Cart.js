import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;

  console.log(cart);

  if (cart.length === 0) {
    return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>;
  }

  return (
    <div>
      {cart.map(item => {
        // Ensure item and product exist
        const product = item;

        if (!product) {
          console.error('Product data is missing:', item);
          return <p key={item._id}>Product data is missing</p>;
        }

        if (!product.images) {
          console.error('Product images are missing:', product);
          return <p key={product._id}>Image data is missing</p>;
        }

        return (
          <div key={product._id} className='detail'>
            {/* Use default image if product.images is not a string or is undefined */}
            <img 
              src={typeof product.images === 'string' ? product.images : 'https://via.placeholder.com/150'} 
              alt={product.title || 'Product Image'} 
            />
            <div className='box-detail'>
              <div className='row'>
                <h2>{product.title || 'No Title'}</h2>
                <h6>Product ID: {product.product_id || 'No ID'}</h6>
              </div>
              <span>${product.price || 'No Price'}</span>
              <p>{product.description || 'No Description'}</p>
              <p>{product.content || 'No Content'}</p>
              <p>Sold: {product.sold || 'No Data'}</p>
              <Link to='/checkout' className='cart'>Buy Now</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
