import "../App.css"
import vin from '../assets/Vin.jpg'


const Header = ()=>{
    return(
        <header className="header">
          <div className="header-menu">
            <div className="top-nav-menu">
              <div className="menu-button"><ion-icon name="menu"></ion-icon></div>
              <h1>Nexus Point</h1>
            </div>
            <div className="block-search">
              <div className="search">
                  <div className="search-button"><ion-icon className="lupa" name="search"></ion-icon></div>
                  <input className='input-search' placeholder="Search" type="text" />
              </div>
            </div>
          </div>
          <div className="header-message-info">
            <div className="about-user">
                <div className="photo-block">
                  <div className="photo" style={{ backgroundImage: `url(${vin})`}}></div>
                </div>
                <div className="user-info-block">
                  <div className="block-name">Панк Скинхедович</div>
                  <div className="online-params"><ion-icon name="radio-button-on"></ion-icon> Online</div>
                  <div className="count-message"> ~ 5000 messages</div>
                </div>
            </div>
            <div className="user-communication">
              <div className="iconn">
                <ion-icon className="icons" name="search"></ion-icon>
              </div>
              <div className="iconn">
                <ion-icon className="icons" name="call"></ion-icon>
              </div>
              <div className="iconn">
                <ion-icon className="icons" name="videocam"></ion-icon>
              </div>
              <div className="iconn btn">
                <ion-icon  className="icons"name="apps"></ion-icon>
              </div>
            </div>
          </div>
      </header>
    )
}

export default Header