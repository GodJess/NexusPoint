import './settings.css'
import InfoHeader from '../Analitics/InfoHeader'
import { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'

const Settings = ()=>{

    const[isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        setTimeout(()=>{setIsLoading(false)}, 1000)
    }, [])

    if(isLoading) return <Loading />

    return(
        <div className="main-settings-block">
            <InfoHeader />
            {/* <div className="settings-main-container">
                 <div className="containerSet">
                    <div className="container-blockSet">
                        <div className="container-header">
                            <h1>Settings Views</h1>
                        </div>
                    </div>

                    <div className="container-blockSet">
                        <div className="container-header">
                            <h1>Chat Settings</h1>
                        </div>
                    </div>
                 </div>
            </div> */}

                <div className="main-blockContainer-settings">
                    <div className="profile-section">
                        <div className="profile-card">
                            <div className="profile-photo">
                                <img 
                                    src="https://i.pinimg.com/736x/c2/84/f8/c284f888895255ee022dbe42cbdedc98.jpg" 
                                    alt="Фото профиля" 
                                />
                            </div>
                            <button className="btn change-photo">Изменить фото</button>
                        </div>
                        <div className="mainSettingsblock">
                            
                            <div className="personal-data">
                                <h2 className='h2' >Личные данные</h2>
                                <form>
                                    <label htmlFor="first_name">Имя:</label>
                                    <input type="text" id="first_name" name="first_name" defaultValue="Иван" />
                                    
                                    <label htmlFor="last_name">Фамилия:</label>
                                    <input type="text" id="last_name" name="last_name" defaultValue="Иванов" />
                                    
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" name="email" defaultValue="ivan@example.com" />
                                    
                                    <label htmlFor="phone">Телефон:</label>
                                    <input type="tel" id="phone" name="phone" defaultValue="1234567890" />
                                    
                                    <label htmlFor="description">Описание:</label>
                                    <textarea id="description" name="description" defaultValue="Я занят"></textarea>

                                    <button type="button" className="btn save">Сохранить изменения</button>
                                </form>
                            </div>

                            <div className="chats-section">
                                <h2 className='h2'> Управление чатами</h2>
                                <ul className="chat-list">
                                    <li className="chat-item">
                                        <span>Чат с Анной</span>
                                        <button className="btn block">Заблокировать</button>
                                        <button className="btn delete">Удалить</button>
                                    </li>
                                    <li className="chat-item">
                                        <span>Чат с Сергеем</span>
                                        <button className="btn block">Заблокировать</button>
                                        <button className="btn delete">Удалить</button>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        
                    </div>


                    <div className="stats-section">
                        <h2>Статистика</h2>
                        <p>Количество сообщений: <strong>250</strong></p>
                        <p>Частота общения: <strong>15 чатов</strong></p>
                        <p>Чат с наибольшим количеством сообщений: <strong>Чат с Анной</strong></p>
                        <p>Последний вход: <strong>2023-10-01 14:30</strong></p>
                    </div>
                </div>
        </div>
    )
}

export default Settings