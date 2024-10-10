import App from "../App"
import Register from "../Avtorizations/Register"
import {BrowserRouter, Routes, Route} from 'react-router-dom'


const Router = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<App />} path='/' />
                <Route element ={<Register />} path='/register/' />
            </Routes>
        </BrowserRouter>
    )
}

export default Router