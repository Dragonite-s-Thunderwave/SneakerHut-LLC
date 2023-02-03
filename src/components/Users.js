import React, {useState, useEffect} from "react";
import UsersItem from './UsersItem';
import { getAllUsers } from "../axios-services/index";

const Users = ({token}) => {
    const [allUsers, setAllUsers] = useState([]);
    console.log('pleasepleaseplease', allUsers)

    useEffect(() => {
        if (token) {
            const returnAllUsers = async () => {
                const allUsers = await getAllUsers(token);

                setAllUsers(allUsers)
            }
            returnAllUsers();
        };

    }, [token])
    
        
    return (<>

        <div className="container">
        <div className="Cart">
        <br/>
        <br/>
        <div className="ui segment">
            <h1>All Users</h1>
            {allUsers.map((user) => {
                return  <UsersItem key={user.id} user={user} token={token} />
            })}
        </div>
        </div>
        </div>    
    </>
    )
}

export default Users;