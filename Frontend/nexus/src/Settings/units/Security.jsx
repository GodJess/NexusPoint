import { useEffect, useState } from "react";
import useHook from "../../Hooks/Hooks";
import TwoFactorAuth from "./TwoFactorAuth";

import '../settings.css'
import axios from "axios";

const Security = ()=>{


    const { userinfo, storage } = useHook();

    const[password, setPassword] = useState(userinfo.password)
    const [change, setChange] = useState(false)
    const [confirm, setConfirm] = useState(null)

    useEffect(()=>{
        if (userinfo && typeof userinfo === 'object') {
            setPassword(userinfo.password)
        }
    }, [userinfo])


    const changePassword = ()=>{
        const fetch = async()=>{
            let resp = await axios.post(`http://127.0.0.1:8000/ChangePassword/${storage}/`, {'password': password})
            if(resp.data != null){
                alert("Data saved successfully")
            }
            else{
                alert('Something went wrong')
            }
        }
        fetch()
    }

    const HandelConfirm = ()=>{
        const fetch = async()=>{
            let response = await axios.get(`http://127.0.0.1:8000/confirmCode/${storage}/`)
            if(response.data != null){
                if(response.data.result == true){
                    if(response.data.token == null){
                        changePassword()
                    }
                    else{
                        setConfirm(response.data.token)
                        setChange(true)
                    }
                }
                else{
                    alert('Apparently you have an incorrect email address.')
                }
            }
        }
        fetch()
    }


    return(
        <div id="3" className="chart-container">
        <div className="chart-container-header">
            Security <ion-icon name="settings"></ion-icon>
        </div>
        <div className="chart-container-block">
            <div className="diagrams-content">
                <div className="settings-container">
                    <div className="container-security">


                        {change === false ? 
                            <div className="security-main-block">

                                <div className="secureBlockFields">
                                    <div className="field-datablock">
                                        PASSWORD :
                                        <div className="block-data-input">
                                            <input type="password" className="dataSet-input" value={password} onChange={(el)=>setPassword(el.target.value)}/>
                                        </div>
                                    </div>

                                    <div className="field-datablock">
                                        two-factor authentication :
                                        <input value={true} readOnly type="checkbox" checked className="SecureBox" />
                                    </div>
                                </div>
                            

                                <div className="dataSet-widjets">
                                    <div className="dataSetIcon pass"></div>

                                    <button type="button"  className="dataSetBtn" onClick={()=>{HandelConfirm()}}>Save password</button>
                                </div>

                            </div>
                            
                            :

                            <TwoFactorAuth setChange={setChange} confirm={confirm} password={password} />
                    
                        }
                        
                    </div>
                </div>

            </div>
        </div>
    </div>
    )
}

export default Security