
import './Avtoriz.css'
import { Link } from 'react-router-dom'

const Register = ()=>{
    return(
        <div className="main-awtoriz-window">
            <div className="window-avtoriz">
                <div className="froms-avtoriz">
                    <div className="formName"><h1>Sing Up</h1></div>
                    <div className="input-name"><p>User name </p></div>
                    <div className="form-input">
                        <input className="enterText" type="text" placeholder="Enter username(login)" />
                    </div>
                    <div className="input-name"><p>Your data </p></div>
                    <div className="form-input-two-fields">
                        <input className="enterText W" type="text" placeholder="Enter first-name" />
                        <input className="enterText W" type="text" placeholder="Enter last-name" />
                    </div>

                    <div className="input-name x"><p>Your birthday </p> <p>Country </p></div>
                    <div className="form-input-two-fields">
                        <input className="enterText W" type="date"/>
                        <select className="select" name="country" id="country">
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
                        <input className="enterText" type="mail" placeholder="Enter email" />
                    </div>
                    
                    <div className="input-name"><p>Phone</p></div> 
                    <div className="form-input">
                        <input className="enterText" type="text" placeholder="Enter phone" />
                    </div>

                    <div className="input-name"><p>Description</p></div> 
                    <div className="form-input">
                        <textarea name="" id="" className='enterText R' placeholder='Enter description of your activity'></textarea>
                    </div>

                    <div className="button-logIn">
                        <button>Sing Up</button>
                    </div>  
                    <div className="other-avtoriz">
                        <button><ion-icon name="logo-google"></ion-icon></button>
                        <button><ion-icon name="logo-apple"></ion-icon></button>
                    </div>
                    <div className="LinkTo">
                        <p>Do you have an account?<Link to="/" className='link'>Log in</Link> </p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default Register