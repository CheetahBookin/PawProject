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

const updateEmail = async (userId: number, email: string) => {
    try {
        const response = await axios.post(`http://localhost:5000/users/update-email`, { userId, email },  { withCredentials: true });
        return response;
    } catch (err: any) {
        return err.response;
    }
}

const updateNickname = async (userId: number, nickname: string) => {
    try {
        const response = await axios.post(`http://localhost:5000/users/update-nickname`, { userId, nickname },  { withCredentials: true });
        return response;
    } catch (err: any) {
        return err.response;
    }
}

const updatePassword = async (userId: number, newPassword: string, currentPassword: string) => {
    try {
        const response = await axios.post(`http://localhost:5000/users/update-password`, { userId, newPassword, currentPassword },  { withCredentials: true });
        return response;
    } catch (err: any) {
        return err.response;
    }
}

const updatePhone = async (userId: number, phone: string) => {
    try {
        const response = await axios.post(`http://localhost:5000/users/update-phone`, { userId, phone },  { withCredentials: true });
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
    resetPassword,
    updateEmail,
    updateNickname,
    updatePassword,
    updatePhone
}