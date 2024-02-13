import axios from "axios";

const searchForCountryOrCity = async (search: string) => {
    const response = await axios.post('http://localhost:5000/search/country-city', {search});
    return response.data
}

export {
    searchForCountryOrCity
}