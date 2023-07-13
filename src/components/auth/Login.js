import React from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {setUser} from "../../store/userSlice";
import Form from "./Form";


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user, 'loginUser')
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }))
                navigate('/')
            })
            .catch(() => alert('Invalid user'))
    }
    return (
        <div>
            <Form
                title={'sing in'}
                handleClick={handleLogin}
            />
        </div>
    );
};

export default Login;