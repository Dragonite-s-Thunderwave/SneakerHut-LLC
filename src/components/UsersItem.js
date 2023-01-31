import React, {useState, useEffect} from 'react';
import {fetchUpdateUser} from '../axios-services/index'

const UsersItem = ({user, token}) => {
    
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if(token) {
            const makeAdmin = async () => {
                const admin = await fetchUpdateUser(token, user.id);
                setIsAdmin(admin)
            }
        }
    })
    
    return (
        <>
            <div>
                <h4>{user.username}</h4>
                <p>{user.email}</p>
                <p>{user.isAdmin}</p>
                <p>{user.fullName}</p>
                <p>{user.address}</p>
                <p>{user.city}</p>
                <p>{user.state}</p>
                <p>{user.zip}</p>
                <button onClick={(event) => {

                }}>Make Admin</button>
            </div>
        </>
    )
}

export default UsersItem;