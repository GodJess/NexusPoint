

const CompanInfo = ({activeCompanion, setActiveCompanion})=>{
    if(activeCompanion != null){
        return(
            <div className="header-message-info">
            <div className="about-user">
                <div className="photo-block">
                  <div className="photo" style={{ backgroundImage: `url(${activeCompanion.user_img})`}}></div>
                </div>
                <div className="user-info-block">
                  <div className="block-name">{activeCompanion.user_first_name} {activeCompanion.user_last_name}</div>
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
        )
    }
    else{
        return null
    }
}

export default CompanInfo