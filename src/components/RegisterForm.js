import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { fetchRegister } from "../axios-services"

const RegisterForm = ({setToken}) => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [creditCardInfo, setCreditCardInfo] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const {error, token} = await fetchRegister(
            username,
            password,
            email,
            fullName,
            creditCardInfo,
            address,
            city,
            state,
            zip
        );

        if(error) {
            console.error("There was an error creating your account", error)
        }

        setToken(token);

        if(token) {
            history.push('/');
        }
    }

    return (
        <div>
            <form className="uiform" onSubmit={onSubmitHandler}>
                <h1>Create an Account!</h1>
                <div className="field">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        placeholder="username"
                        required
                        onChange={(event) => {
                            setUsername(event.target.value);
                        } } />
                </div>
                <div className="field">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        placeholder="password"
                        minLength="8"
                        required
                        onChange={(event) => {
                            setPassword(event.target.value);
                        } } />
                </div>
                <div className="field">
                    <label>Email Address</label>
                    <input
                        type="text"
                        value={email}
                        placeholder="email"
                        required
                        onChange={(event) => {
                            setEmail(event.target.value);
                        } } />
                </div>
                <div className="field">
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        placeholder="Full Name"
                        required
                        onChange={(event) => {
                            setFullName(event.target.value);
                        } } />
                </div>
                <div className="field">
                    <label>Credit Card Number</label>
                    <input
                        type="text"
                        value={creditCardInfo}
                        placeholder="credit card"
                        required
                        onChange={(event) => {
                            setCreditCardInfo(event.target.value);
                        } } />
                </div>
                <div className="field">
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        placeholder="Address"
                        required
                        onChange={(event) => {
                            setAddress(event.target.value);
                        } } />
                </div>
                <div className="field">
                    <label>City:</label>
                    <input
                        type="text"
                        value={city}
                        placeholder="city"
                        required
                        onChange={(event) => {
                            setCity(event.target.value);
                        } } />
                </div>
                <div className="field">
                    <label>State:</label>
                    <input
                        type="text"
                        value={state}
                        placeholder=""
                        required
                        onChange={(event) => {
                            setState(event.target.value);
                        } } />
                </div>
                <div className="field">
                    <label>Zip Code:</label>
                    <input
                        type="text"
                        value={zip}
                        placeholder=""
                        required
                        onChange={(event) => {
                            setZip(event.target.value);
                        } } />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default RegisterForm;
