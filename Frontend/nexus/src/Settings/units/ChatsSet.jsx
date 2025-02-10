import { useEffect, useState } from 'react'
import Vin from '../../assets/Vin.jpg'
import useHook from '../../Hooks/Hooks'
import axios from 'axios'


const ChatsSet = ()=>{

    const {users, messengers, setMessengers, userinfo, storage} = useHook()
    const[companions, setCompanions] = useState()

    useEffect(()=>{
        if(users && typeof users == 'object'){
            setCompanions(users)
        }
    }, [])


    const DeleteChat = (chat_id, url)=>{
        const Fetch = async()=>{
            let response = await axios.get(`http://127.0.0.1:8000/${url}/${chat_id}/`)
            if(response.data != null && response.data.result == true){

                if(url == "deleteChatHistory"){
                    alert("History is clear")
                }
                if(url == "deleteChat"){
                    setMessengers(prev=>prev.filter(items => items.chat_id !== chat_id))
                }
            }
        }
        alert("Are you sure?")
        Fetch()
    }



    const GetUser = (messenger)=>{

        return(
            Companion(messenger.person1_id, messenger.person2_id, messenger.chat_id)
        )
    }


    const Companion = (id1, id2, chat_id)=>{
        if(storage == id1){
            return (GetInfo(id2, chat_id))
        }
        else if(storage == id2){
            return GetInfo(id1, chat_id)
        }
    }

    const GetInfo = (id, chat_id)=>{
        for(var i = 0; i < users.length; i++){
            if(users[i].user_id == id){
                return(
                    <tr>
                        <td>{chat_id}</td>
                        <td><div className="tabel-block-userInfo"><div className="chatsPhotoUser" style={{backgroundImage: `url(${users[i].user_img})`}}></div>{users[i].user_first_name}</div></td>
                        <td><input className='chatSet-checkBox' type="checkbox" /></td>
                        <td><button className='chatDelete Clear' onClick={() =>DeleteChat(chat_id, "deleteChatHistory")}>Clear</button></td>
                        <td><button className='chatDelete' onClick={() =>DeleteChat(chat_id, "deleteChat")} >Delete</button></td>
                    </tr>
                )
            }
        }
    }

    return(
        <div id="1" className="chart-container">
        <div className="chart-container-header">
            Chats settings <ion-icon name="settings"></ion-icon>
        </div>
        <div className="chart-container-block">
            <div className="diagrams-content">
                <div className="settings-container">
                    <div className="container-chats">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>User</th>
                                    <th>BlackList</th>
                                    <th>Clear History</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                                                        
                        </table>
                            <div className="scroll-table">
                                <table>
                                    <tbody> 

                                    {
                                                messengers?.map((messenger) => {
                                                    if(messenger.person1_id != messenger.person2_id){
                                                        return(
                                                            GetUser(messenger)
                                                        )
                                                    }
                                                })
                                    }
    
                                </tbody>
                                </table>
                            </div>
                    </div>
                </div>                    
            </div>
        </div>
    </div>
    )
}

export default ChatsSet