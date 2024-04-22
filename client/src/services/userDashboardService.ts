import axios from "axios";

const getFinishedUpcomingTrips = async (id: number) => {
    try {
        const response = await axios.get(`http://localhost:5000/dashboard/finupc/${id}`);
        return response
    } catch (error) {
        console.log(error)
    }
}

const getMostVisitedDestination = async (id: number) => {
    try {
        const response = await axios.get(`http://localhost:5000/dashboard/mostvisited/${id}`);
        return response
    } catch (error) {
        console.log(error)
    }
}

const nextTrip = async (id: number) => {
    try {
        const response = await axios.get(`http://localhost:5000/dashboard/next/${id}`);
        return response
    } catch (error) {
        console.log(error)
    }
}

const userLevel = async (id: number) => {
    try {
        const response = await axios.get(`http://localhost:5000/dashboard/level/${id}`);
        return response
    } catch (error) {
        console.log(error)
    }
}

export { getFinishedUpcomingTrips, getMostVisitedDestination, nextTrip, userLevel };