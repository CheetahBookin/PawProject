import axios from "axios";

const getUser = async () => {
    try {
        const response = await axios.post(`http://localhost:5000/users`, {},  { withCredentials: true });
        return response;
    } catch (err: any) {
        return err.response;
    }
}

const logout = async () => {
    try {
        const response = await axios.post(`http://localhost:5000/users/logout`, {},  { withCredentials: true });
        return response;
    } catch (err: any) {
        return err.response;
    }
}

const givePermission = async () => {
    try {
        const response = await axios.post(`http://localhost:5000/users/permission`, {},  { withCredentials: true });
        return response;
    } catch (err: any) {
        return err.response;
    }
}

export {
    getUser,
    logout,
    givePermission
}