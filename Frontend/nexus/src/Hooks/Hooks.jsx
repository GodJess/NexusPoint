import { useEffect, useState } from "react"
import axios from 'axios'


const useHook = ()=>{
    const[storage, setStorage] = useState(localStorage.getItem('userId'))
    const[userinfo, setUserinfo] = useState({})
    const[users, setUsers] = useState([])
    const[isAuth, setIsAuth] = useState(false)
    const[messengers, setMessengers] = useState([])
    const[activeChat, setActiveChat] = useState(localStorage.getItem('activeChat'))

    useEffect(()=>{
        const Fetch = async()=>{
            if(storage != null){
                try{
                    const response = await axios.get(`http://127.0.0.1:8000/${storage}/`)
                    setUserinfo(response.data)
                    const answear = await axios.get('http://127.0.0.1:8000/getUsers/')
                    setUsers(answear.data)
                    const res = await axios.get(`http://127.0.0.1:8000/getChat/${storage}/`)
                    setMessengers(res.data)

                }
                catch{
                    console.log("У вас не идут данные с сервера")
                }
            }

            if(localStorage.getItem('userId') == null){
                setIsAuth(false)
            } else{
                setIsAuth(true)
            }

        }
        Fetch()

        
    }, [])

    

    return {userinfo, isAuth, setIsAuth, users, messengers, setMessengers, activeChat, setActiveChat}
}
export default useHook