import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header/Header'

import Messanger from './Messages/Messanger'
import Panel from './PanelUser/panel'
import Avtoriz from './Avtorizations/Avtoriz'
import useHook from './Hooks/Hooks'
import Popup from './Popup/Popup'


function App() {
  const [count, setCount] = useState(0)
  const {isAuth, setIsAuth, users} = useHook()
  const [modal, setModal] = useState(false)
  const [search, setSearch] = useState('')


  if (!isAuth) return <Avtoriz setIsAuth={setIsAuth} />
  return (
    <div className="main">
      <Popup modal={modal} setModal={setModal} setIsAuth={setIsAuth}/>
      <Header setModal={setModal} search={search} setSearch={setSearch} />
      <div className="container">
        <Panel search={search}/>
        <Messanger />
      </div>
    </div>
  )
}

export default App
