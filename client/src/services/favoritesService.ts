import axios from "axios";

const getFavorites = async (id: number) => {
    try{
        const response = await axios.get(`http://localhost:5000/favs/favs/${id}`);
        return response
    } catch (error) {
        console.error(error);
    }
};

const getFavoritesHotels = async (id: number) => {
    try{
        const response = await axios.get(`http://localhost:5000/favs/hotels/${id}`);
        return response
    } catch (error) {
        console.error(error);
    }
}

const postFavorite = async (userId: number, hotelId: number) => {
    try{
        const response = await axios.post("http://localhost:5000/favs", { userId, hotelId });
        return response
    } catch (error) {
        console.error(error);
    }
};

const removeFavorite = async (userId: number, hotelId: number) => {
    try{
        const response = await axios.delete("http://localhost:5000/favs", { data: { userId, hotelId } });
        return response
    } catch (error) {
        console.error(error);
    }
};

export { getFavorites, postFavorite, removeFavorite, getFavoritesHotels };