import useHook from '../Hooks/Hooks'
import './popup.css'
import { Link } from 'react-router-dom'
import camera from '../assets/camera.png'

const Popup = ({modal, setModal, setIsAuth, setLoadImg, loadImg})=>{



    const {userinfo} = useHook()

    const ClosePopup = ()=>{
        console.log("Окно закрыто")
        setModal(false)
    }




    const LogOut = ()=>{
        setInterval(()=>{
            localStorage.removeItem("userId")
            localStorage.removeItem('activeChat')
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
                    <div className="user-about-info">
                        <div className="user-image-info">
                            <div className="userImg" style={{backgroundImage: `url(${userinfo.user_img})`}}>
                                <div className="blockCamera" onClick={()=>{
                                    setModal(false)
                                    setLoadImg(true)
                                }}>
                                     <img src={camera} alt="" className='cameraPng' />
                                </div>
                            </div>
                        </div>
                        <div className="user-login-info">
                            <p>{userinfo.user_name}</p>
                        </div>
                    </div>
                    <div className="widjet2-container">
                        <Link to="/settings/" className="linking"><p>Settings <ion-icon name="settings"></ion-icon></p></Link>
                    </div>
                    <div className="widjet2-container">
                        <Link to="/analitics/" className="linking"><p>Analitics <ion-icon name="stats"></ion-icon></p></Link>
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