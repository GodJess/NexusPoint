import { useEffect, useState } from "react"
import useHook from "../../Hooks/Hooks"

const PersonalData = ()=>{

        const { userinfo } = useHook();
        const [ info, setInfo ] = useState({
            user_name: "",
            user_first_name: "",
            user_last_name: "",
            user_date_birth: "",
            user_descript: "",
            user_mail: ""
        });

        // const [ info, setInfo ] = useState({
        // });
        
        useEffect(() => {
            if (userinfo && typeof userinfo === 'object') {
                setInfo({
                    user_name: userinfo.user_name,  
                    user_first_name: userinfo.user_first_name,
                    user_last_name: userinfo.user_last_name,
                    user_date_birth: userinfo.user_date_birth,
                    user_descript: userinfo.user_descript,
                    user_mail: userinfo.user_mail
                });
                // setInfo(userinfo)
            }
        }, [userinfo])

        return(
            <div id="1" className="chart-container">
            <div className="chart-container-header">
                Personal data <ion-icon name="settings"></ion-icon>
            </div>
            <div className="chart-container-block">
                <div className="diagrams-content">
                    <div className="settings-container">
                    <div className="container-dataSettings">
                        <div className="main-blockDataSet">
                            <div className="dataSetBlockFields">
                                <div className="dataSetblock">

                                    <div className="field-datablock">
                                        LOGIN :
                                        <div className="block-data-input">
                                            <input value={info.user_name} type="text" onChange={el=>setInfo(prev=>({...prev, user_name: el.target.value}))} className="dataSet-input" />
                                        </div>
                                    </div>

                                    <div className="field-datablock">
                                        F-NAME :
                                        <div className="block-data-input">
                                            <input value={info.user_first_name} onChange={el=>setInfo(prev=>({...prev, user_first_name: el.target.value}))} type="text" className="dataSet-input" />
                                        </div>
                                    </div>

                                    <div className="field-datablock">
                                        L-NAME :
                                        <div className="block-data-input">
                                            <input value={info.user_last_name} onChange={el=>setInfo(prev=>({...prev, user_last_name: el.target.value}))} type="text" className="dataSet-input" />
                                        </div>
                                    </div>

                                    <div className="field-datablock">
                                        EMAIL :
                                        <div className="block-data-input">
                                            <input value={info.user_mail} onChange={el=>setInfo(prev=>({...prev, user_mail: el.target.value}))} type="text" className="dataSet-input" />
                                        </div>
                                    </div>

                                </div>

                                <div className="dataSetblock">
                                    <div className="field-datablock">
                                            BIRTHDAY:
                                            <div className="block-data-input">
                                                <input value={info.user_date_birth} onChange={el=>setInfo(prev=>({...prev, user_date_birth: el.target.value}))} type="date" className="dataSet-input" />
                                            </div>
                                    </div>

                                    <div className="descript-field">
                                        DESCRIPT:
                                        <div className="block-data-desc">
                                            <textarea value={info.user_descript} onChange={el=>setInfo(prev=>({...prev, user_descript: el.target.value}))} className='dataSetText' name="" id=""></textarea>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="dataSet-widjets">

                                <div className="dataSetIcon">

                                </div>

                                <button type="button" className="dataSetBtn" >Save changes</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }

    export default PersonalData