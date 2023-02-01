import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Cart = ({cartProducts, setCartProducts}) => {

let localCart = localStorage.getItem("cart");
console.log('what the hell?', JSON.parse(localCart))

const addShoe = (shoe) => {
    let cartCopy = [...cartProducts];

    let {ID} = shoe;

    let existingShoe = cartCopy.find(cartShoe => cartShoe.ID == ID);

    if (existingShoe) {
        existingShoe.quantity += shoe.quantity
    } else {
        cartCopy.push(shoe)
    }

    setCartProducts(cartCopy)

    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart)
}

const editShoe = (shoeID, amount) => {
    let cartCopy = [...cartProducts]

    let existingItem = cartCopy.find(cartShoe => cartShoe.ID == shoeID)

    if (!existingItem) return

    existingItem.quantity += amount;

    if (existingItem.quantity <= 0) {
        cartCopy = cartCopy.filter(cartShoe => cartShoe.ID != shoeID)
    }

    setCartProducts(cartCopy);

    let cartString = JSON.stringify(cartCopy)
    localStorage.setItem("cart", cartString)
}

const removeItem = (shoeID) => {
    let cartCopy = [...cartProducts]

    cartCopy = cartCopy.filter(cartShoe => cartShoe.ID != shoeID);
    console.log('cartshoe', cartShoe)
    setCartProducts(cartCopy);

    let cartString = JSON.stringify(cartCopy)
    localStorage.setItem("cart", cartString)
}

useEffect(() => {
    localCart = JSON.parse(localCart);
    if (localCart) setCartProducts(localCart)
}, [])



 

console.log('cartProducts ID------', cartProducts.id)

console.log('CartProducts!!!!!!!', cartProducts)


return (
    <div>{cartProducts.length > 0?
        <>
        <h1>Here's your shopping cart!</h1>

        <p></p>
        {cartProducts?.map((shoe) => {
            return (<>
                <div class="two column row">
                    <div className='ui card'>
                    <div key={shoe.id} >
                <p><img alt = 'cart shoe' src={shoe.image} width="200" height="200"/></p>
                <h3>{shoe.shoename}</h3>
                <p>Description: {shoe.description}</p>
                <p><b>Price: </b> {shoe.price}</p>
                <p><b>Quantity: </b> {shoe.quantity}</p>
                <button onClick={(event) => {
                    event.preventDefault();
                    console.log('shoeiddddd', shoe.id)
                    removeItem(shoe.id)
                }}>Remove from cart</button>
                <p></p>
                </div>
                </div>
                <div>Total: $10203.00      <button>CheckOut</button></div>
                </div>

        </>
        )
        
        })}
        </>
        : 
        <>

        <div>
        <h1>Cart is empty</h1>
        <h3>Check out some of our <Link className="item active" to="/shoes">shoes</Link>!</h3>
        </div>

        
        
        </> 
        }
        
    </div>
)


}


export default Cart;