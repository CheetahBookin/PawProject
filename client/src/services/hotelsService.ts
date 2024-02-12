import axios from "axios";

const getExactHotel = async (id: string) => {
    try{
        const response = await axios.get(`http://localhost:5000/hotels/${id}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

const getHotelsTypes = async () => {
    try{
        const response = await axios.get('http://localhost:5000/hotels/h/types');
        return response;
    } catch (error) {
        console.error(error);
    }
}

const browseByPropertyType = async (type: string) => {
    try{
        const response = await axios.post('http://localhost:5000/hotels/h/types', {type});
        return response;
    } catch (error) {
        console.error(error);
    }
}

export {
    getExactHotel,
    getHotelsTypes,
    browseByPropertyType
}