import { useEffect, useRef, useState } from 'react'
import '../App.css'
import axios from 'axios'
import './message.css'
import ImageMessage from './ImageMessage'
import DocMessage from './DocumentMessage'
import VideoMessage from './VideoMessage'

const Messages = ({ messages, storage, activeChat})=>{

    const  chatRef = useRef(null)

    const getTime = (time)=>{
      const date = new Date(time);

      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();

      const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

      return formattedTime
    }





    const checkMessage = (message, index)=>{
      if(message.text.length > 0){
        if(message.person_id == storage ){
          return(
            <div key={index} className="chat-container-block your">
            <DocMessage message={message} />
            <ImageMessage message={message} />
            <VideoMessage message={message} />
            <div className="message your">
              <div className="message-text your">
                <p>{message.text}</p>
              </div>
              <div className="message-time your">{getTime(message.data_time_message)}</div>
            </div>
            <div className="triangel-your"></div>
          </div>
          )
        }
        else {
          return(
            <div key={index} className="chat-container-block">
              <DocMessage message={message} />
              <ImageMessage message={message} />
              <VideoMessage message={message} />
              <div className="message">
                <div className="message-text">
                  <p>{message.text}</p>
                </div>
                <div className="message-time">{getTime(message.data_time_message)}</div>
              </div>
              <div className="triangel"></div>
            </div>
          )
        }
      }
      else{
        return <div>
            <ImageMessage message={message} />
            <DocMessage message={message} />
            <VideoMessage message={message} />
        </div>
      
      }
      
    }


    useEffect(() => {
      if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }

    }, [messages]);

    return(
        <div className="chat-container" ref={chatRef}>

        {messages?.map((message, index)=>{
          return(
            checkMessage(message, index)
          )
        })}

        {/* <div className="chat-container-block">
          <div className="message">
            <div className="message-text">
              <p>Lorem Ipsum is simply dummy text of the
                 printing and typesetting industry.
                  Lorem Ipsum has been the industry's 
                  standard dummy text ever since the 1500s
                  </p>
            </div>
            <div className="message-time">10:00PM</div>
          </div>
          <div className="triangel"></div>
        </div>

        <div className="chat-container-block your">
          <div className="message your">
            <div className="message-text your">
              <p>Lorem Ipsum is simply dummy text of the
                 printing and typesetting industry.
                  Lorem Ipsum has been the industry's 
                  standard dummy text ever since the 1500s
                  </p>
            </div>
            <div className="message-time your">10:00PM</div>
          </div>
          <div className="triangel-your"></div>
        </div> */}
        

    </div>
    )
}

export default Messages