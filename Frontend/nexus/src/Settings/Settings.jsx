import './settings.css'
import InfoHeader from '../Analitics/InfoHeader'
import { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'

const Settings = ()=>{

    const[isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        setTimeout(()=>{setIsLoading(false)}, 1000)
    }, [])

    if(isLoading) return <Loading />

    return(
        <div className="main-settings-block">
            <InfoHeader />
            <div className="settings-main-container">
                 <div className="containerSet">
                    <div className="container-blockSet">
                        <div className="container-header">
                            <h1>Settings Views</h1>
                        </div>
                    </div>

                    <div className="container-blockSet">
                        <div className="container-header">
                            <h1>Chat Settings</h1>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    )
}

export default Settings