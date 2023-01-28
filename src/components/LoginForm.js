import React, { useState, useEffect } from 'react';
import {fetchLogin} from '../axios-services';
import { useHistory } from 'react-router-dom';

const LoginForm = ({setToken}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const {error, token} = await fetchLogin(username, password);

        if (error) {
            console.error(error);
        }

        setToken(token);

        if (token) {
            history.push("/");
        }
    }

    return(
        <div className="ui inverted segment">
            <form className="ui inverted form" onSubmit={onSubmitHandler}>
                <h1>Log In!</h1>
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
                    Submit
                </button>
            </form>
        </div>
    )
}

export default LoginForm;