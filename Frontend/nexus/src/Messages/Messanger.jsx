
import { useEffect, useState } from 'react'
import '../App.css'
import './message.css'
import Messages from './Messages'
import SendMessage from './Send'
import axios from 'axios'
import Window from './WIndow'
import FilesWindows from './fileWindow'
import ModelLoadFiles from './ModalLoadFiles'
import FixedPanel from './FixedPanel/FixedPanel'

const Messanger = ({activeChat, setActiveChat, storage, fixedPanel, setFixedPanel})=>{

    const[messages, setMessages] = useState([])
    const [emojWindow, setEmojWindow] = useState(false)
    const [textMessage, setTextMessage] = useState('')
    const [fileWindow, setFileWindow] = useState(false)
    const[nameWindow, setNameWindow] = useState('')
    const[window, setWindow] = useState(false)
    const [media, setMedia] = useState('Images')
    

    useEffect(()=>{
        const fetch = async()=>{
            setFileWindow(false)
            setEmojWindow(false)
            setFixedPanel(false)
            setMedia('Images')
            try{
                const resp = await axios.get(`http://127.0.0.1:8000/getMessage/${activeChat}/`)
                console.log(`Получить сообщения по чату ${activeChat}`)
                setMessages(resp.data)
                console.log(messages)
            }
            catch{
                console.log('')
            }
        }

        fetch()

    }, [activeChat])



    if(activeChat != null){
        return(
            <main className="block-chat">

                <Messages messages={messages} storage={storage} activeChat={activeChat} />
                <SendMessage storage={storage} activeChat={activeChat} messages={messages} setMessages={setMessages} emojWindow={emojWindow} setEmojWindow={setEmojWindow} textMessage={textMessage} setTextMessage={setTextMessage} fileWindow={fileWindow} setFileWindow={setFileWindow}/>
                <Window emojWindow={emojWindow} setEmojWindow={setEmojWindow} textMessage={textMessage} setTextMessage={setTextMessage} />
                <FilesWindows fileWindow={fileWindow} setFileWindow={setFileWindow}  setNameWindow={setNameWindow} setWindow={setWindow} fixedPanel={fixedPanel} setFixedPanel={setFixedPanel} />
                <ModelLoadFiles setWindow={setWindow} window={window} nameWindow={nameWindow} activeChat={activeChat} />
                <FixedPanel fixedPanel={fixedPanel} setFixedPanel={setFixedPanel} messages={messages} activeChat={activeChat} media={media} setMedia={setMedia} />

            </main>
        )
    }
    else{
        return(
            <main className="block-chat">
                <div className="not-active-chat-block">
                    <div className="animate-chat">
                        <div className="animate-text">You don`t have an active chat</div>
                        <div className="chat-anim">
                            <div className="srodek kolor-tla">
                                <div id="qlogo">
                                <div className="poziomq">
                                    <figure className="liscie">
                                    <span className="lisc-lewy"><span className="after"></span></span>
                                    <span className="lisc-lewy drugi"><span className="after"></span></span>
                                    <span className="lisc-prawy"><span className="after"></span></span>
                                    <span className="lisc-prawy drugi"><span className="after"></span></span>
                                    <span className="lodyga"></span>
                                    </figure>
                                    <figure className="rece">
                                    <span className="reka reka-lewa"></span>
                                    <span className="reka reka-prawa"></span>
                                    </figure>
                                    <figure className="cialo">
                                    <span className="twarz">
                                        <span className="oczy">
                                        <span className="oko oko-lewe"></span>
                                        <span className="oko oko-prawe"></span>
                                        </span>
                                        <span className="piegi">
                                        <span className="pieg pieg-lewy"></span>
                                        <span className="pieg pieg-prawy"></span>
                                        </span>
                                        <span className="buzia">
                                        <span className="gardlo"></span>
                                        <span className="zuby"></span>
                                        </span>
                                    </span>
                                    </figure>
                                    <figure className="nogi">
                                    <span className="noga-lewa"></span>
                                    <span className="noga-prawa"></span>
                                    </figure>
                                </div>
                                <figure className="cien"></figure>
                                <figure className="tekst">Hover Me!</figure>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Messanger