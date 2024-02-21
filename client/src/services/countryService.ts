import axios from 'axios';

const getCountries = async () => {
    try{
        const response = await axios.get("http://localhost:5000/countries");
        return response;
    }catch(err: any){
        return err.response;
    }
}

const browseCitiesByCountry = async (country: string) => {
    try{
        const response = await axios.post("http://localhost:5000/countries/cities", {country});
        return response;
    }catch(err: any){
        return err.response;
    }
}

const browseHotelsByCity = async (city: string) => {
    try{
        const response = await axios.post("http://localhost:5000/countries/hotels", {city});
        return response;
    }catch(err: any){
        return err.response;
    }
}

export { getCountries, browseCitiesByCountry, browseHotelsByCity };