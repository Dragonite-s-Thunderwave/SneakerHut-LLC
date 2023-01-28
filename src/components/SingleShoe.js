import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchSingleShoe } from '../axios-services';

const SingleShoe = () => {
    const { shoeId } = useParams()
    const [ singleShoe, setSingleShoe ] = useState([]);
    console.log("shoeId", shoeId)
    console.log('singleshoe', singleShoe)

    useEffect(() => {
        async function SingleShoePage() {
            try {
                const shoe = await fetchSingleShoe(shoeId);
                console.log('this here..', shoe)
                setSingleShoe(shoe)
            } catch (error) {
                console.error(error)
            }
        } 
        SingleShoePage()
    }, [shoeId])


    return (
        <div>
        <h2>Name:{singleShoe.shoename}</h2>
        <h2>Owner:{singleShoe.username}</h2>
        <h2>Description:{singleShoe.description}</h2>
        <h2>Price:{singleShoe.price}</h2>
        <h2>Size:{singleShoe.size}</h2>
        <Link>Add to cart</Link>
        </div>
    )

}
export default SingleShoe;
