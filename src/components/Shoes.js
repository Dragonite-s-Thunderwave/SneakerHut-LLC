import React, { useState, useEffect } from 'react';
import { fetchAllShoes } from '../axios-services';
import { Link } from 'react-router-dom';


const Shoes = ({cartProducts, setCartProducts}) => {
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

  
    const mappedShoes = shoesList?.map((shoe) => {
        let price = currencyFormat(shoe.price)
        return (
            
            <div>

                <div class="two column row">
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
                        <button onClick={(event) => {
                            console.log('shoequant', shoe.quantity)
                            event.preventDefault();

                            if (shoe.quantity = 0 || !shoe.quantity) {                            
                            shoe.quantity = 1 
                            setCartProducts((prevCart) => [...prevCart, shoe]);
                            } else {
                                shoe.quantity + 1
                            }
                        }}>Add to Cart
                        </button>
                    </div>
                    </div>
                    </div>
          </div>          
        )
    })
 
    return (
        <div>
            <h1 className="title">Shoes</h1>
            <div class="ui four column grid">
                {mappedShoes}
            </div>
            <br/>
            <Link to="/shoes/create" className="ui button">Sell Your Shoes!</Link>
        </div>
        
    )
}



export default Shoes;












