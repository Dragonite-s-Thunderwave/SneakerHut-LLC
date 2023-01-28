import React, { useState, useEffect } from 'react';

import { Home, LoginForm, RegisterForm, Reviews, Shoes, Orders, SingleShoe, SingleOrder } from './';

// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth, fetchGuest } from '../axios-services';
import '../style/App.css';
import {BrowserRouter, Link, Route, Switch, useHistory} from "react-router-dom";

const App = () => {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(
      window.localStorage.getItem("token") || null
  );


  const history = useHistory();


  useEffect(() => {
    if (token) {
        const getGuest = async () => {
            const {username} = await fetchGuest(token);
            setUsername(username)
        };
        getGuest();
    }
    }, [token])

    useEffect(() => {
        if (token) {
            window.localStorage.setItem("token", token)
        } else {
            window.localStorage.removeItem("token")
        }
    }, [token])

    const logOut = () => {
        setToken(null);
        setUsername(null);
        history.push('/');
    }

  return ( 
    <>
    <div className="ui grid">    
    <BrowserRouter>  
        <div className="four wide column">
            <div className="ui vertical fluid tabular menu">
                <Link className='item active' to="/">Home</Link>
                <Link className="item active" to="/shoes">Shoes</Link>
                <Link className="item active" to="/orders">Orders</Link>
                <Link className="item active" to="/reviews">Reviews</Link>
                <Link className="item active" to="/login">Login</Link>
                <Link className="item active" to="/register">Sign Up</Link>
            </div>
        </div>
        <div className="twelve wide stretched column">
            
    
        <Switch>
            <Route exact path="/">
                <Home token={token} username={username}/>
            </Route>
            <Route path="/login">
                <LoginForm setToken={setToken}/>
            </Route>
            <Route path="/register">
                <RegisterForm setToken={setToken}/>
            </Route>
            <Route path='/Shoes'>
                <Shoes /> 
            </Route>
            <Route path='/orders'>
                <Orders username={username}/> 
            </Route>
            <Route path='/orders'>
                <Orders username={username}/> 
            </Route>
            <Route path='/Reviews'>
                <Reviews /> 
            </Route>
        </Switch>

        </div>
  </BrowserRouter>
</div>


</>
)


//new stuff here------------>

// return (
//   <div> 
//       <nav>
//           <Link style={{color: "black"}} to="/">
//               Home
//           </Link>
//           <Link style={{color: "black"}} to="/Shoes">
//               Shoes
//           </Link>
//           <Link style={{color:"black"}} to="/Reviews">
//               Reviews
//           </Link>
//           <div>
//               {token ? (
//                   <button className="ui item" style={{color: "white"}} onClick={(event) => {
//                       event.preventDefault();
//                       logOut();
//                   }}>Log Out</button>
//               ):(
//               <>
//                   <Link className="ui item" style={{color: "white"}} to="/AccountForm/login">
//                       Log In
//                   </Link>
//                   <Link className="ui item" style={{color: "white"}} to="/AccountForm/register">
//                       Sign Up    
//                   </Link>    
//               </>
//               )}
//           </div>
//       </nav>

//       <Switch>
//           <Route exact path="/" >
//               <Home username={username} token={token}/>
//           </Route>
//           <Route path="/shoes/:shoeId">
//               <SingleShoe shoes={shoes} token={token} />
//           </Route>
//           <Route path="/shoes/create">
//               <CreateShoes token={token} shoes={shoes}/>
//           </Route>
//           <Route path="/Reviews">
//               <Reviews reviews={reviews} token={token} />
//           </Route>
//           <Route path="/Reviews/create">
//               <CreateReviews token={token} setReviews={setReviews}/>
//           </Route>               
//           <Route path="/Revies/users/:username">
//               <UsersReviews reviews={reviews} username={username} token={token}/>
//           </Route>                
//           <Route path="/Orders">
//               <Orders orders={orders} token={token}/>
//           </Route>
//           <Route path="/orders/:orderId">
//               <SingleOrder token={token} orders={orders} />
//           </Route>
//           <Route path="/AccountForm/:action">
//               <AccountForm setToken={setToken}/>
//           </Route>
//       </Switch>

//   </div>

// );


};

export default App;
