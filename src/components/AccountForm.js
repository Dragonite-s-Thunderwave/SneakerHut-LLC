import React, { useState, useEffect } from 'react';
import { fetchLogin, fetchRegister } from '../axios-services';
import { useParams, useHistory } from 'react-router-dom';

const AccountForm = ({setToken}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {action} = useParams();
    const history = useHistory();

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const authenticated = action === "register" ? fetchRegister : fetchLogin;

        const {error, token} = await authenticated(username, password);

        if (error) {
            console.error(error);
        }

        setToken(token);

        if (token) {
            history.push("/");
        }
    }

    const title = action === "login" ? "Log In" : "Sign Up";

    return(
        <div className="ui inverted segment">
            <form className="ui inverted form" onSubmit={onSubmitHandler}>
                <h1>{title}</h1>
                <div className="field">
                    <label>Username</label>
                        <input 
                        type="text" 
                        value={username} 
                        placeholder="username" 
                        required
                        onChange={(event) => {
                            setUsername(event.target.value)
                        }}
                        />
                </div>
                <div className="field">
                    <label>Password</label>
                        <input 
                        type="password" 
                        value={password} 
                        placeholder="password" 
                        minLength="8"
                        required
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}/>
                </div>
                <button className="ui button" type="submit">
                    {title}
                </button>
            </form>
        </div>
    )
}

export default AccountForm;