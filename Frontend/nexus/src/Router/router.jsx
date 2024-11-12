import App from "../App"
import Register from "../Avtorizations/Register"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Analitics from "../Analitics/Analitics"
import Settings from "../Settings/Settings"

const Router = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<App />} path='/' />
                <Route element ={<Register />} path='/register/' />
                <Route element={<Analitics />} path="/analitics/" />
                <Route element={<Settings />} path="/settings/" />
            </Routes>
        </BrowserRouter>
    )
}

export default Router