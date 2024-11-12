import './LoadImg.css'
import Close from '../assets/Close.png'
import { useRef, useState } from 'react'
import axios from 'axios';
import useHook from '../Hooks/Hooks';

const LoadImg = ({setLoadImg, loadImg})=>{

    const [imagePreview, setImagePreview] = useState(null);
    const imgFile = useRef(null)
    const {storage} = useHook()


    const setProfileImage = ()=>{

        const fetch = async()=>{
            if(imagePreview != null){
                const formData = new FormData();
                formData.append('image', imgFile.current.files[0]);
                console.log(`ФОТО обновляется у пользователя ${storage}`)
                const response  = await axios.post(`http://127.0.0.1:8000/setUserImg/${storage}/`,  formData,      {
                    headers: {
                     'Content-Type': 'multipart/form-data',
                    },
                   })
                if(response.data.status == true){
                    window.location.reload();
                }
            }
        }

        fetch()
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
    
        if (file && file.type.startsWith("image/")) {   
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setImagePreview(reader.result)
            };
            reader.readAsDataURL(file);
        }
      };


    if(loadImg) return(
        <div className="block-Loadimg-window">
            <div className="loadimgBlock">
                <div className="loadImg-header">
                    <p>Set Image</p>
                    <div className="closeLoad" style={{backgroundImage: `url(${Close})`}} onClick={()=> {
                        setLoadImg(false)
                        setImagePreview(false)
                        } }></div>
                </div>
                <form className='photoForm' action="">
                <div className="blockInputLoad" style={{backgroundImage: `url(${imagePreview})`}}>
                    <p>+</p>
                    <input className='inputIMG' type="file" name="myImage" accept="image/png, image/gif, image/jpeg" 
                    ref={imgFile} onChange={handleImageChange}
                    />
                </div>
                <div className='LoadForm' action="">
                    <button type='button' onClick={()=>{setProfileImage()}} >Set <ion-icon name="refresh"></ion-icon></button>
                </div>
                </form>
            </div>
        </div>
    )
}


export default LoadImg