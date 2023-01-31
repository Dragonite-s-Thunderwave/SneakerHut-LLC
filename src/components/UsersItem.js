import React from 'react';

const UsersItem = ({user}) => {
    return (
        <>
            <div>
                <h4>{user.username}</h4>
            </div>
        </>
    )
}

export default UsersItem;