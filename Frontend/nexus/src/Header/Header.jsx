import { useCallback } from "react";
import "../App.css"
import vin from '../assets/Vin.jpg'
import useHook from "../Hooks/Hooks"
import CompanInfo from "./CompainInfo";

const Header = ({setModal, search, setSearch, activeCompanion, setActiveCompanion})=>{

    const {userinfo, users} = useHook();

    const Modal = ()=>{
        setModal(true)
        console.log("Окно успешно открыто")
    }

    const SearchValue = useCallback((element)=>{
      setSearch(element.target.value)
      console.log(search)
    }, [search])


    return(
        <header className="header">
          <div className="header-menu">
            <div className="top-nav-menu">
              <div onClick={()=>Modal()} className="menu-button"><ion-icon name="menu"></ion-icon></div>
              <h1 >Nexus Point</h1>
            </div>
            <div className="block-search">
              <div className="search">
                  <div className="search-button" ><ion-icon  className="lupa" name="search"></ion-icon></div>
                  <input value={search} 
                  onChange={(element)=>
                    SearchValue(element)
                    } 
                    className='input-search' placeholder="Search" type="text" />
              </div>
            </div>
          </div>
          <CompanInfo activeCompanion={activeCompanion} setActiveCompanion={setActiveCompanion} />
      </header>
    )
}

export default Header