import React from 'react';
import { Link } from 'react-router-dom';

const UsersItem = ({user, token}) => {
    
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
                <button><Link to="/newadmin">Make Admin</Link></button>
            </div>
        </>
    )
}

export default UsersItem;