import React from "react";
import LogoImage from "./photos/LogoImage.png"; //having issue with importing an image
import { Link } from "react-router-dom";



const Home = ({username, token}) => {
    return (
        <div className="Home">
            <h1> </h1>
            {username || token ? <div><h3 className="welcome">Welcome {username}, you're logged now.</h3><img className="LoggedinLogo" src={LogoImage} alt="store logo" width={1200} height={470}/></div>  : (
            <div>
                <img className="LogoImage" src={LogoImage} alt="store logo" width={1250} height={520}/>
            </div>
            )}
        </div>
    )
}

export default Home;