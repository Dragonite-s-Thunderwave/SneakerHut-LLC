import React from "react";
import LogoImage from "./photos/LogoImage.png"; //having issue with importing an image
import { Link } from "react-router-dom";



const Home = ({username, token}) => {
    return (
        <div>
            <h1> </h1>
            {username || token ? <div><h3>Welcome {username}, you're logged now.</h3><img className="LogoImage" src={LogoImage} alt="store logo" width={950} height={370}/></div>  : (
            <div>
                <img className="LogoImage" src={LogoImage} alt="store logo" width={950} height={370}/>
            </div>
            )}
        </div>
    )
}

export default Home;