import useHook from '../Hooks/Hooks'
import './popup.css'


const Popup = ({modal, setModal, setIsAuth})=>{


    const ClosePopup = ()=>{
        console.log("Окно закрыто")
        setModal(false)
    }


    const LogOut = ()=>{
        setInterval(()=>{
            localStorage.removeItem("userId")
            setIsAuth(false)
        }, 1000)
    }


    if(modal){
        return(
            <div className="popup open">
                <div className="popup-main-block">

                    <div className="widjet-container">
                        <div className="logOut" onClick={()=>LogOut()}>
                            <ion-icon name="log-out"></ion-icon>
                        </div>
                        <div className="closePopup" onClick={()=>ClosePopup()}>
                            <ion-icon name="menu"></ion-icon>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
    else{
        return(
            <div className="popup">
                <div className="popup-main-block">
                    <div className="widjet-container">
    
                    </div>
                </div>
            </div>
        )
    }

    
}

export default Popup