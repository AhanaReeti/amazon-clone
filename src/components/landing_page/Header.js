import React from 'react';
import '../../css/landing_page/Header.css';
import amazonlogo from '../../image/amazonlogo.png';
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon  from '@material-ui/icons/ShoppingBasket';
import {Link} from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import {auth} from "../../config/firebase";

function Header(){

    const [{basket,user},dispatch] = useStateValue();
    const handleAuthentication =() =>{
        if(user){
            auth.signOut();
        }
    }


    return(
        <div className ='header'>
            <Link to="/">
            <img className='header_logo' 
            src='https://logosmarken.com/wp-content/uploads/2020/04/Amazon-Logo.png'/>
            </Link>
            

        <div className='header_search'>
            <input type="text" className="header_searchInput"/>
            <SearchIcon className='header_searchIcon'/>

        </div>
        
        <div className='header_nav'>
            <Link to={!user && '/login'}>
                <div onClick={handleAuthentication} className='header_option'>
                    <span className='header_optionLine1'> Hello {!user ? 'Guest' : user.email} </span>
                    <span className='header_optionLine2'> {user ? 'Sign Out' : 'Sign In'} </span>
                </div>
            </Link>
            <Link to='/orders'>
            <div className='header_option'>
                <span className='header_optionLine1'> Returns</span>
                <span className='header_optionLine2'> Orders </span>
            </div>
            </Link>
            <div className='header_option'>
                <span className='header_optionLine1'> Yours</span>
                <span className='header_optionLine2'> Prime </span>
            </div>
            <Link to="/Checkout">
                <div className='header_basket'>
                    <ShoppingBasketIcon/>
                    <span className='header_optionLine2 header_BasketCount'>{basket?.length}</span>
                </div> 
            </Link>

           
        </div>
    
    </div>
        

    )


}

export default Header