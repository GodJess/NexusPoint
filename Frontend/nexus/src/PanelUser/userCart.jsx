
import axios from 'axios'
import saved from '../assets/Libraly.png'
import useHook from '../Hooks/Hooks'




const UserCart = ({el, chatId, activeChat, setActiveChat, setMessengers, messengers})=>{
    const {userinfo} = useHook()

    
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


    const setChat =(id)=>{
      if(id != null && id != undefined){
        localStorage.setItem('activeChat', id)
        setActiveChat(id)
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

    if(el.user_id == userinfo.user_id){
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
                  <div className="last-message">Какой-то замысло...</div>
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
              <div className="last-message">Какой-то замысло...</div>
            </div>
            <div className="panel-select-chat" onClick={()=>{setChat(chatId)}}></div>
          </div>
        )
    }
    
    
}

export default UserCart