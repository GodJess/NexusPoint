import "./newCssFile.css"
import close from '../assets/Close.png'
import upload from '../assets/Upload.png'
import { useCallback, useEffect, useRef, useState } from "react"
import cart from '../assets/Trashcan.png'
import axios from "axios"
import useHook from "../Hooks/Hooks"


const ModelLoadFiles = ({setWindow, window, nameWindow, activeChat})=>{

    const socketRef = useRef(null)

    const[photos, setPhotos] = useState([])
    const [textValue, setTextValue] = useState('')
    const {storage} = useHook()
    const [messageId, setMessageId] = useState('')

    const SetText = useCallback((element)=>{
        setTextValue(element.target.value)
    }, [textValue])

    const handlePhotoChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length + photos.length > 10) {
          alert('Вы можете загрузить максимум 10 фотографий.');
          return;
        }
        setPhotos((prevPhotos) => [...prevPhotos, ...files]);
      };

    const removePhoto = (index)=>{
        setPhotos(prev=> prev.filter((_, el) => el !== index))
    }

    const AddImagesMessage = ()=>{
        const Fetch = async()=>{

            if(photos.length != 0 || textValue.trim().length != 0){
                
                    const formData = new FormData();
                    formData.append('chat_id', activeChat);
                    formData.append('message', textValue);

                    // Добавляем фотографии в FormData
                    photos.forEach((photo) => {
                        formData.append('photos', photo);
                    });

                try{
                    const response = await axios.post(`http://127.0.0.1:8000/uploadImageMessage/${storage}/`, formData)
                    if(response.data.result == true){
                        setMessageId(response.data.message_id)
                        sendMessage(JSON.stringify({
                            'text': textValue,
                            'person_id': storage,
                            'message_id': response.data.message_id,
                            'contain_files': true,
                            
                        }));
                        setTextValue(''),
                        setPhotos([])
                        setWindow(false)
                    }
                }
                catch(error){
                    console.log(error)
                }
               
            }
            

        }

        Fetch()

    }

    const sendMessage = (message) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(message);
        } else {
            console.error("WebSocket is not open. Current state:", socketRef.current?.readyState);
        }
    };


    useEffect(() => {
        const connectWebSocket = () => {
             socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/nexusback/${activeChat}/`);

            socketRef.current.onopen = () => {
                console.log('WebSocket connected');
            };

            socketRef.current.onclose = () => {
                console.log('WebSocket closed, attempting to reconnect...');
                // Можно добавить логику для повторного подключения
            };

            socketRef.current.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

        };

        connectWebSocket();

        return () => {
            socketRef.current?.close();
        };
    }, [activeChat]);

    if(window) return(
        <div className="modalContainer">
            <div className="mainContainer-window">
                <div className="header-modelloadFiles-container">
                    <h1>Sending {nameWindow}s</h1>
                    <div className="close-modal-button" style={{backgroundImage: `url(${close})`}} onClick={()=> setWindow(false)}></div>
                </div>

                <div className="main-modalload-files-block">
                    <div className="loadfilesBlock">
                        <div className="loadBlock-name">Attach</div>
                        <div className="blockLoad-files">
                            <div className="picture-load" style={{backgroundImage: `url(${upload})`}}></div>
                            <input className='PhotoFiles' onChange={handlePhotoChange} type="file" name="myImage" accept="image/png, image/gif, image/jpeg" />
                        </div>
                        <div className="block-opacity-load"></div>

                        <div className="Sending" onClick={()=>{AddImagesMessage()}}><p>Send</p></div>
                    </div>
                    <div className="listFilesBlock">
                        <div className="loadBlock-name">Attached files</div>
                        <div className="list-files">
                            <div className="list-files-header">
                                <p>{photos.length}/10</p>
                            </div>
                            <div className="list-files-scrollBlock">
                                {photos?.map((photo, index) =>{
                                    return(
                                        <div key={index} className="attechedFiles-block">
                                            <div className="files-nameBlock"><p className="fileNamess">Name: {photo.name}</p></div>
                                            <div className="cartRemove" onClick={()=> removePhoto(index)} style={{backgroundImage: `url(${cart})`}}></div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                        <div className="loadBlock-name">Add a signature</div>
                        <div className="text-describe-file">
                            <textarea value={textValue} onChange={(element) => {SetText(element)}} placeholder="Enter the text" name="" id=""></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModelLoadFiles