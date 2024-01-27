export type User = {
    username: string,
    email: string,
    password: string
}

export type FullUser = User & {
    id: number,
    createdAt: Date,
    updatedAt: Date
}