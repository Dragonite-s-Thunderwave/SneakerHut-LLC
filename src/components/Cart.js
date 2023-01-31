import React, { useState, useEffect } from 'react';



// display shoes that are in order_products that have an userId of 
//join ? how to reference the userId from the orderId that order_products is referencing


// take off price from order_products (already on shoes)
// what is join???

const Cart = ({cartProducts, setCartProducts}) => {

    // useEffect(() => {
    //     window.localStorage.setItem('cartProducts', cartProducts);
    // }, [cartProducts])

// const cartItem = [{
//     id: cartProducts.id,
//     name: cartProducts.shoename,
//     description: cartProducts.description,
//     price: cartProducts.price,
//     image: cartProducts.image
// }]console.log('cartItem', cartItem)


console.log('cartProducts ID------', cartProducts.id)

console.log('CartProducts!!!!!!!', cartProducts)


return (
    <div>
        {cartProducts?.map((shoe) => {
            return (
                <>
                <p>{shoe.shoename}</p>
                <p>{shoe.description}</p>
                <p><img alt = 'cart shoe' src={shoe.image} width="200" height="200"/></p>
                </>
            )
        
        })}
        {cartProducts ? <div><button>CheckOut</button>{cartProducts.price}</div> : <h1>Nothing in Cart!</h1>}
    </div>
)


}


export default Cart;