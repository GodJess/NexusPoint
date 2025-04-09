
import { useState } from 'react'
import './Avtoriz.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = ()=>{

    const[application, setApplication] = useState({login: '', name: '', surname: '', birthday: '', country: '', mail: '', phone: '', descript: ''})
    const[tokenPage, setTokenPage] = useState(false)
    const[token, setToken] = useState(null)
    const[confirm, setConfirm] = useState('')


    const CreateApplication = ()=>{
        const fetch = async()=>{
            try{
                let response = await axios.post('http://127.0.0.1:8000/createApplication/', application)
                if(response){
                    setTokenPage(false)
                    setApplication({login: '', name: '', surname: '', birthday: '', country: '', mail: '', phone: '', descript: ''})
                    alert('The application was created successfully')
                }
            }
            catch{
                setTokenPage(false)
                setApplication({login: '', name: '', surname: '', birthday: '', country: '', mail: '', phone: '', descript: ''})
                alert('Problems have occurred, please try again later')
            }
        }
        fetch()
    }

    const CheckApplication = ()=>{
        const fetch = async()=>{
            if(
                application.login !== '' &&
                application.name !== '' &&
                application.surname !== '' &&
                application.birthday !== '' &&
                application.country !== '' &&
                application.mail !== '' &&
                application.phone !== ''
             ){
                try{
                    let response = await axios.post('http://127.0.0.1:8000/checkApplication/', application)
                    if(response.data.result == true){
                        setTokenPage(true)
                        setToken(response.data.token)
                    }
                    else{
                        alert(response.data.error)
                    }
                }
                catch(error){
                    console.log(error)
                }
                
             }
             else{
                alert('The fields must be filled in')
             }
        }
        fetch()
    }

    return(
        <div className="main-awtoriz-window">
            <div className="window-avtoriz">

                {  tokenPage === false ?
                
                        <div className="froms-avtoriz">
                        <div className="formName"><h1>Sing Up</h1></div>
                        <div className="input-name"><p>User name </p></div>
                        <div className="form-input">
                            <input className="enterText" value={application.login} onChange={el=>setApplication(prev=>({...prev, login: el.target.value}))} type="text" placeholder="Enter username(login)" />
                        </div>
                        <div className="input-name"><p>Your data </p></div>
                        <div className="form-input-two-fields">
                            <input className="enterText W" type="text" value={application.name} onChange={el=>setApplication(prev=>({...prev, name: el.target.value}))} placeholder="Enter first-name" />
                            <input className="enterText W" type="text" value={application.surname} onChange={el=>setApplication(prev=>({...prev, surname: el.target.value}))} placeholder="Enter last-name" />
                        </div> 

                        <div className="input-name x"><p>Your birthday </p> <p>Country </p></div>
                        <div className="form-input-two-fields">
                            <input className="enterText W" value={application.birthday} onChange={el=>setApplication(prev=>({...prev, birthday: el.target.value}))} type="date"/>
                            <select className="select" name="country" id="country"
                                value={application.country}
                                onChange={el => setApplication(prev => ({ ...prev, country: el.target.value }))}
                            >
                                <option value="">United States</option>
                                <option value="United States">United States</option>
                                <option value="China">China</option>
                                <option value="Russia">Russia</option>
                                <option value="Canada">Canada</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Brazil">Brazil</option>
                                <option value="Argentina">Argentina</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Germany">Germany</option>
                                <option value="France">France</option>
                                <option value="Italy">Italy</option>
                                <option value="Spain">Spain</option>
                                <option value="Japan">Japan</option>
                                <option value="South Korea">South Korea</option>
                                <option value="India">India</option>
                                <option value="Australia">Australia</option>
                                <option value="South Africa">South Africa</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Egypt">Egypt</option>
                                <option value="Saudi Arabia">Saudi Arabia</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Philippines">Philippines</option>
                                <option value="Vietnam">Vietnam</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Iran">Iran</option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="Poland">Poland</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Sweden">Sweden</option>
                            </select>
                        </div>

                        <div className="input-name"><p>Email</p></div> 
                        <div className="form-input">
                            <input className="enterText" value={application.mail} onChange={el=>setApplication(prev=>({...prev, mail: el.target.value}))} type="mail" placeholder="Enter email" />
                        </div>
                        
                        <div className="input-name"><p>Phone</p></div> 
                        <div className="form-input">
                            <input className="enterText" value={application.phone} onChange={el=>setApplication(prev=>({...prev, phone: el.target.value}))} type="text" placeholder="Enter phone" />
                        </div>

                        <div className="input-name"><p>Description</p></div> 
                        <div className="form-input">
                            <textarea value={application.descript} onChange={el=>setApplication(prev=>({...prev, descript: el.target.value}))} name="" id="" className='enterText R' placeholder='Enter description of your activity'></textarea>
                        </div>

                        <div className="button-logIn">
                            <button onClick={()=> CheckApplication()}>Sing Up</button>
                        </div>  
                        <div className="other-avtoriz">
                            <button><ion-icon name="logo-google"></ion-icon></button>
                            <button><ion-icon name="logo-apple"></ion-icon></button>
                        </div>
                        <div className="LinkTo">
                            <p>Do you have an account?<Link to="/" className='link'>Log in</Link> </p>
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
                                if(confirm == token){
                                    CreateApplication()
                                }
                                else{
                                    alert('Invalid code')
                                }
                            }}>Confirm</button>
                        </div>  
            
                    </div>
                }

                


                
            </div>
        </div>
    )
}
export default Register