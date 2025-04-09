import { useEffect, useState } from "react"
import useHook from "../Hooks/Hooks"
import axios from "axios"
import '../VideoPlayer/videoplay.css'

import VideoPlayer from "../VideoPlayer/VideoPlayer"

const VideoMessage = ({message}) =>{

    const [videos, setVideos] = useState([])
    const {storage} = useHook()

    useEffect(()=>{
        const getDoc = async()=>{
            try{
                const response = await axios.get(`http://127.0.0.1:8000/getVideos/${message.message_id}/`)

                if( response != null ){
                    setVideos(response.data)
                }
            }
            catch(error){
                console.log(error)
            }
            
        }

        getDoc()

    }, [])


    if(message.contain_files){
        if(storage == message.person_id){
            return(
                <div  className="container-files your">
                    {videos?.map(video=>{
                        return(
                            <div key={video.id} className="video-message-Block your">
                                <VideoPlayer videoUrl={video.video} />
                            </div>
                                )
                    })}
                 </div>
            )

        }
        else{
            return(
                <div  className="container-files">
                    {videos?.map(video=>{
                        return(
                            <div key={video.id} className="video-message-Block another">
                                <VideoPlayer videoUrl={video.video} />
                            </div>
                                )
                    })}
                 </div>
            )
        }

    }




}

export default VideoMessage