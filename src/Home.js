import React from 'react';
import './Home.css';
import Product from './Product';

function Home(){

    return(
        <div className='home'> 
            <div className='home_container'>
               <img className='home_image' src="https://images-eu.ssl-images-amazon.com/images/G/03/kindle/journeys/YTNkYTJjMWMt/YTNkYTJjMWMt-NDI3ODEwNTkt-w1500._CB412282605_.jpg" 
               alt=""/> 

               <div className='home_row'>
                    <Product id='111' title='The lean start up. 
                    How Constant innovation creates radically successfully business items.'
                    price={119.99} image='https://images-na.ssl-images-amazon.com/images/I/81KsuPhxOML._AC_SL1500_.jpg'
                    rating={5}/>
                     <Product id='112' title='The lean start up. 
                    Smart and Super Fast laptop.'
                    price={29.99} image='https://images-na.ssl-images-amazon.com/images/I/71O%2BltdAY8L._AC_SX466_.jpg'
                    rating={4}/>
                   
                </div>
                <div className='home_row'>
                <Product id='114' title='The lean start up. 
                    User friendly Mixer Machine.'
                    price={339.99} image='https://images-na.ssl-images-amazon.com/images/I/61yXAt6IgnL._AC_SL1000_.jpg'
                    rating={3}/>
                       <Product id='115' title='The lean start up.Nice and beautiful Coffee Machine.' 
                    
                    price={449.99} image='https://images-na.ssl-images-amazon.com/images/I/81KsuPhxOML._AC_SL1500_.jpg'
                    rating={5}/>
                         <Product id='116' title='The lean start up.Fast and Efficient Charger.'
                   
                    price={29.99} image='https://m.media-amazon.com/images/I/41sJGLzOKGL.jpg'
                    rating={4}/>
                </div>
                <div className='home_row'>
                <Product id='117' title='The lean start up. 
                    Nice and Trendy bag.'
                    price={29.99} image='https://m.media-amazon.com/images/I/71Ba+rno3FL._AC_UL320_.jpg'
                    rating={4}/>
                    
                </div>
            </div>    
        </div>
        
    )
}
    
export default Home;