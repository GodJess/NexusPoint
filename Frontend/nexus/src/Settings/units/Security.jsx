

const Security = ()=>{

    return(
        <div id="3" className="chart-container">
        <div className="chart-container-header">
            Security <ion-icon name="settings"></ion-icon>
        </div>
        <div className="chart-container-block">
            <div className="diagrams-content">
                <div className="settings-container">
                    <div className="container-security">
                        <div className="security-main-block">

                                <div className="secureBlockFields">
                                    <div className="field-datablock">
                                        PASSWORD :
                                        <div className="block-data-input">
                                            <input type="text" className="dataSet-input" />
                                        </div>
                                    </div>

                                    <div className="field-datablock">
                                        two-factor authentication :
                                        <input type="checkbox" className="SecureBox" />
                                    </div>
                                </div>
                               

                                <div className="dataSet-widjets">
                                    <div className="dataSetIcon pass"></div>

                                    <button type="button" className="dataSetBtn">Save password</button>
                                </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    )
}

export default Security