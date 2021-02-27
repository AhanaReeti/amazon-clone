import React, { useEffect, useState } from 'react';
import CheckoutProduct from './CheckoutProduct';
import './Payement.css';
import { useStateValue } from './StateProvider';
import {Link} from 'react-router-dom';
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from "./reducer";
import { useHistory } from 'react-router-dom';
import axios from "./axios";
import {db} from './firebase';



function Payement(){
    const [{basket,user}, dispatch] = useStateValue();

    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);    
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    // useEffect runs when payment is loaded and any dependency changes
    useEffect(() => {
        // generate the stripe secret to which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method : 'post',
                // stripe accepts currency in subunits 
               url : `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('the secret is:', clientSecret)

    const handleSubmit = async(event) =>{
        // all the stripe stuff
        // stop the page from refreshing
        event.preventDefault();
        //can only click the Buy button once
        setProcessing(true); 
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method : {
                card : elements.getElement(CardElement)
            }
        }).then(({ paymentIntent } ) => {

            //No-sql data structure (we are storing user by Id and then we are storing the user orders by 
            // payementIntent id.)
            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({

             // we set the basket before emptying 
               basket : basket,  
            // we set the amount that comes from stripe
               amount : paymentIntent.amount, 
            // we will get the timestamp of when the order was created   
               created : paymentIntent.created 
            })


            // paymentIntent = payment confirmation
            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')

        })

    }

    const handleChange = event => {
        // listen for changes in card element
        // displays any error as the customer types the card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (

        <div className='payement'>
            <div className='payement_container'>
                <h1> 
                    Checkout (<Link to='/checkout'> {basket?.length} items </Link> )

                </h1>
                {/* payement section -- delivery address*/}
                <div className='payement_section'>
                    <div className='payement_title'>
                        <h3> Delivery Address</h3>
                    </div>
                    <div className='payement_address'>
                        <p> Hello , {user?.email} </p> 
                        <p> Konigstein strasse 5</p>
                        <p> 80807 Munich ,Germany</p>
                    </div>
                </div>
                {/* payement section -- review address*/}
                <div className='payement_section'>
                    <div className='payement_title'>
                        <h3> Review Items and Delivery</h3>
                    </div>
                    <div className='payement_items'>
                        {/* reusing the component*/}
                        {basket.map(item => (
                            <CheckoutProduct id ={item.id}  image ={item.image} title={item.title}
                            price ={item.price} rating ={item.rating} />
                        ))}
                    </div>
                </div>
                {/* payement section -- payement method*/}
                <div className='payement_section'>
                    <div className='payement_title'>
                        <h3> Payement Method </h3>
                    </div>
                    <div className='payement_details'>
                            {/* stripe functionality*/ }
                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange} />
                                <div className='payment_priceContainer'>  
                                <CurrencyFormat
                                    renderText ={(value) => (
                                    <>
                                        <h3> Order Total : {value} </h3>
                                    </>
                                    )}
                                    decimalScale ={2}
                                    value ={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator ={true}
                                    prefix={"$"}

                                    />
                                    <button disabled = {processing || disabled 
                                    || succeeded}> 
                                        <span> {processing ? <p> Processing </p> : "Buy Now"} </span>
                                    </button>
                                </div>
                                {error && <div> {error} </div>}
                            </form>
                    </div>
                   
                </div>
            </div>

        </div>
    )
}

export default Payement;