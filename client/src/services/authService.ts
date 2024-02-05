import axios from 'axios';

const register = async (email: string, username: string, agreement: boolean, password: string, confirmPassword: string) => {
    try{
        const response = await axios.post("http://localhost:5000/auth/register", {email, username, agreement, password, confirmPassword}, {withCredentials: true});
        return response;
    }catch(err: any){
        return err.response;
    }
}

const login = async (email: string, password: string) => {
    try{
        const response = await axios.post("http://localhost:5000/auth/login", {email, password}, {withCredentials: true});
        return response;
    }catch(err: any){
        return err.response;
    }
}

export { register, login };