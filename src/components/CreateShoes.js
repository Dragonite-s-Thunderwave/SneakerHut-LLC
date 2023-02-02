import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createShoes } from '../axios-services';
import { Link } from 'react-router-dom';

const CreateShoes = ({token, setShoes}) => {
        const [shoename, setShoename] = useState("");
        const [description, setDescription] = useState("");
        const [price, setPrice] = useState("");
        const [type, setType] = useState('');
        const [size, setSize] = useState('');
        const [image, setImage] = useState('')
        const [errorMessage, setErrorMessage] = useState('');
        const history = useHistory();

    useEffect(() => {token ? null :  history.push('/login')
})

const onCreateShoeSubmitHandler = async(event) => {
    try{
    event.preventDefault();
    console.log(token)
    const shoe  = await createShoes({
        token, 
        shoename,
        description,
        price,
        type,
        size,
        image,
   })
   console.log("here",shoe)
    if(shoe){
        //console.log(shoe);
        setShoes((prevShoe) => [...prevShoe, shoe])
        // setSubmit(true)
        setShoename('');
        setDescription('');
        setPrice(0);
        setType('');
        setSize(0);
        setImage('');
        setErrorMessage('')
        history.push('/shoes')}
    }catch(error){
        console.error("There was an error creating shoes", error)
    }
}   


    return(
        <>
        <div>
        <div className='container'>
        <div className='CreateShoes'>
            <form onSubmit={onCreateShoeSubmitHandler} className="ui inverted segment">
                <div className='ui form'>
                    <h1 color='#9900FF'>Tell us about the product!</h1>
                    <label>Shoe Name</label>
                        <input 
                            type="text" 
                            className="feild" 
                            value={shoename}
                            onChange={(event) => setShoename(event.target.value)}
                            placeholder="Air Jordan's">
                        </input>
                    <label>Add a picture of the shoes</label>
                        <input
                            type="url" 
                            className="feild"
                            value={image}
                            placeholder="add photo here"
                            onChange={(event) => setImage(event.target.value)}>
                        </input>
                    <label>Description</label>
                        <input
                            type="text" 
                            className="feild" 
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="Tell us about your shoes">
                        </input>
                    <label>Type</label>
                         <input 
                            type="text" 
                            className="feild" 
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                            placeholder="Ex: Women's Sneakers">
                        </input>
                    <label>Shoe Size</label>
                        <input 
                            type="number" 
                            className="feild" 
                            value={size}
                            onChange={(event) => setSize(event.target.value)}
                            placeholder="7">
                        </input>
                    <label>Price</label>
                        <input 
                            type="number" 
                            className="feild" 
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                            placeholder="$">
                        </input>
                </div>
                {errorMessage ? (<p className="ui negative message">{errorMessage}</p>) : null}
                <br/>
                <button  className="ui button" type="submit">Post</button>
             <Link to='/shoes' className="ui button">Back</Link>   
            </form>
        </div>
        </div>
        </div>
        </>
    )
}

export default CreateShoes;
