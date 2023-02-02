import React, { useState, useEffect } from 'react';

import { Home, LoginForm, RegisterForm, Reviews, Shoes, Orders, SingleOrder, SingleShoe, CreateReview, Cart, AdminTools, Users, EditUser, CreateShoes, NewAdmin } from './';


// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth, fetchGuest, fetchReviews, getAllUsers, fetchAllShoes } from '../axios-services/index';
import '../style/App.css';1
import {BrowserRouter, Link, Route, Switch, useHistory} from "react-router-dom";


const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")


const App = () => {
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState(null);
  const [user, setUser] = useState([]);
  const [submit, setSubmit] = useState(false)
  const [shoes, setShoes] = useState([]);
  const [token, setToken] = useState(
      window.localStorage.getItem("token") || null
  );
  const [cartProducts, setCartProducts] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  console.log('cartProducts!!!!!', cartProducts)

  console.log('this is cart from local storage', cartFromLocalStorage)
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  }, [cartProducts])

  const history = useHistory();

  useEffect(() => {
    const getReviews = async () => {
    try{
        const result =await fetchReviews(token);
        setReviews(result);
    } catch(error) {
        console.error("There was an error fetching reviews", error)
    }
  }
  getReviews();
}, [])  

useEffect(() => {
    const getShoes = async () => {
    const shoesFromAPI = await fetchAllShoes();
    setShoes(shoesFromAPI);
    setSubmit(false)
    };
    getShoes()
}, [submit])

  useEffect(() => {
    if (token) {
        const getGuest = async () => {
            const {username} = await fetchGuest(token);
            console.log(username)
            setUsername(username)
        };
        getGuest();
    }
    }, [token])

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                const user = await fetchGuest(token);
                setUser(user)
            };
            getUser();
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
        setUser([])
        history.push('/');
    }

  return ( 
    <>
   <div className='container'>
      
    <BrowserRouter>  
    <div className="menu"> 

        <div>
            <div className="ui massive borderless inverted secondary vertical menu">
                <Link className="red item active" to="/cart">
                    <div>
                    <i className="cart arrow down icon"></i>
                    </div>
                </Link>
            <br/>  
                <Link className='active red item' to="/">Home</Link>
                <br/>
                <Link className="active red item" to="/shoes">Shoes</Link>
                <br/>
                {/* <Link className="item active" to="/orders">Orders</Link> */}
                <Link className="active red item" to="/reviews">Reviews</Link>
                <br/>
                {user.isAdmin ? <Link className='active red item' to="/AdminTools">Admin Tools</Link> : null}
                {token ? (
                    <Link className="active red item" onClick={(event) => {
                        event.preventDefault();
                        logOut();
                    }}>Log Out</Link>
                ) : (<>
                    <Link className="active red item" to="/login">Login</Link>
                    <br/>
                    <Link className="active red item" to="/register">Register</Link>
                    </>
                )}
                <br/>
            </div>
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
                <RegisterForm setToken={setToken} user={user}/>
            </Route>         
            <Route className="item" path='/shoes/create'>
                <CreateShoes setShoes={setShoes} setSubmit={setSubmit} token={token}/>
            </Route>    
            <Route path='/Shoes/:shoeId'>
                <SingleShoe cartProducts={cartProducts} setCartProducts={setCartProducts}/> 
            </Route>
            
            <Route path='/Shoes'>
              <Shoes token={token} cartProducts={cartProducts} setCartProducts={setCartProducts} setSubmit={setSubmit} user={user} setCartTotal={setCartTotal} cartTotal={cartTotal}/> 
            </Route>
            <Route path='/orders/:orderId'>
                <SingleOrder/> 
            </Route>
            <Route path='/orders'>
                <Orders/> 
            </Route>            
            <Route path='/Reviews'>
                <Reviews /> 
            </Route>
            {/* <Route path="/Review/create">
                    <CreateReview token={token} setReviews={setReviews}/>
            </Route> */}
            <Route path="/cart">
                <Cart username={username} setCartTotal={setCartTotal} cartTotal={cartTotal} cartProducts={cartProducts} setCartProducts={setCartProducts}/>
            </Route>
            <Route path="/AdminTools/users/:userId">
                <EditUser />
            </Route>
            <Route path="/AdminTools/users">
                <Users token={token} />
            </Route>
            <Route path="/AdminTools">
                <AdminTools />
            </Route>
            <Route path="/newadmin">
                <NewAdmin />
            </Route>
        </Switch>
        </div>
  </BrowserRouter>
</div>
</>
)

};

export default App;
