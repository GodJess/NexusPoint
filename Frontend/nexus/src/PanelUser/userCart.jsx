
import axios from 'axios'
import saved from '../assets/Libraly.png'
import useHook from '../Hooks/Hooks'
import {useEffect, useRef, useState} from 'react'

import { getLastMessage } from './class'

// setAllMessages, setCheckNew, checkNew 
const UserCart = ({el, chatId, activeChat, setActiveChat, setMessengers, messengers, setActiveCompanion, })=>{
    const {userinfo, storage} = useHook()
    const[last, setLast] = useState('')
    const [persId, setPersId] = useState('')


    const socketRef = useRef(null)
    
    useEffect(()=>{
      const GetLast = async()=>{
          try{
            const response = await axios.get(`http://127.0.0.1:8000/getLastMess/${chatId}/`)
            setLast(response.data.text)
            setPersId(response.data.person_id)
          }
          catch(error){
            console.error('Error', error)
          }
      }
      GetLast()

        const connectWebSocket = () => {
          socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/nexusback/${chatId}/`);

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
            setLast(data.text)
            setPersId(data.person_id)
            // добавление новых сообщений в список последних сообщений 
            // setAllMessages(prev=>[...prev, {chat_id: data.chat_id, 'data_time_message': data.data_time_message}])
            // if(checkNew){
            //   setCheckNew(false)
            // }
            // else{
            //   setCheckNew(true)
            // }
            };
        };

      connectWebSocket();

      return () => {
          socketRef.current?.close();
      };

    
    }, [])

    const CreateChat = ()=>{
      const fetch = async() =>{
        try{
          let response = await axios.post(`http://127.0.0.1:8000/createChat/${userinfo.user_id}/`, {"personId": el.user_id})

          if( response.status === 201){
              console.log(`chat_id: ${response.data.chat_id}`)
              setMessengers((prev)=>[...prev, {id: '', chat_id: response.data.chat_id, person1_id: userinfo.user_id, person2_id: el.user_id}])
              console.log(messengers)
          }
        }
        catch(error){
          console.log(`Ваша ошибка : ${error}`)
        }
      }
      fetch()
    }

    const getCompanion = (activeChat)=>{
      const fetch = async()=>{
        const response = await axios.post(`http://127.0.0.1:8000/getCompanion/${userinfo.user_id}/`, {"chat_id" : activeChat})
        if(response.data != null){
          setActiveCompanion(response.data)
          console.log("GetCompanion работает")
          console.log(response.data)
        }
      }
      fetch()
    }


    const setChat =(id)=>{
      if(id != null && id != undefined){
        localStorage.setItem('activeChat', id)
        setActiveChat(id)
        getCompanion(id)
      }
      else{
        CreateChat()
      }
      console.log(`Все работает ${id}`)
    }


    const CheckUserName = (e)=>{
      if(Number(e.length) > 7) return e.substring(0,7)+"..."
      return e
    }

    const FromWho = ()=>{
      if(last.length > 0){
        if(persId == storage){
          return `You: ${last}`
        }
        else{
          return `For you: ${last}`
        }
      }
      else{
        return 'It`s empty here'
      }

    }

    if(el.user_id == storage){
        return(
            <div key={el.id} className="message-container" style={{background: activeChat === chatId ? '#000' : 'linear-gradient(99deg, rgba(74,72,72,1) 0%, rgba(51,2,2,0.8823178929775035) 100%)'}}>
                <div className="message-photo-block">
                  <div className="message-photo" style={{ backgroundImage: `url(${saved})`}}></div>
                </div>
                <div className="message-info">
                  <div className="message-about-user">
                    <div className="message-name-user">Saved</div> 
                    <div className="message-date">01.09.24</div>
                    </div>
                  <div className="last-message">{getLastMessage.getMess(FromWho())}</div>
                </div>
                <div className="panel-select-chat" onClick={()=>{setChat(chatId)}}></div>
              </div>
        )
    }
    else{
        return(
            <div key={el.id} className="message-container" style={{background: activeChat === chatId ? '#000' : 'linear-gradient(99deg, rgba(74,72,72,1) 0%, rgba(51,2,2,0.8823178929775035) 100%)'}}>
            <div className="message-photo-block">
              <div className="message-photo" style={{ backgroundImage: `url(${el.user_img})`}}></div>
            </div>
            <div className="message-info">
              <div className="message-about-user">
                <div className="message-name-user">{CheckUserName(el.user_name)}</div> 
                <div className="message-date">01.09.24</div>
                </div>
              <div className="last-message">{getLastMessage.getMess(FromWho())}</div>
            </div>
            <div className="panel-select-chat" onClick={()=>{setChat(chatId)}}></div>
          </div>
        )
    }
    
    
}

export default UserCart