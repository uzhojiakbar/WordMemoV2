import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TestPage from "./src/TestPage.jsx";
import Root from "./root/root.jsx";
import "./fonts.css"
import "./App.css"

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Root/>
            {/*<Routes>*/}
            {/*    <Route path="/" element={ <App/>} />*/}
            {/*    <Route path="/test/:date/:type" element={<TestPage />} />*/}
            {/*    <Route path="*" element={<h1>SAHIFA MAVJUD EMAS </h1>} />*/}
            {/*</Routes>*/}
        </BrowserRouter>
    </StrictMode>,
)
