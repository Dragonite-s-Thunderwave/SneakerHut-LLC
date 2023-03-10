import React, { useState, useEffect } from 'react';
import { fetchAllShoes, deleteShoes } from '../axios-services';
import { Link } from 'react-router-dom';



const Shoes = ({token, cartProducts, setCartProducts, setSubmit, user, setCartTotal, cartTotal}) => {

    const [shoesList, setShoesList] = useState([]);

    function currencyFormat(num) {
        return '$' + Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }

    useEffect(() => {
        async function fetchShoes() {
            try {
                const allShoes = await fetchAllShoes();
                setShoesList(allShoes)
            } catch (error) {
                console.error(error)
            }
        }
        fetchShoes()
    }, [])

    const onClickDelete = async(id) => {
        console.log(id)
        const deleted = await deleteShoes(token, id)
        setSubmit(true)
    }
  


const mappedShoes = shoesList?.map((shoe) => {
    let price = currencyFormat(shoe.price)
        return (
            <div>
                <div className="three column row">
                    <div className='ui card'>
                    <div key={shoe.id} >
                        <Link to={`/shoes/${shoe.id}`}>
                            {shoe.shoename}
                        </Link>
                        <p>{shoe.username}</p>
                        <img src ={shoe.image} width="200" height="200"/>
                        <p>Description: {shoe.description}</p>
                        <p>Type: {shoe.type}</p>
                        <p>Price: {price}</p>

                        {user.isAdmin ? null : <button className='ui button' onClick={(event) => {
                            console.log('shoequant', shoe.quantity)

                            event.preventDefault();

                            if (shoe.quantity = 0 || !shoe.quantity) {                            
                            setCartTotal(Number(cartTotal) + Number(shoe.price))
                            shoe.quantity = 1 
                            setCartProducts((prevCart) => [...prevCart, shoe]);
                            } else {
                                shoe.quantity + 1
                            }
                        }}>Add to Cart
                        </button>}
                        {user.isAdmin ? <button onClick={() => onClickDelete(shoe.id)} className="ui orange button">Delete</button> : null}
                    </div>
                    </div>
                    </div>
          </div>          
        )
    })
 
    return (
        <div>
            <div className='container'>
            <br/>
            <div className="Shoes">
            <br/> 
             <h1 className="ui red header">Shoes</h1>   
             <br/>
            
            <div className="ui four column grid">
                {mappedShoes}
            </div>
            <br/>
            <br/>
            {user.isAdmin ? <Link to="/shoes/create" className="ui button">Add Products</Link> : null}
           </div> 
            </div>
            <br/>
            
        </div>
        
    )
}



export default Shoes;












