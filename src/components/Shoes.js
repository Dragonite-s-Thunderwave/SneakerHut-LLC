import React, { useState, useEffect } from 'react';
import { fetchAllShoes } from '../axios-services';


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












