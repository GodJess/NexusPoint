import Vin from '../../assets/Vin.jpg'


const ChatsSet = ()=>{
    return(
        <div id="1" className="chart-container">
        <div className="chart-container-header">
            Chats settings <ion-icon name="settings"></ion-icon>
        </div>
        <div className="chart-container-block">
            <div className="diagrams-content">
                <div className="settings-container">
                    <div className="container-chats">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>User</th>
                                    <th>BlackList</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                                                        
                        </table>
                            <div className="scroll-table">
                                <table>
                                    <tbody> 
                                    <tr>
                                        <td>5245243</td>
                                        <td><div className="tabel-block-userInfo"><div className="chatsPhotoUser" style={{backgroundImage: `url(${Vin})`}}></div> Ykovds</div></td>
                                        <td><input className='chatSet-checkBox' type="checkbox" /></td>
                                        <td><button className='chatDelete' >Delete</button></td>
                                    </tr>

                                    <tr>
                                        <td>5245243</td>
                                        <td><div className="tabel-block-userInfo"><div className="chatsPhotoUser" style={{backgroundImage: `url(${Vin})`}}></div> Ykovds</div></td>
                                        <td><input className='chatSet-checkBox' type="checkbox" /></td>
                                        <td><button className='chatDelete' >Delete</button></td>
                                    </tr>

                                    <tr>
                                        <td>5245243</td>
                                        <td><div className="tabel-block-userInfo"><div className="chatsPhotoUser" style={{backgroundImage: `url(${Vin})`}}></div> Ykovds</div></td>
                                        <td><input className='chatSet-checkBox' type="checkbox" /></td>
                                        <td><button className='chatDelete' >Delete</button></td>
                                    </tr>

                                    <tr>
                                        <td>5245243</td>
                                        <td><div className="tabel-block-userInfo"><div className="chatsPhotoUser" style={{backgroundImage: `url(${Vin})`}}></div> Ykovds</div></td>
                                        <td><input className='chatSet-checkBox' type="checkbox" /></td>
                                        <td><button className='chatDelete' >Delete</button></td>
                                    </tr>

                                    <tr>
                                        <td>5245243</td>
                                        <td><div className="tabel-block-userInfo"><div className="chatsPhotoUser" style={{backgroundImage: `url(${Vin})`}}></div> Ykovds</div></td>
                                        <td><input className='chatSet-checkBox' type="checkbox" /></td>
                                        <td><button className='chatDelete' >Delete</button></td>
                                    </tr>

                                    <tr>
                                        <td>5245243</td>
                                        <td><div className="tabel-block-userInfo"><div className="chatsPhotoUser" style={{backgroundImage: `url(${Vin})`}}></div> Ykovds</div></td>
                                        <td><input className='chatSet-checkBox' type="checkbox" /></td>
                                        <td><button className='chatDelete' >Delete</button></td>
                                    </tr>

                                    <tr>
                                        <td>5245243</td>
                                        <td><div className="tabel-block-userInfo"><div className="chatsPhotoUser" style={{backgroundImage: `url(${Vin})`}}></div> Ykovds</div></td>
                                        <td><input className='chatSet-checkBox' type="checkbox" /></td>
                                        <td><button className='chatDelete' >Delete</button></td>
                                    </tr>
    
                                </tbody>
                                </table>
                            </div>
                    </div>
                </div>                    
            </div>
        </div>
    </div>
    )
}

export default ChatsSet