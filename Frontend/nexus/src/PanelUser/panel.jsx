import { useEffect, useState } from 'react'
import '../App.css'
import vin from '../assets/Vin.jpg'
import useHook from '../Hooks/Hooks'
import UserCart from './userCart'


const Panel = ({search, activeCompanion, setActiveCompanion, activeChat, setActiveChat})=>{
  
  const {users, messengers, setMessengers, userinfo, allMessages, setAllMessages} = useHook()

  const[checkNew, setCheckNew] = useState(true)
  // const[reversedMessages, setReversedMessages] = useState([])
  // const[sortUsers, setSortUsers] = useState([])




  // useEffect(() => {
  //   // Фильтрация сообщений
  //   console.log('allMessages:', allMessages);
  //   const filteredMessages = Filter(allMessages.reverse());
  //   setReversedMessages(filteredMessages);
  //   console.log('reversedMessages:', filteredMessages);

  //   // Обновление мессенджеров
  //   console.log('messengers 1:', messengers);
  //   const updatedMessengers = FilterMessages(messengers, filteredMessages);
  //   setMessengers(updatedMessengers);
  //   console.log('messengers 2:', messengers);

  //   // Сортировка пользователей
  //   console.log('Users:', users);
  //   const sortedUsers = SortUserByLastMess(updatedMessengers, users);
  //   setSortUsers(sortedUsers);
  //   console.log('sortUsers:', sortUsers);


  // }, [checkNew, allMessages, messengers, users]);


//   const FilterMessages = (mass, messages) => {
//     let tempt
//     for (let i = 0; i < mass.length; i++) {
//          if (messages[i]) {
//               if (messages[i].chat_id != mass[i].chat_id) {
//                    for (let j = i + 1; j < mass.length; j++) {
//                         if (messages[i].chat_id == mass[j].chat_id) {
//                              tempt = mass[i]
//                              mass[i] = mass[j]
//                              mass[j] = tempt
//                         }
//                    }
//               }
//          }
         
//     }

//     return mass
// }

//   const Filter = (messages)=>{
//     var newMass = messages.filter((current, index, self) => {
//          return self.findIndex(item => item.chat_id == current.chat_id) == index
//     })

//     return newMass
// }


// // сортировка пользователей по сообщениям
//   const SortUserByLastMess = (listSort, usersort)=>{

//       let tempt
//       for(let i = 0; i < usersort.length; i++){
//           if(listSort[i]){
//             if(listSort[i].person1_id != usersort[i].user_id || listSort[i].person1_i2 != usersort[i].user_id){
//               for(let j = i+1; j < usersort.length; j++){
//                 if(listSort[i].person1_id == usersort[j].user_id || listSort[i].person1_i2 == usersort[j].user_id){
//                     tempt = usersort[i]
//                     usersort[i] = usersort[j]
//                     usersort[j] = tempt
//                 }
//               }
//             }
//           }
//       }

//       return usersort
//   }


  const checkMessanger = (el)=>{
    

    for(let i = 0; i < messengers.length; i++){
      let mess = messengers[i]
      if(mess.person1_id == el.user_id || mess.person2_id == el.user_id){
        return(
          <UserCart key={el.id} el={el} chatId={mess.chat_id} activeChat={activeChat} setActiveChat={setActiveChat}
           setMessengers={setMessengers} messengers={messengers} setActiveCompanion={setActiveCompanion} 
          //  setAllMessages={setAllMessages} setCheckNew={setCheckNew} checkNew={checkNew}
           />
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
            users?.map((el)=>{
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
                      <UserCart key={el.id} chatId={null} el={el} activeChat={activeChat} setActiveChat={setActiveChat} 
                      setMessengers={setMessengers} messengers={messengers} setActiveCompanion={setActiveCompanion} 
                      // setAllMessages={setAllMessages} setCheckNew={setCheckNew} checkNew={checkNew}
                      />
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