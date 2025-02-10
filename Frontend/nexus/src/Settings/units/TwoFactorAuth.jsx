
import { useEffect, useState } from 'react';
import useHook from '../../Hooks/Hooks';
import axios from 'axios';

const TwoFactorAuth = ({setChange, confirm, password}) => {
    const [code, setCode] = useState('');
    const [timer, setTimer] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const {storage} = useHook()

    useEffect(() => {

        if (timer > 0 && isTimerActive) {
            const interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {
            setIsTimerActive(false);
            setTimer(60); 
            setChange(false)
        }
    }, [timer, isTimerActive]);


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

    const handleConfirm = () => {
        console.log("check confim")
        if(code == confirm){
            changePassword()
            setChange(false)
        }
    };

    return (
        <div className="security-main-block">
            <div className="backOnMain"><ion-icon onClick={()=> setChange(false)} name="arrow-back"></ion-icon></div>
            <div className="two-factor-auth-form">
                <h2>Enter your confirmation code</h2>
                <input
                    className='twoFactorInput'
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Confirmation Code"
                />
                <div className="timer">{timer}s</div>
                <button
                    className="confirm-button"
                    onClick={() =>handleConfirm()}
                    style={{  fontSize:20}}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default TwoFactorAuth;
