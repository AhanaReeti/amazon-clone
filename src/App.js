import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import { useEffect } from 'react';
import {auth} from "./firebase";
import { useStateValue } from './StateProvider';
import { SignalCellularNull } from '@material-ui/icons';
import Payement from './Payement';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from './Orders';

// this will asynchronously load the stripe js and initialize the stripe object.
const promise = loadStripe("pk_test_51IORW9LozV0yTN5MDYeSR2soPjuOfXKUW6gffmQ2sfJyaYtSVhuflWbR2QZUQMmmmHpdnjZuUOPkJF1bF1kHRHy400hiPbqFLz");

function App() {
  const [{},dispatch] = useStateValue();

  useEffect(() => {
    //we are attaching a listener to the component to keep track of the user
    auth.onAuthStateChanged(authUser => {
      console.log("the user is", authUser );
      if(authUser) {
         // the user logged in or was logged in 
         dispatch({
           type : 'SET_USER',
           user : authUser
         })
      }else{
        //the user logged out
        dispatch({
          type : 'SET_USER',
          user : null               
        })
      }
     
    })

  },[]) // this will run only once when the component loads


  return (
    //BEM
<Router>
  <div className="App">
  
    <Switch>
    <Route path="/orders">
          <Header/>  
          <Orders/>
       </Route>
    <Route path="/login">
            
           <Login/>
      </Route>
      <Route path="/checkout">
          <Header/> 
          <Checkout/>
      </Route>
      <Route path='/payement'>
          <Header/> 
          <Elements stripe={promise}>
            <Payement/>
          </Elements>
          
          
      </Route>
      <Route path="/">
          <Header/> 
          <Home/>
      </Route>
    </Switch>
    </div>
    </Router>
  );
}

export default App;
