import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingleOrder } from '../axios-services';


const SingleOrder = () => {
    const { orderId } = useParams()
    const [ singleOrder, setSingleOrder ] = useState([])
    console.log("orderId", orderId)

    useEffect(() => {
        async function singleOrderPage() {
            try {
                const order = await fetchSingleOrder(orderId);
                console.log('this here order', order)
                setSingleOrder(order)
            } catch (error) {
                console.error(error)
            }
        }
        singleOrderPage()
    }, [orderId])

    console.log('singleorderuserid', singleOrder.userId)
    return (
        <div>
            <h2>1st order goes here{singleOrder.id}</h2>
        </div>
    )

}


export default SingleOrder;
