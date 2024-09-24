
import message from '../assets/message.png'
import '../App.css'

const SendMessage = ()=>{
    return(
        <div className="chart-message-input-block">
            <div className="send-message-container">
            <div className="message-pack">
                <div className="attach-block">
                <ion-icon name="attach"></ion-icon>
                </div>
                <div className="text-field-message">
                <textarea name="" id="" placeholder='Введите текст сообщения'></textarea>
                </div>
                <div className="block-smile">😎</div>
            </div>
            <div className="send-message-button">
                <button className='sendMessage' style={{backgroundImage: `url(${message})`}}></button>
            </div>
            </div>
        </div>
    )
}

export default SendMessage