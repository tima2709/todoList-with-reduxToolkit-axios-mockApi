import React from 'react';
import SingUp from "../components/auth/SingUp";
import {Link} from "react-router-dom";

const RegisterPage = () => {
    return (
        <div>
            <h1>Register</h1>
            <SingUp/>
            <p>already have an account <Link to={'/login'}>sing in</Link></p>
        </div>
    );
};

export default RegisterPage;