import React, { useEffect, useState } from 'react';
import {db} from "../../config/firebase";
import '../../css/order/Orders.css';
import { useStateValue } from '../../StateProvider';
import Order from './Order';

function Orders(){

    const[{basket,user}, dispatch] = useStateValue();
    
    const[orders,setOrders] = useState([]);
    // the orders are returned as docs and we are iterating and for every doc we return an object 
    useEffect(() => {
        if(user){
            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
                    id : doc.id,
                    data : doc.data()
                })
                
            ))
        ))
        }else{
            setOrders([])
        }
        

        

    }, [user])
     
    return (
        <div className='orders'>
            <h1> Your Orders </h1>
            <div className='orders_orderContainer'> 
                {orders?.map(order => (
                    <Order order = {order} />
                ))}
            </div>
        </div>
    )
}

export default Orders;