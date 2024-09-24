import App from "../App"
import {BrowserRouter, Routes, Route} from 'react-router-dom'


const Router = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<App />} path='/' />
            </Routes>
        </BrowserRouter>
    )
}

export default Router