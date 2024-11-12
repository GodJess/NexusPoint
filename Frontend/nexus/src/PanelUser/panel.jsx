import '../App.css'
import vin from '../assets/Vin.jpg'
import useHook from '../Hooks/Hooks'
import UserCart from './userCart'

const Panel = ({search, activeCompanion, setActiveCompanion, activeChat, setActiveChat})=>{

  const {users, messengers, setMessengers, userinfo} = useHook()

  const checkMessanger = (el)=>{
    
    for(let i = 0; i < messengers.length; i++){
      let mess = messengers[i]
      if(mess.person1_id == el.user_id || mess.person2_id == el.user_id){
        return(
          <UserCart key={el.id} el={el} chatId={mess.chat_id} activeChat={activeChat} setActiveChat={setActiveChat} setMessengers={setMessengers} messengers={messengers} setActiveCompanion={setActiveCompanion} />
        )
      }
    }

  }

  const CheckSearchUsers = (el)=>{
    for(let i = 0; i < messengers.length; i++){
      let mess = messengers[i]
      if(mess.person1_id == el.user_id || mess.person2_id == el.user_id){
        return true
      }
    }
    return false
  }


    return(
        <aside className="aside">

          {
            users.map((el)=>{
              if(String(search).trim() == ''){
                return(
                  checkMessanger(el)
                )
              }
              else{
                if(el.user_name.toLowerCase().startsWith(String(search).toLowerCase().trim())){
                  if(CheckSearchUsers(el)){
                      return(
                        checkMessanger(el)
                      )
                  }
                  else{
                    return(
                      <UserCart key={el.id} chatId={null} el={el} activeChat={activeChat} setActiveChat={setActiveChat} setMessengers={setMessengers} messengers={messengers} setActiveCompanion={setActiveCompanion} />
                    )
                  }

                }
              }
            })
          }

          

        </aside>
    )
}

export default Panel