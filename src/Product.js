import React from 'react';
import './Product.css';
import { useStateValue } from './StateProvider';

function Product({id,title,image,price,rating}){
    const [{basket},dispatch] = useStateValue();

    console.log("this is in the basket", basket);
    const addToBasket = () =>{
        //displatch item into the data layer
        dispatch({
            type : 'ADD_TO_BASKET',
            item:{
                id : id,
                title : title,
                image :image,
                price : price,
                rating : rating,

            },
        });
    };
    return(
        <div className='product'>
            <div className='product_info'>
                <p> {title} </p>
                <p className='product_price'>
                    <small>$ </small>
                    <strong>{price}</strong>
                </p>
                <div class='product_rating'>
                    {Array(rating).fill().map((_, i)=> (<p> <img className="star_rating" src="https://static8.depositphotos.com/1338574/831/i/600/depositphotos_8318731-stock-photo-gold-star.jpg"/> </p>)
                    )}
                    
                    
                </div>
            </div>
            <img className="product_image" src={image}/>
            <button onClick={addToBasket}> Add To Basket</button>
        </div>

    )
}

export default Product;