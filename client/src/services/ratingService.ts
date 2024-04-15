import axios from "axios";

const getRates = async (hotelId: number) => {
    try{
        const response = await axios.post('http://localhost:5000/rating', {hotelId})
        return response.data
    }catch(err){
        console.log(err)
    }
}

const postRates = async(rating: number, comment: string, userId: number, hotelId: number)=>{
    try {
        const response  = await  axios.post('http://localhost:5000/rating/post',
            {rating, comment, userId, hotelId})
        return response.data
    }catch(err){
        console.log(err)
    }
}

const existingRating = async(userId: number, hotelId: number) =>{
    try {
        const response = await axios.post('http://localhost:5000/rating/existingRating', {userId, hotelId})
        return response.data
    }catch (err){
        console.log(err)
    }
}

const deleteRating = async(userId: number, hotelId: number)=>{
    try{
        await axios.delete('http://localhost:5000/rating/deleteRating', {data: {userId, hotelId}},)
    }catch (err){
        console.log(err)
    }
}

export {getRates, postRates, existingRating, deleteRating}