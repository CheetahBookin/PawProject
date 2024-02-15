import axios from "axios";

const searchForCountryOrCity = async (search: string) => {
    try{
        const response = await axios.post('http://localhost:5000/search/country-city', {search});
        return response.data
    }catch(err){
        console.log(err)
    }
}

const searchForTrip = async (destination: string, dateFrom: string, dateTo: string, adult: number, children: number) => {
    try{
        const response = await axios.post('http://localhost:5000/search/trip', {destination, dateFrom, dateTo, adult, children});
        return response
    }catch(err: any){
        return err.response
    }
}

export {
    searchForCountryOrCity,
    searchForTrip
}