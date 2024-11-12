import './message.css'
import JSONArray from './emodji.json'
import { useEffect, useState } from 'react'

const Window = ({emojWindow, setEmojWindow, textMessage, setTextMessage})=>{

  const[emojis, setEmojis] = useState([])

  useEffect(()=>{
    setEmojis(JSONArray)
  }, [])
    if(emojWindow == true){
        return(
            <div className="window-chat">
            <div className="window-emoji">
              <div className="window-header">
                  <div className="WindowName">
                    emoji
                  </div>
                  <div className="closeWindow">
                    <ion-icon name="close" onClick={()=>{setEmojWindow(false)}} ></ion-icon>
                  </div>
              </div>
              <div className="listOfEmoj">
                  <div className="Emojes">
                  {
                    emojis.map((emoji)=>{
                      return(
                        <div key={emoji.id} className="emodj" onClick={()=>{setTextMessage(prev=> prev + emoji.value )}}>
                          {emoji.value}
                        </div>
                      )
                    })
                  }
                  </div>
              </div>
            </div>
          </div>
        )
    }
}

export default Window