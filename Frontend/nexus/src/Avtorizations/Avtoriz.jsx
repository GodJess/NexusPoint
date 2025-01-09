import { useState } from 'react'
import './Avtoriz.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Avtoriz = ({setIsAuth})=>{

    const[userData, setUserData] = useState({password: "", number : ""})
    
    const[tokenPage, setTokenPage] = useState(false)
    const[token, setToken] = useState(null)
    const[confirm, setConfirm] = useState('')


    const CheckUserToken = ()=>{
        const fetch = async()=>{
            try{
                const response = await axios.post('http://127.0.0.1:8000/authToken/', userData)

                if(response.data != null ){
                    if(response.data.result == true && response.data.token != null){
                        setToken(response.data.token)
                        setTokenPage(true)
                    }
                    else if(response.data.result == true && response.data.token == null){
                        checkUser()
                    }
                }
            }
            catch{
                console.log('Error')
            }

        }

        fetch()
    }


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
                { tokenPage === false ? 
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
                                            <input className="enterText" type="password" placeholder="Enter password"
                                            value={userData.password} onChange={el=>setUserData(prev=>({...prev, password: el.target.value}))}
                                            />
                                        </div>
                    
                                        <div className="button-logIn">
                                            <button onClick={()=>{CheckUserToken()}}>Log In</button>
                                        </div>  
                                        <div className="other-avtoriz">
                                            <button><ion-icon name="logo-google"></ion-icon></button>
                                            <button><ion-icon name="logo-apple"></ion-icon></button>
                                        </div>
                                        <div className="LinkTo">
                                            <p>Don`t have an account?<Link to="/register/" className='link'>Sing Up</Link> </p>
                                        </div>
                
                                    </div>
                                : 
                                    <div className="froms-avtoriz">
                                        <div className="formName"><h1>Code Confirmation</h1></div>
                    
                                        <div className="input-name"><p>Enter the code</p></div>
                                        <div className="form-input">
                                            <input className="enterText" type="text" placeholder="Enter code from u email" 
                                            value={confirm} onChange={el=>{setConfirm(el.target.value)}}
                                            />
                                        </div>
                    
                                        <div className="button-logIn">
                                            <button onClick={()=>{
                                                if(confirm == token){checkUser()}
                                                else{
                                                    alert("invalid code")
                                                }
                                                }}>Confirm</button>
                                        </div>  
            
                                    </div>
                }

            </div>
        </div>
    )
}
export default Avtoriz