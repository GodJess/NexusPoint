import '../fixedPanel.css'

import docs from '../../../assets/Docs2.png'


const MediaPanel = ({mediaFiles, activeChat, media, isCarouselOpen, setIsCarouselOpen, currentImageIndex, setCurrentImageIndex})=>{


    const FormatName = (url)=>{

        if (!url) return "Unnamed file";

        const fileNameEncoded = url.split('/').pop(); 
        const fileNameDecoded = decodeURIComponent(fileNameEncoded); // Декодируем название файла

        if(fileNameDecoded.length > 12){
            return String(fileNameDecoded).substring(0, 4) + "..." + String(fileNameDecoded).substring(fileNameDecoded.length - 5)
        }
        
        return fileNameDecoded
    }

    const openCarousel = (index) => {
        setCurrentImageIndex(index);
        setIsCarouselOpen(true);
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
      };
    

    
    if(media == 'Images'){
        if(mediaFiles.length > 0) return(
            <div className="MD-container">
                {mediaFiles?.map((mediaF, index)=>{
                    return(
                        <div key={mediaF.id} className="media-image-block">
                            <div className="imagesMedia" onClick={() => openCarousel(index)} style={{backgroundImage: `url(${mediaF.photo})`}} ></div>
                        </div>
                    )
                })}
            </div>
        )
        return(
            <div className="EmptyList">
                It's still empty here
            </div>
        )
    }
    else if(media == 'Documents'){
        if(mediaFiles.length > 0) return(
            <div className="MD-container">
                {
                    mediaFiles?.map((mediaF)=>{
                        return(
                            <div key={mediaF.id} className="media-document-block">
                                <div className="mediaDoc-container">
                                    <a href={mediaF.docs} className="media-doc-url" download></a>
                                    <div className="media-doc-image" >
                                        <div className="MD-image" style={{backgroundImage : `url(${docs})`}}></div>
                                    </div>
                                    <div className="media-doc-name"> {FormatName(mediaF.docs)}</div>
                                </div>
                            </div>
                        )
                    })
                }
                


            </div>
        )
        return(
            <div className="EmptyList">
                It's still empty here
            </div>
        )
    }
    else if(media == 'Videos'){
        return(
            <div className="MD-container">

            </div>
        )
    }
    else if(media == 'Audios'){
        return(
            <div className="EmptyList">
                It's still empty here
            </div>
        )
    }

}

export default MediaPanel