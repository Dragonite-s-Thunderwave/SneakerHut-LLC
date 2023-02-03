import React from 'react';
import { Link } from 'react-router-dom';

const Orders = ({user, cartTotal, username, token}) => {
    function currencyFormat(num) {
        return '$' + Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
    
    let cartAmount = currencyFormat(cartTotal)

    return (
        <><h2>Please Review Your Information:</h2>
            <div>
                <p><h4>Name:</h4>{user.fullName}</p>
                <p><h4>Email:</h4>{user.email}</p>
                <p><h4>Address:</h4>{user.address}</p>
                <p><h4>City:</h4>{user.city}</p>
                <p><h4>State:</h4>{user.state}</p>
                <p><h4>Zip:</h4>{user.zip}</p>
                <p><h4>Credit Card Number:</h4>{user.creditCardInfo}</p>
            </div>
            <p></p><div><h3>Total:</h3><h4>{cartAmount}</h4></div>
            <p></p>
            <p></p>
            <button>Place Order!</button>
        </>
    )
}

export default Orders;

