import React, { useState, useEffect } from 'react';
import { fetchAllShoes } from '../axios-services';
import { Link } from 'react-router-dom';


const Shoes = () => {
    const [shoesList, setShoesList] = useState([]);

    useEffect(() => {
        async function fetchShoes() {
            try {
                const allShoes = await fetchAllShoes();
                console.log('allshoesss', allShoes)
                setShoesList(allShoes)
            } catch (error) {
                console.error(error)
            }
        }
        fetchShoes()
    }, [])

    console.log(shoesList)
    const mappedShoes = shoesList.map((shoe) => {
        return (
            <div>
                <Link to={`/shoes/${shoe.id}`}>
                    {shoe.shoename}
                </Link>
                <div>
                    <p>Description: {shoe.description}</p>
                    <p>Type: {shoe.type}</p>
                    <p>Price: ${shoe.price}</p>
                </div>
            </div>
        )
    })
 
    return (
        <div>
            <h1>Shoes:</h1>
            <div>
                {mappedShoes}
            </div>
        </div>
    )
}



export default Shoes;












