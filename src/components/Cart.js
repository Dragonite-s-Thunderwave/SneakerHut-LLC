import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Shoes from './Shoes';




const Cart = ({cartProducts, setCartProducts, cartTotal, setCartTotal}) => {




function currencyFormat(num) {
    return '$' + Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

let localCart = localStorage.getItem("cart");
const [count, setCount] = useState(1)
const [total, setTotal] = useState(0)


useEffect(() => {
    localCart = JSON.parse(localCart);
    if (localCart) setCartProducts(localCart)
}, [])

// function handlePlusClick() {
//     setCartProducts({...cartProducts, shoe: {...cartProducts.shoe, quantity: })
// }


 

console.log('cartProducts ID------', cartProducts.id)

console.log('CartProducts!!!!!!!', cartProducts)
console.log('cartTotal', cartTotal)
let cartAmount = currencyFormat(cartTotal)

// const handleQuantChange = event => {
//     const { name, value, label } = event.target;
//     let labelName = [label] + '.' + [name]
//     setCartProducts(prevState => ({
//         ...prevState,
//         [label]: {
//         ...labelName,
//         [name]: value
//         }
//     }));
// };

return (
    <>
    <div className='container'>
    <div className='Cart'>
    <br/>
    <br/>   
    <div className='ui segment'>
    <div>{cartProducts.length > 0?
        <>
        <h1 className='ui red header'>Here's your shopping cart!</h1>
        <p></p>
        {cartProducts?.map((shoe) => {
            let price = currencyFormat(shoe.price)
            let quant = Number(shoe.quantity)
            // setTotal(shoe.price + total)
            return (
            <>
                <div class="two column row">
                    <div className='ui card'>
                    <div key={shoe.id} >
                <p><img alt = 'cart shoe' src={shoe.image} width="200" height="200"/></p>
                <h3>{shoe.shoename}</h3>
                <p>Description: {shoe.description}</p>
                <p><b>Price: </b> {price}</p>
                <div class="ui input focus">
                {/* <p>Quantity: </p>
                    <input type="number" name='quantity' label={shoe.id} size='1' maxLength="3" placeholder="1" value={quant} onChange={handleQuantChange}/> */}
                </div>
                {/* <button onClick={() => {
                    // setCount(count + 1)
                    // setTotal((( count + 1) * shoe.price))
                    setCartProducts((prevCart) => [...prevCart, shoe]) 
                    shoe.quantity + 1
                }}>
                    Add one more!
                </button></p>  */}
                {/* <button onClick={(event) => {
                    event.preventDefault();
                    console.log('shoeiddddd', shoe.id)
                    removeItem(shoe.id)
                }}>Remove from cart</button> */}
                <p></p>
                </div>
                </div>

                </div>
                <p></p>
        </>
        )
        

        })}                
        <p></p><div>Total: {cartAmount}     
        <p><button>CheckOut</button></p></div>
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
    </div>
    </div>
    </div>

    </>
)


}


export default Cart;