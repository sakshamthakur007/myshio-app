import React, { useContext } from 'react';
import { GlobalState } from '../../../../GlobalState';
import { Link } from 'react-router-dom';

const BtnRender = ({ _id }) => {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const addCart = state.userAPI.addCart;

    return (
        <div className='row_btn'>
            {isAdmin ? (
                <>
                    <Link id='btn_buy' to={`#!`} >
                        Delete
                    </Link>
                    <Link id='btn_view' to={`detail/${_id}`}>
                        Edit
                    </Link>
                </>
            ) : (
                <>
                    <Link id='btn_buy' to={`#!`} onClick={() => addCart({ _id })}>
                        Buy
                    </Link>
                    <Link id='btn_view' to={`detail/${_id}`}>
                        View
                    </Link>
                </>
            )}
        </div>
    );
};

export default BtnRender;
