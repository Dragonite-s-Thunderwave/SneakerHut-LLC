
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

const AdminTools = () => {
    //create/delete/edit products
        //link to shoes -- if admin display buttons to create/edit/delete
    //view all users
        //link to users component
    //make user an admin
        //in users compnonent add edit button to make user an admin

    return (
        <>
        <div className="Admintools">
            <h1 className="ui red header">Admin Tools</h1>
            <button className="ui large button"><Link to="/AdminTools/users">Users</Link></button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="ui large button"><Link to="/Shoes">Shoes</Link></button>
        </div>    
        </>
    )
}

export default AdminTools;