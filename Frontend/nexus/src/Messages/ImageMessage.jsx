import axios from "axios"
import { useEffect, useState } from "react"
import './message.css'
import useHook from "../Hooks/Hooks"


const ImageMessage = ({message})=>{

    const[images, setImages] = useState([])
    const {storage} = useHook()

    useEffect(()=>{
        const getImages = async()=>{
            try{
                const res = await axios.get(`http://127.0.0.1:8000/getMessageImage/${message.message_id}/`)
                if(res != null){
                    setImages(res.data)
                }
            }
            catch(error){
                console.error(error)
            }

        }

        getImages()
    }, [])

    if(message.contain_files){
        if(storage == message.person_id){
            return(
                <div className="container-files your">
                    {images?.map(image=>{
                        return(
                            <div key={image.id} className="messImage your" >
                                <img src={image.photo} alt="" />
                            </div>
                        )
                    })}
                </div>
            )
        }
        else{
            return(
                <div className="container-files">
                    {images?.map(image=>{
                        return(
                            <div key={image.id}  className="messImage another" >
                                <img src={image.photo} alt="" />
                            </div>
                        )
                    })}
                </div>
            )
        }

    }

}

export default ImageMessage