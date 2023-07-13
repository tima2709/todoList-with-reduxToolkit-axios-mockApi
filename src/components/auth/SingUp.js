import React from 'react';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setUser} from "../../store/userSlice";
import Form from "./Form";

const SingUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleRegister = (email, password) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user, 'registerUser')
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken
                }));
                navigate('/')
            })
            .catch(() => alert('Invalid email or password'))
    }
    return (
        <Form
            title={'register'}
            handleClick={handleRegister}
        />


    );
};

export default SingUp;