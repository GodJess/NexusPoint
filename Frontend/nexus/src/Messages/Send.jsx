
import Message from '../assets/message.png'
import '../App.css'
import { useCallback, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useWebSocket } from 'react-use-websocket';


const SendMessage = ({storage, activeChat, messages, setMessages, emojWindow, setEmojWindow, textMessage, setTextMessage, fileWindow, setFileWindow})=>{

    const socketRef = useRef(null)

    const SETTEXT = useCallback((element)=>{
        setTextMessage(element.target.value)
    }, [textMessage])


    const sendMessage = (message) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(message);
        } else {
            console.error("WebSocket is not open. Current state:", socketRef.current?.readyState);
        }
    };

    const AddMessage = ()=>{
        const fetch = async()=>{
            if(String(textMessage).trim() != ''){
                try{
                    let response = await axios.post(`http://127.0.0.1:8000/addMessage/${storage}/`, {'message': textMessage, 'chat_id': activeChat })
                    if(response.data.response == true){
                        sendMessage(JSON.stringify({
                            'text': textMessage,
                            'person_id': storage,
                            'message_id': null,
                            'contain_files': false,
                            
                        }));
                        setTextMessage('');
                        setEmojWindow(false)
                    }
                }
                catch(error){
                    console.log("Какие-то неполадки", error)
                }
            }
            
        }
        fetch()
    }

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

            socketRef.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, {
                    id: '',
                    chat_id: data.chat_id,
                    person_id: data.person_id,
                    text: data.text,
                    data_time_message: data.data_time_message,
                    message_id: data.message_id,
                    contain_files: data.contain_files
                }]);
            };
        };

        connectWebSocket();

        return () => {
            socketRef.current?.close();
        };
    }, [activeChat]);
      


    return(
        <div className="chart-message-input-block">
            <div className="send-message-container">
            <div className="message-pack">
                <div className="attach-block" onClick={()=> 
                    {
                        if(fileWindow != true){
                            setFileWindow(true)
                            setEmojWindow(false)
                        }
                        else{
                            setFileWindow(false)
                        }
                    }
                    }>
                <ion-icon className="attaches" name="attach"></ion-icon>
                </div>
                <div className="text-field-message">
                <textarea value={textMessage} name="" id="" placeholder='Введите текст сообщения' onChange={(element)=>{
                    SETTEXT(element)
                }}></textarea>
                </div>
                <div className="block-smile" onClick={()=>{
                    if(emojWindow == false){
                        setEmojWindow(true) 
                        setFileWindow(false)
                    }
                    else{setEmojWindow(false)}
                }}>😎</div>
            </div>
            <div className="send-message-button">
                <button className='sendMessage' style={{backgroundImage: `url(${Message})`}} onClick={()=>{AddMessage()}}></button>
            </div>
            </div>
        </div>
    )
}

export default SendMessage