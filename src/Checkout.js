import React from 'react';

import './Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';


import Subtotal from './Subtotal';

function Checkout(){

    const [{basket,user}, dispatch] = useStateValue();

    return (
        <div className='checkout'>
            <div className='checkout_left'>
                <img className='checkout_ad' src='https://images-eu.ssl-images-amazon.com/images/G/31/prime/PEX/PeX-Top-PC-1500X375.jpg'/>
                <div className='checkout_title'>
                    <h3> Hello, {user?.email}</h3>
                    <h2 className='checkout_title'> Your Shopping Basket</h2>
                        {basket.map(item => ( <CheckoutProduct
                            id ={item.id}  image ={item.image} title={item.title}
                            price ={item.price} rating ={item.rating}
                        />)
                            
                        )}

                    
                    
                </div>
            
            </div>


            <div className='checkout-right'>
                <Subtotal/>
                
            </div>
        </div>

    )
}
export default Checkout;