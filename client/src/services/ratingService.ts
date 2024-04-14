import axios from "axios";

const getRates = async (hotelId: number) => {
    try{
        const response = await axios.post('http://localhost:5000/rating', {hotelId})
        return response.data
    }catch(err){
        console.log(err)
    }
}

export {getRates}