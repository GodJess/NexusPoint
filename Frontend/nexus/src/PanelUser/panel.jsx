import '../App.css'
import vin from '../assets/Vin.jpg'


const Panel = ()=>{
    return(
        <aside className="aside">

          <div className="message-container">
            <div className="message-photo-block">
              <div className="message-photo" style={{ backgroundImage: `url(${vin})`}}></div>
            </div>
            <div className="message-info">
              <div className="message-about-user">
                <div className="message-name-user">Yak1ov</div> 
                <div className="message-date">01.09.24</div>
                </div>
              <div className="last-message">Какой-то замысло...</div>
            </div>
          </div>

          <div className="message-container">
            <div className="message-photo-block">
              <div className="message-photo" style={{ backgroundImage: `url(${"https://p16-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/a8ad5fc0aa383de138296f680a6844ff.jpeg"})`}}></div>
            </div>
            <div className="message-info">
              <div className="message-about-user">
                <div className="message-name-user">Alinok</div> 
                <div className="message-date">01.09.24</div>
                </div>
              <div className="last-message">Какой-то замысло...</div>
            </div>
          </div>

          <div className="message-container">
            <div className="message-photo-block">
              <div className="message-photo" style={{ backgroundImage: `url(${'https://photo4.wambacdn.net/56/13/99/1790993165/2101118844_huge.jpg?hash=OlSA3oC7LeWGVkGUdbiNYg&expires=64060578000&updated=1641572562'})`}}></div>
            </div>
            <div className="message-info">
              <div className="message-about-user">
                <div className="message-name-user">Nikitos</div> 
                <div className="message-date">01.09.24</div>
                </div>
              <div className="last-message">Какой-то замысло...</div>
            </div>
          </div>

          

        </aside>
    )
}

export default Panel