import axios from "axios";

class GetLastMessage{
    getMess(el){
        try{
            if(el.length <= 16) return el + '...'
            return el.substring(0, 16) + '...'
        }
        catch(error){
            console.error("Error", error)
            return null
        }

    }
}

export const getLastMessage = new GetLastMessage()