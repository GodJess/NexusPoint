
import '../App.css'
import Messages from './Messages'
import SendMessage from './Send'

const Messanger = ()=>{
    return(
        <main className="block-chat">
            <Messages />
            <SendMessage />

        </main>
    )
}

export default Messanger