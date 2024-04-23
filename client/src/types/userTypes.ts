export type User = {
    id: number,
    username: string,
    email: string,
    agreement: boolean,
    phoneNumber: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
}

export type UserError = {
    error: string
}