export type RegisterData = {
    email: string;
    username: string;
    agreement: boolean;
    password: string;
    confirmPassword: string;
};

export type LoginData = {
    email: string;
    password: string;
};