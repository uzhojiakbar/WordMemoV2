import React, {lazy, Suspense, useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Login from "../pages/login/login.jsx";



export const Loader = () => (
    <div className="loaderWindow">
        <div className="loader"/>
    </div>
);

const Router = () => {
    return (
        <Suspense fallback={<Loader/>}>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="*" element={<h1>NOT FOUND</h1>}/>
            </Routes>
        </Suspense>
    );
}

export default Router;