import React, { useState, useEffect } from 'react';
import { fetchAllShoes } from '../axios-services';
import { Link } from 'react-router-dom';


const Shoes = () => {
    const [shoesList, setShoesList] = useState([]);

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


    const mappedShoes = shoesList.map((shoe) => {
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
                        <p>Price: {shoe.price}</p>
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












