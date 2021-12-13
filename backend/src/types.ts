export interface User {
    name: string,
    passwordHash: string,
    email: string,
    toJSON: () => string
}

export interface Entry {
    user: string,
    date: string,
    duration: number,
    distance: number,
    difficulty?: number
}

export interface NewUser extends Omit<User, 'toJSON' | 'passwordHash'> {
    password: string
};

export interface JwtPayload {
    id: string,
    username: string,
    iat: number,
    exp: number,
}