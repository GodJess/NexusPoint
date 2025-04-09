import { useCallback, useEffect, useState } from 'react'
import './App.css'
import Header from './Header/Header'
import Loading from './Loading/Loading'
import Messanger from './Messages/Messanger'
import Panel from './PanelUser/panel'
import Avtoriz from './Avtorizations/Avtoriz'
import useHook from './Hooks/Hooks'
import Popup from './Popup/Popup'
import axios from 'axios'
import LoadImg from './LoadIMG/LoadImg'


function App() {
    const [count, setCount] = useState(0)
    const {isAuth, setIsAuth, storage, activeChat, setActiveChat, isLoading, setIsLoading} = useHook()
    const [modal, setModal] = useState(false)
    const [search, setSearch] = useState('')
    const [activeCompanion, setActiveCompanion] = useState({})
    const [loadImg, setLoadImg] = useState(false)
    const [fixedPanel, setFixedPanel] = useState(false)

    useEffect(()=>{
      const fetch = async()=>{
        console.log(storage)
        if(activeChat != null){
          try{
            const response = await axios.post(`http://127.0.0.1:8000/getCompanion/${storage}/`, {"chat_id" : activeChat})
            if( response.data != null){
              setActiveCompanion(response.data)
              console.log("Все успешно")
            }
          }
          catch{
            console.log("Ошибка")
          }
          
        }
      }
      
      fetch()
    }, [])


    if(isLoading) return <Loading />
    if(isAuth){
      return (
        <div className="main">
          <LoadImg setLoadImg={setLoadImg} loadImg={loadImg} />
          <Popup modal={modal} setModal={setModal} setIsAuth={setIsAuth} setLoadImg={setLoadImg} loadImg={loadImg} />
          <Header setModal={setModal} search={search} setSearch={setSearch} activeCompanion={activeCompanion} setActiveCompanion={setActiveCompanion} activeChat={activeChat} fixedPanel={fixedPanel} setFixedPanel={setFixedPanel}/>
          <div className="container">
            <Panel search={search} activeCompanion={activeCompanion} setActiveCompanion={setActiveCompanion} activeChat={activeChat} setActiveChat={setActiveChat} />
            <Messanger activeChat={activeChat} setActiveChat={setActiveChat} storage={storage} fixedPanel={fixedPanel} setFixedPanel={setFixedPanel} />
          </div>
        </div>
      )
    }
    else if(!isAuth) return <Avtoriz setIsAuth={setIsAuth} />
}

export default App
