import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchSingleShoe } from '../axios-services';
import Shoes from './Shoes';

const SingleShoe = ({setCartProducts}) => {
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
        <div className='container'>
        <div className='SingleShoe'>
            <br/>
        <h1 className='ui red header'>About These Shoes</h1>   
        <div className='ui segment'>
        <h2>Name: {singleShoe.shoename}</h2>
        <h2>Description:{singleShoe.description}</h2>
        <h2>Price:{singleShoe.price}</h2>
        <h2>Size:{singleShoe.size}</h2>
        <button className="ui button" onClick={(event) => {
            event.preventDefault()
            setCartProducts(singleShoe);
            }
        }>Add to Cart
        </button>
        </div>
        </div>
        </div>
    )

}
export default SingleShoe;
