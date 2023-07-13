import React from 'react'
import {Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";


function App() {
    return (
        <Routes>
            <Route exact path={'/'} element={<HomePage/>}/>
            <Route exact path={'/login'} element={<LoginPage/>}/>
            <Route exact path={'/register'} element={<RegisterPage/>}/>
        </Routes>
    );
}

export default App;
