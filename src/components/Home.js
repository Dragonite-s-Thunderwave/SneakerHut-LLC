import React from "react";
import LogoImage from "./photos/LogoImage.png"; //having issue with importing an image
import { Link } from "react-router-dom";
// import './Home.css';


const Home = ({username, token}) => {
    return (
      
        <img className="LogoImage" src={LogoImage} alt="store logo"/>

        
    )
}

export default Home;