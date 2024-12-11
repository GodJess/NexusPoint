import { useEffect, useState } from "react"
import useHook from "../Hooks/Hooks"
import axios from "axios"
import './doc.css'
import docfile1 from '../assets/Docs1.png'
import docfile2 from '../assets/Docs2.png'

const DocMessage = ({message}) =>{

    const [documents, setDocuments] = useState([])
    const {storage} = useHook()

    useEffect(()=>{
        const getDoc = async()=>{
            try{
                const response = await axios.get(`http://127.0.0.1:8000/getDocuments/${message.message_id}/`)

                if( response != null ){
                    setDocuments(response.data)
                }
            }
            catch(error){
                console.log(error)
            }
            
        }

        getDoc()

    }, [])

    const FormatName = (url)=>{
        const fileNameEncoded = url.split('/').pop(); 
        const fileNameDecoded = decodeURIComponent(fileNameEncoded); // Декодируем название файла

        if(fileNameDecoded.length > 13){
            return String(fileNameDecoded).substring(0, 5) + "..." + String(fileNameDecoded).substring(fileNameDecoded.length - 5)
        }
        
        return fileNameDecoded
    }

    if(message.contain_files){
        if(storage == message.person_id){
            return(
                <div>
                    {documents?.map(doc=>{
                    return(
                        <div key={doc.id} className="container-files your">
                            <div  className="file-message-Block your">
                                <div className="main-file-container">
                                    <div className="blockDownload your">

                                        <a href={doc.document} download></a>
                                        <ion-icon className="iconDoc" name="document"></ion-icon>
                                    </div>

                                    <div className="fileName-download">
                                        {FormatName(doc.document)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                </div>
                
            )


        }
        else{
            return(
                <div>
                    {documents?.map(doc=>{
                    return(
                        <div key={doc.id} className="container-files">
                            <div  className="file-message-Block another">
                                <div className="main-file-container">
                                    <div className="blockDownload" >
                                    <a href={doc.document} download></a>
                                        <ion-icon className="iconDoc" name="document"></ion-icon>
                                    </div>

                                    <div className="fileName-download">
                                        {FormatName(doc.document)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                </div>
                
            )
        }

    }




}

export default DocMessage