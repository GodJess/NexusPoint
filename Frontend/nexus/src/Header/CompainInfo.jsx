import axios from "axios";
import useHook from "../Hooks/Hooks";
import { useRef, useState, useEffect } from "react";

const CompanInfo = ({activeCompanion, setActiveCompanion, count, fixedPanel, setFixedPanel})=>{

    const CheckLengthName = (f, l)=>{
        let length = f + " " + l;
        if(length.length > 15){
          length = length.substring(0, 15)
        }
        return length
    }
       
    if(activeCompanion != null){
        return(
            <div className="header-message-info">
            <div className="about-user">
                <div className="photo-block">
                  <div className="photo" style={{ backgroundImage: `url(${activeCompanion.user_img})`}}></div>
                </div>
                <div className="user-info-block">
                  <div className="block-name">{CheckLengthName(activeCompanion.user_first_name, activeCompanion.user_last_name)}</div>
                  <div className="online-params"><ion-icon name="radio-button-on"></ion-icon> Online</div>
                  <div className="count-message"> ~ {count} messages</div>
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
              <div className="iconn btn" onClick={()=>{
                if(fixedPanel){
                  setFixedPanel(false)
                }
                else{
                  setFixedPanel(true)
                }
              }}>
                <ion-icon  className="icons"name="apps"></ion-icon>
              </div>
            </div>
          </div>
        )
    }
    else{
        return(
          <div className="header-message-info">
            
          </div>
        )
    }
}

export default CompanInfo