import React, { useState } from "react";
import '../../css/authentication/Login.css';
import {Link, useHistory} from 'react-router-dom';
import {auth} from "../../config/firebase";

function Login(){
    // gives access to history instance to navigate
    const history = useHistory();
    const[email,setEmail] = useState('');
    const[password,setPassword] =useState('');
    const signIn = (e) => {
        // no refreshing
        e.preventDefault();
        // some firebase login 
        auth.signInWithEmailAndPassword(email,password)
        .then((auth) => {
            history.push('/')
        }).catch(error => alert(error.message))
    }
    
    const register = (e) => {
        e.preventDefault();
        // some firebase register
        auth.createUserWithEmailAndPassword(email,password)
        //it successfully created a new user with email and password
        .then((auth) => {
            
            if(auth){
                // forcing to redirect
                history.push('/')
            }
        }).catch(error => alert(error.message))
        
    }
    return(
        <div className='login'>
                <Link to="/">
                    <img className="login_logo" src="https://logosmarken.com/wp-content/uploads/2020/04/Amazon-Logo.png"/>
                </Link>
            <div className='login_container'>
                <h1> Sign In </h1>
                <form>
                    <h5> Email Id </h5>
                        <input type="text"  value={email} 
                        onChange={e => setEmail(e.target.value)}/>
                    <h5> Password </h5>
                         <input type="password" value={password} 
                         onChange={e=> setPassword(e.target.value)}/>
                    <button className='login_button' type="submit"
                    onClick={signIn}> Sign In </button>
                </form>
                <p> By siging in , you agree to Amazon's fake clone Conditions of Use and Privacy Notice.</p>
                <button className='login_register' onClick={register}> Create a New Account</button>
           </div>  


        </div>
    )
}

export default Login;