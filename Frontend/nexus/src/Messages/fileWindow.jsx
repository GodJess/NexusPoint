
import './message.css'
import Audio from '../assets/Audio.png'
import Image from '../assets/IMAGES.png'
import Doc from '../assets/Documents.png'
import Video from '../assets/Video.png'

const FilesWindows = ({fileWindow, setFileWindow, setNameWindow, setWindow, fixedPanel ,setFixedPanel})=>{

    const SetDataWindow = (el)=>{
        setNameWindow(el)
        setFileWindow(false)
        setWindow(true)
        if(fixedPanel){
            setFixedPanel(false)
        }
    }

    if(fileWindow) return(
        <div className="block-files-widjets">
            <div className="select-type-block">
                <div className="select-header">
                    <div className="block-hint"><ion-icon name="information-circle"></ion-icon></div>
                    <div className="block-close-select" onClick={()=>{setFileWindow(false)}}><ion-icon name="close-circle-outline"></ion-icon></div>
                </div>
                <div className="block-selectedItems">
                    <div className="selectedItem" onClick={()=>SetDataWindow('image')}>
                        <div className="Items-img" style={{backgroundImage: `url(${Image})`}}></div>
                        <p>IMAGES</p>
                    </div>
                    <div className="selectedItem" onClick={()=>SetDataWindow('document')}>
                        <div className="Items-img" style={{backgroundImage: `url(${Doc})`}} ></div>
                        <p>DOCUMENTS</p>
                    </div>
                    <div className="selectedItem" onClick={()=>SetDataWindow('video')}>
                        <div className="Items-img" style={{backgroundImage: `url(${Video})`}}></div>
                        <p>VIDEOS </p>
                    </div>

                    <div className="selectedItem" onClick={()=>SetDataWindow('audio')}>
                        <div className="Items-img" style={{backgroundImage: `url(${Audio})`}}></div>
                        <p>AUDIO & MUSIC</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FilesWindows