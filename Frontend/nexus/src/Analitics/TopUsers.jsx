import { useEffect, useState } from 'react';
import axios from 'axios';
import useHook from '../Hooks/Hooks';

const TopUsers = ({userss}) => {
    const {users} = useHook()
    const[top, setTop] = useState([])
    const[list, setList] = useState([])

    useEffect(()=>{
        if(userss != null){
            setTop(userss)
            setList(userss.slice(1, 5))
        }
    }, [])

    const getPhoto = (el)=>{
        for(var i = 0; i < users.length; i++){
            if(el == users[i].user_id){
                return users[i].user_img
            }
        }
    }


    const CheckName = (el)=>{
        if(el.length > 9){
            return el.substring(0,6) + ".."
        }
        return el
    }



    const getName = () => {
        return top.length > 0 ? top[0].user_name : 'Нет пользователей';
    };

    return (
        <div className="chart-topUsers-block">
            <div className="chart-user-container">
                <div className="chartUser-container">
                    <div className="block-crown">
                        <div className="crown"></div>
                    </div>
                    <div className="chartUser-image" style={{backgroundImage: `url(${getPhoto(top.length > 0 ? top[0].user_id: null)})`}}></div>
                </div>
                <div className="chartUser-container-info">
                    <p>login: {getName()}</p>
                    <p>count mess: {top.length > 0 ? top[0].count : 'N/A'}</p>
                </div>
            </div>

            <div className="toplist-users">

                {
                    list?.map((el)=>{
                            return(
                                <div key={el.user_id} className="top5user-container">
                                    <div className="top5user-photo-block">
                                        <div className="topPhotoBlock" style={{backgroundImage: `url(${getPhoto(el.user_id)})`}}></div> 
                                        <div className="top5user-name">{CheckName(el.user_name)}</div>
                                    </div>
                                    <div className="top5user-result"> count: {el.count}</div>
                                </div>
                            )
                    })
                }
                

            </div>
        </div>
    );
};

export default TopUsers;
