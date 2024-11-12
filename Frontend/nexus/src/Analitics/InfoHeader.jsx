import { Link } from 'react-router-dom'
import useHook from '../Hooks/Hooks'
import './Analitics.css'

const InfoHeader = ()=>{

    const {userinfo} = useHook()
    return(
        <div className="headerInfo">
            <div className="block-home">
                <p><Link to='/' className="LinkToHome"><ion-icon className="linkHome" name="home"></ion-icon> </Link> Back to home </p>
            </div>

            <div className="photo-header" style={{backgroundImage: `url(${userinfo.user_img})`}}></div>
        </div>
    )
}

export default InfoHeader