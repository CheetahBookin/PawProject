export type User = {
    id: number,
    username: string,
    email: string,
    agreement: boolean,
    password: string,
    createdAt: Date,
    updatedAt: Date
}

export type UserError = {
    error: string
}