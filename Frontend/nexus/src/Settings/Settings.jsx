import './settings.css'
import InfoHeader from '../Analitics/InfoHeader'
import { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
import settings from '../assets/settings.png'

import Security from './units/Security'
import PersonalData from './units/PersonalData'
import ChatsSet from './units/ChatsSet'
import ViewsProfiel from './units/ViewsProfiel'

import LoadImg from '../LoadIMG/LoadImg'

const Settings = ()=>{

    const[isLoading, setIsLoading] = useState(true)
    const [activeNav, setActiveNav] = useState("1")

    const[loadImg, setLoadImg] = useState(false)

    useEffect(()=>{
        setTimeout(()=>{setIsLoading(false)}, 1000)
    }, [])

    if(isLoading) return <Loading />


    return(
        <div className="main-settings-block">
            <InfoHeader />
            <div className="chart-blocks">
                <aside className="chartAside">
                    <div className="chart-aside-header"><h1>Settings</h1></div>

                    <div className="aside-block-nav">

                        <div className="aside-block-link">
                            {/* <div className="block-triangelll"><div className="right-triangle"></div> </div> */}
                            <Link to="" className='aside-link'  onClick={()=>{setActiveNav("1")}}><ion-icon name="contact"></ion-icon> Your data</Link>
                            {/* <div className="block-triangelll"><div className="left-triangle"></div></div> */}
                        </div>

                        <div className="aside-block-link">
                            {/* <div className="block-triangelll"><div className="right-triangle"></div></div> */}
                            <Link to=""  className='aside-link' onClick={()=>{setActiveNav("2")}}><ion-icon name="image"></ion-icon> Views profiel</Link>
                            {/* <div className="block-triangelll"><div className="left-triangle"></div></div> */}
                        </div>

                        <div className="aside-block-link">
                            {/* <div className="block-triangelll"><div className="right-triangle"></div></div> */}
                            <Link to=""  className='aside-link' onClick={()=>{setActiveNav("3")}} ><ion-icon name="bug"></ion-icon> Security</Link>
                            {/* <div className="block-triangelll"><div className="left-triangle"></div></div> */}
                        </div>

                        <div className="aside-block-link">
                            {/* <div className="block-triangelll"><div className="right-triangle"></div></div> */}
                            <Link to=""  className='aside-link' onClick={()=>{setActiveNav("4")}}><ion-icon name="chatboxes"></ion-icon> Chats</Link>
                            {/* <div className="block-triangelll"><div className="left-triangle"></div></div> */}
                        </div>

                    </div>
                </aside>
                <main className="chart-main-block">
                    <div className="chart-main-header">
                        <div className="chart-logo" style={{backgroundImage: `url(${settings})`}}></div>
                    </div>
                    <div className="mainChart-block">

                        {activeNav === "1" && (
                            <PersonalData />
                        )}

                        {activeNav === "2" && (
                            <ViewsProfiel setLoadImg={setLoadImg} loadImg={loadImg} />
                        )}

                        {activeNav === "3" && (
                            <Security />
                        )}

                        {activeNav === "4" && (
                           <ChatsSet />
                        )}

                    </div>

                    <LoadImg setLoadImg={setLoadImg} loadImg={loadImg} />
                </main>
                
            </div>
        </div>
    )
}

export default Settings