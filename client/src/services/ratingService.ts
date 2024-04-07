import axios from "axios";

const getRates = async () => {
    try{
        const response = await axios.get('http://localhost:5000/rating', {})
        return response.data
    }catch(err){
        console.log(err)
    }
}

export {getRates}