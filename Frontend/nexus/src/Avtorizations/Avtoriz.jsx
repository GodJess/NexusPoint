import { useState } from 'react'
import './Avtoriz.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Avtoriz = ({setIsAuth})=>{

    const[userData, setUserData] = useState({password: "", number : ""})
    
    const checkUser = ()=>{
        const fetchUser = async()=>{
            const response = await axios.post("http://127.0.0.1:8000/getData/", userData)
            console.log(response.data)

            if(response.data != null){
                console.log(response.data.user_id)
                setUserData({password: "", number : ""})
                localStorage.setItem('userId', response.data.user_id)
                setIsAuth(true)
                window.location.reload()
            }
        }
        fetchUser()
    }
    return(                                                                                                                     
        <div className="main-awtoriz-window">
            <div className="window-avtoriz">
                <div className="froms-avtoriz">
                    <div className="formName"><h1>Log In</h1></div>
                    <div className="input-name"><p>Email or phone number</p></div>
                    <div className="form-input">
                        <input className="enterText" type="text" placeholder="Enter email or phone number" 
                        value={userData.number} onChange={el=>setUserData(prev=>({...prev, number: el.target.value}))}
                        />
                    </div>
                    <div className="input-name"><p>Password | <Link className='link'>Forgot password</Link></p></div>
                    <div className="form-input">
                        <input className="enterText" type="text" placeholder="Enter password"
                        value={userData.password} onChange={el=>setUserData(prev=>({...prev, password: el.target.value}))}
                        />
                    </div>

                    <div className="button-logIn">
                        <button onClick={()=>{checkUser()}}>Log In</button>
                    </div>  
                    <div className="other-avtoriz">
                        <button><ion-icon name="logo-google"></ion-icon></button>
                        <button><ion-icon name="logo-apple"></ion-icon></button>
                    </div>
                    <div className="LinkTo">
                        <p>Don`t have an account?<Link to="/register/" className='link'>Sing Up</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Avtoriz