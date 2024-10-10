
import './Avtoriz.css'
import { Link } from 'react-router-dom'

const Register = ()=>{
    return(
        <div className="main-awtoriz-window">
            <div className="window-avtoriz">
                <div className="froms-avtoriz">
                    <div className="formName"><h1>Sing Up</h1></div>
                    <div className="input-name"><p>Email or phone number</p></div>
                    <div className="form-input">
                        <input className="enterText" type="text" placeholder="Enter email or phone number" />
                    </div>
                    <div className="input-name"><p>Password </p></div>
                    <div className="form-input">
                        <input className="enterText" type="text" placeholder="Enter password" />
                    </div>
                    <div className="input-name"><p>Repeat password </p></div>
                    <div className="form-input">
                        <input className="enterText" type="text" placeholder="Repeat password" />
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