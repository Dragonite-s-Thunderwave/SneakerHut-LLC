import React from "react";
import LogoImage from "./photos/LogoImage.png"; //having issue with importing an image
import { Link } from "react-router-dom";
// import './Home.css';


const Home = ({username, token}) => {
    return (
        <div>
            <h1> </h1>
            {username || token ? <h3>Welcome {username}, you're logged in.</h3> : (
            <div>
                <img className="LogoImage" src={LogoImage} alt="store logo" width={950} height={700}/>
            </div>
            )}
        </div>
    )
}

export default Home;