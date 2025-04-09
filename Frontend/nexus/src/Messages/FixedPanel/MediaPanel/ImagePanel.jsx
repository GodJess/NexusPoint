import axios from "axios"
import { useEffect, useState } from "react"


const ImagePanel = ({message, activeChat})=>{

    const [image, setImage] = useState([])
    const [checkImage, setCheckImage] = useState(false)

    useEffect(()=>{
        const getImages = async()=>{
            setCheckImage(false)
            try{

                const res = await axios.get(`http://127.0.0.1:8000/getMessageImage/${message.message_id}/`)
                if(res.data != null){
                    setImage(res.data)
                    setCheckImage(true)
                }
            }
            catch(error){
                console.error(`ФОто не прогрузилось по данному id = ${message.message_id}`)
            }

        }

        getImages()
    }, [activeChat])


    if(checkImage){

        image?.map((el)=>{
            return(

                <div key={el.id} className="media-image-block">
                    <div className="imagesMedia" style={{backgroundImage: `url(${el.photo})`}} ></div>
                </div>
            )
        })
        
    }
}

export default ImagePanel