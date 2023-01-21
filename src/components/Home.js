import React from "react";
import {Link} from "react-router-dom";
// import './Home.css';


const Home = ({username, token}) => {
    return (
        <div>
            <h1>Welcome to SneakerHut!</h1>
            {username || token ? <h3>You are logged in as: {username}</h3> : (
            <div>
                <h2>Please <Link to="AccountForm/login">Log In</Link></h2>
                <h3>Not a member? <Link to="AccountForm/register">Sign Up!</Link></h3>
            </div>
            )}
        </div>
    )
}

export default Home;