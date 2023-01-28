import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { fetchAllOrders } from '../axios-services';



const Orders = () => {
    const [ orderList, setOrderList ] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const orders = await fetchAllOrders();
                console.log('orders heerrree!!', orders)
                setOrderList(orders)
            } catch (error) {
                console.error(error)
            }
        }
        fetchOrders()
    }, [])

    console.log('orderList', orderList)

        const mapOrders = orderList.map((order) => {
        return (
            <div>
                <h3>OrderId: {order.id}</h3>
                <h3>OrderUser: {order.userId}</h3>
                <h3>OrderStatus: {order.status}</h3>
                <h3>OrderTotal: {order.total}</h3>
            </div>

        )
        })    
        
    return (
        <>
        <h2>Orders</h2>
        <div>
             {mapOrders}
        </div>
        </>
    )    


}


export default Orders

