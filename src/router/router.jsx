import React, {lazy, Suspense, useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Login from "../pages/login/login.jsx";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {getUserInfo} from "../utils/server.js";


export const Loader = () => (
    <div className="loaderWindow">
        <div className="loader"/>
    </div>
);

const Router = () => {

    const {data: userInfo, isLoading} = getUserInfo()
    console.log("userinfooo", userInfo)

    if (userInfo) {
        return <Suspense fallback={<Loader/>}>
            {
                isLoading ? <Loader/> : ""
            }
            <Routes>
                <Route path="/" element={<div>app</div>}/>
                <Route path="*" element={<h1>NOT FOUND</h1>}/>
            </Routes>
        </Suspense>
    } else {
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