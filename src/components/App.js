import React, { useState, useEffect } from 'react';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import '../style/App.css';
import {Link, Route, Switch, useHistory} from "react-router-dom";

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(
      window.localStorage.getItem("token") || null
  );
  const [cart, setCart] = useState({})

  const history = useHistory();

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  // useEffect(() => {
  //   const getShoes = async () => {
  //     try {
  //       const result = await 
  //     }
  //   }
  // })


  // this works, can come back to this ----------->?

//   return (
//     <div>
//         <h1>Welcome to SneakerHut!</h1>
//         {username || token ? <h3>You are logged in as: {username}</h3> : (
//         <div>
//             {/* <h2>Please <Link to="AccountForm/login">Log In</Link></h2>
//             <h3>Not a member? <Link to="AccountForm/register">Sign Up!</Link></h3> */}
//         </div>
//         )}
//     </div>
// )



//new stuff here------------>

return (
  <div className="container">
      <nav className="ui secondary menu">
          <Link className="item" style={{color: "white"}} to="/">
              Home
          </Link>
          <Link className="item" style={{color: "white"}} to="/Shoes">
              Shoes
          </Link>
          <Link className="item" style={{color:"white"}} to="/Reviews">
              Reviews
          </Link>
          <div className="right menu">
              {token ? (
                  <button className="ui item" style={{color: "white"}} onClick={(event) => {
                      event.preventDefault();
                      logOut();
                  }}>Log Out</button>
              ):(
              <>
                  <Link className="ui item" style={{color: "white"}} to="/AccountForm/login">
                      Log In
                  </Link>
                  <Link className="ui item" style={{color: "white"}} to="/AccountForm/register">
                      Sign Up    
                  </Link>    
              </>
              )}
          </div>
      </nav>

      <Switch>
          <Route exact path="/" >
              <Home username={username} token={token}/>
          </Route>
          <Route path="/shoes/:shoeId">
              <SingleShoe shoes={shoes} token={token} />
          </Route>
          <Route path="/shoes/create">
              <CreateShoes token={token} shoes={shoes}/>
          </Route>
          <Route path="/Reviews">
              <Reviews reviews={reviews} token={token} />
          </Route>
          <Route path="/Reviews/create">
              <CreateReviews token={token} setReviews={setReviews}/>
          </Route>               
          <Route path="/Revies/users/:username">
              <UsersReviews reviews={reviews} username={username} token={token}/>
          </Route>                
          <Route path="/Orders">
              <Orders orders={orders} token={token}/>
          </Route>
          <Route path="/orders/:orderId">
              <SingleOrder token={token} orders={orders} />
          </Route>
          <Route path="/AccountForm/:action">
              <AccountForm setToken={setToken}/>
          </Route>
      </Switch>

  </div>

);












};

export default App;
