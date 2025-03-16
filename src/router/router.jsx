import React, { Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import Login from "../pages/login/login.jsx";
import {getUserInfo} from "../utils/server.js";
import Home from "../pages/home/home.jsx";


export const Loader = () => (
    <div className="loaderWindow">
        <div className="loader"/>
    </div>
);

const Router = () => {

    const {data: userInfo, isLoading} = getUserInfo()
    // AGAR FOYDALUVCHI ro'yxatdan otgan bo`lsa
    if (userInfo) {
        return <Suspense fallback={<Loader/>}>
            {
                isLoading ? <Loader/> : ""
            }
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<h1>NOT FOUND</h1>}/>
            </Routes>
        </Suspense>
    }
    // AGAR FOYDALUVCHI MALUMOTI Bo`lmasa
    else {
        return (
            <Suspense fallback={<Loader/>}>
                {
                    isLoading ? <Loader/> : ""
                }
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<h1>NOT FOUND</h1>}/>
                </Routes>
            </Suspense>
        );
    }
}

export default Router;