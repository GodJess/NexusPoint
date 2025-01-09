import Vin from '../../assets/Vin.jpg'
import Pencil from '../../assets/Pencil.png'


const ViewsProfiel = ({setLoadImg, loadImg})=>{
    return(
        <div id="2" className="chart-container">
        <div className="chart-container-header">
            Views profiel <ion-icon name="settings"></ion-icon>
        </div>
        <div className="chart-container-block">
            <div className="diagrams-content">
                <div className="settings-container">
                    <div className="block-changeProfiel">
                        <div className="blockEdit"><img src={Pencil} alt="" /></div>
                        <div className="blockPhotoViews" style={{backgroundImage: `url(${Vin})`}}></div>
                        <button className='changeImageViews' onClick={()=> setLoadImg(true)}>Replace</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ViewsProfiel