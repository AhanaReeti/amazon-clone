import React from "react";
import "../../css/checkout/checkoutProduct.css";
import { useStateValue } from '../../StateProvider';

function CheckoutProduct({id,image,title,price,rating,hideButton}){

    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket =() => {
        //remove item from basket
        dispatch({
            type : 'REMOVE_FROM_BASKET',
            id:id,
        })
    }
    return (
        <div className='checkoutProduct'>

            <img className='checkoutProduct_image'  src={image}/>
            <div className='checkoutProduct_info'>
                <p className='checkoutProduct_title'> {title} </p>
                <p className='checkoutProduct_price'> <small> $ </small> <strong>{price}</strong> </p>
            
            <div className='checkoutProduct_rating'> 
                {Array(rating).fill().map((_, i) => (<p> <img className="star_rating" src="https://static8.depositphotos.com/1338574/831/i/600/depositphotos_8318731-stock-photo-gold-star.jpg"/>  </p>))}
            </div>
            {!hideButton && (
                <button onClick={removeFromBasket} class='checkout_button'> Remove from Basket</button>
            )}
            
        </div>
    </div>
    )
}

export default CheckoutProduct;