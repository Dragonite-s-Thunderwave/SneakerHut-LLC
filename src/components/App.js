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
  const [cartProducts, setCartProducts] = useState([cartFromLocalStorage])

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
        setUsername(null);
        history.push('/');
    }

  return ( 
    <>
    <div className="ui grid">    
    <BrowserRouter>  
    
        <div className="four wide column">
            <br/>
            <Link className="item active" to="/cart">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i className="cart arrow down icon"></i>
                </Link>
            <div className="ui vertical fluid tabular menu">
                <Link className='item active' to="/">Home</Link>
                {token ? (
                    <Link className="item active" onClick={(event) => {
                        event.preventDefault();
                        logOut();
                    }}>Log Out</Link>
                ) : (<>
                    <Link className="item active" to="/login">Login</Link>
                    <Link className="item active" to="/register">Register</Link>
                    </>
                )}
                <Link className="item active" to="/shoes">Shoes</Link>
                {/* <Link className="item active" to="/orders">Orders</Link> */}
                <Link className="item active" to="/reviews">Reviews</Link>
                {user.isAdmin ? <Link className='item active' to="/AdminTools">Admin Tools</Link> : null}

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
                <Shoes /> 
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
                <Cart username={username} cartProducts={cartProducts} setCartProducts={setCartProducts}/>
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
