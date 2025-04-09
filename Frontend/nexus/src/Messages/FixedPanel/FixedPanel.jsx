import './fixedPanel.css'
import pic from '../../assets/Close2.png'
import video from '../../assets/forFixedPanel/Video.png'
import image from '../../assets/forFixedPanel/Image.png'
import doc from '../../assets/forFixedPanel/Doc.png'
import audio from '../../assets/forFixedPanel/Audio.png'
import { useEffect, useState } from 'react'
import MediaPanel from './MediaPanel/MediaPanel'
import axios from 'axios'
import MediaFilesComponent from './MediaFilesComponent'

// {fixedPanel, setFixedPanel}
const FixedPanel = ({fixedPanel, setFixedPanel, messages, activeChat, media, setMedia})=>{

    // const [media, setMedia] = useState('Images')
    const[mediaFiles, setMediaFiles] = useState([])
    const [isCarouselOpen, setIsCarouselOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(null);

    useEffect(()=>{
        // setMedia('Images')
        setIsCarouselOpen(false)
        setCurrentImageIndex(null)
        const Fetch = async()=>{
            try{
                if(media == 'Images'){
                    const response = await axios.get(`http://127.0.0.1:8000/getMedia/${activeChat}/`)
                    if(response.data != null){
                        setMediaFiles(response.data.media)
                    }
                }
                else if(media == "Documents"){
                    const response = await axios.get(`http://127.0.0.1:8000/getMediaDocs/${activeChat}/`)
                    if(response.data != null){
                        setMediaFiles(response.data.media)
                    }
                }
            }
            catch{
                console.log('')
            }
        }

        Fetch()
    }, [media, activeChat])

    const SetMediaHeader = (el)=>{
        if(media != el) setMedia(el)
    }

    if(fixedPanel){
        return (
            <div className="fixedPanelBlock open">
                <div className="fixedPanel-header"><p className="fixedPanelName">Media</p> <div className="fixedPanel-closeBtn" onClick={()=>{setFixedPanel(false)}} style={{backgroundImage: `url(${pic})`}}></div></div>
                <div className="fixedPanel-main-container">
                    <div className="fixedPanel-MediaBlock">
                        <div className="fixedPanel-media-container">
                            <div className="mediaContainerFlex">
                                <div id="media-container-header">
                                    <p id="mediaText">{media}</p>
                                </div>
                                <MediaPanel activeChat={activeChat} mediaFiles={mediaFiles} media={media} isCarouselOpen={isCarouselOpen} 
                                setIsCarouselOpen={setIsCarouselOpen} currentImageIndex={currentImageIndex} setCurrentImageIndex={setCurrentImageIndex} />
                            </div>
                        </div>
                    </div>
    
                    <div className="fixedPanel-controlsBlock">
                        <div className="block-control-cont">
                            <div width="100px" className="box-control" onClick={()=>SetMediaHeader('Images')}><div className="conrol-image" style={{backgroundImage: `url(${image})`}}></div></div>
                        </div>
                        <div className="block-control-cont">
                            <div width="90px" className="box-control" onClick={()=>SetMediaHeader('Documents')}><div className="conrol-image" style={{backgroundImage: `url(${doc})`}}></div></div>
                        </div>
                        <div className="block-control-cont">
                            <div width="80px" className="box-control" onClick={()=>SetMediaHeader('Videos')}><div className="conrol-image" style={{backgroundImage: `url(${video})`}}></div></div>
                        </div>
                        <div className="block-control-cont">
                            <div  width="70px" className="box-control" onClick={()=>SetMediaHeader('Audios')}><div className="conrol-image" style={{backgroundImage: `url(${audio})`}}></div></div>
                        </div>
                    </div>
                </div>
                {/* {mediaFiles, isCarouselOpen, setIsCarouselOpen, currentImageIndex, setCurrentImageIndex} */}
                <MediaFilesComponent  mediaFiles={mediaFiles} isCarouselOpen={isCarouselOpen} 
                setIsCarouselOpen={setIsCarouselOpen} currentImageIndex={currentImageIndex} setCurrentImageIndex={setCurrentImageIndex} />

            </div>
        )
    }
    else{
        return (
            <div className="fixedPanelBlock">
                <div className="fixedPanel-header"><p className="fixedPanelName">Media</p> <div className="fixedPanel-closeBtn" style={{backgroundImage: `url(${pic})`}}></div></div>
                <div className="fixedPanel-main-container">
                    <div className="fixedPanel-MediaBlock">
                        <div className="fixedPanel-media-container"></div>
                    </div>
    
                    <div className="fixedPanel-controlsBlock">
                        <div className="block-control-cont">
                            <div width="100px" className="box-control"><div className="conrol-image" style={{backgroundImage: `url(${image})`}}></div></div>
                        </div>
                        <div className="block-control-cont">
                            <div width="90px" className="box-control"><div className="conrol-image" style={{backgroundImage: `url(${doc})`}}></div></div>
                        </div>
                        <div className="block-control-cont">
                            <div width="80px" className="box-control"><div className="conrol-image" style={{backgroundImage: `url(${video})`}}></div></div>
                        </div>
                        <div className="block-control-cont">
                            <div  width="70px" className="box-control"><div className="conrol-image" style={{backgroundImage: `url(${audio})`}}></div></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default FixedPanel