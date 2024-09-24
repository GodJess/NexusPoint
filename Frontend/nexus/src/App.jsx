import { useState } from 'react'
import './App.css'
import Header from './Header/Header'

import Messanger from './Messages/Messanger'
import Panel from './PanelUser/panel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="main">
      <Header />
      <div className="container">
        <Panel />
        <Messanger />
      </div>
    </div>
  )
}

export default App
