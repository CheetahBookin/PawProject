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

const forgotPassword = async (email: string) => {
    try {
        const response = await axios.post(`http://localhost:5000/users/forgot-password`, { email });
        return response;
    } catch (err: any) {
        return err.response;
    }
}

const resetPassword = async (email: string, resetCode: string, newPassword: string) => {
    try {
        const response = await axios.post(`http://localhost:5000/users/reset-password`, { email, resetCode, newPassword });
        return response;
    } catch (err: any) {
        return err.response;
    }
}

export {
    getUser,
    logout,
    givePermission,
    forgotPassword,
    resetPassword
}