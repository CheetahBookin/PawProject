import axios from "axios";

const getUserProfile = async (userId: number) => {
    try {
        console.log(userId)
        const response = await axios.get(`http://localhost:5000/up/${userId}`);
        return response
    } catch (error: any) {
        console.log(error)
        return error;
    }
}

const createUserProfile = async (userId: number, firstName: string, lastName: string, country: string, address: string, profileImage: string, darkMode: boolean) => {
    try {
        const response = await axios.post(`http://localhost:5000/up`, {
            userId,
            firstName,
            lastName,
            country,
            address,
            profileImage,
            darkMode
        });
        return response
    } catch (error: any) {
        return error;
    }
}

const updateUserProfile = async (userId: number, firstName: string, lastName: string, country: string, address: string, profileImage: string, darkMode: boolean) => {
    try {
        const response = await axios.put(`http://localhost:5000/up`, {
            userId,
            firstName,
            lastName,
            country,
            address,
            profileImage,
            darkMode
        });
        return response
    } catch (error: any) {
        console.log(error)
        return error;
    }
}

const getMode = async (userId: number) => {
    try {
        const response = await axios.get(`http://localhost:5000/up/mode/${userId}`);
        return response
    } catch (error: any) {
        console.log(error)
        return error;
    }
}

export { getUserProfile, createUserProfile, updateUserProfile, getMode }