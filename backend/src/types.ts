export interface User {
    name: string,
    passwordHash: string,
    email: string,
    toJSON: () => string,
    _id?: string
}

export interface UserLoginCredentials {
    email: string,
    password: string,
}

export interface Entry {
    user: string,
    date: string,
    duration: number,
    distance: number,
    difficulty?: number
}

export interface UnknownEntry {
    user: unknown,
    date: unknown,
    duration: unknown,
    distance: unknown,
    difficulty?: unknown
}

export interface NewUser extends Omit<User, 'toJSON' | 'passwordHash'> {
    password: string
}

export interface JwtPayload {
    id: string,
    username: string,
    iat: number,
    exp: number,
}

export interface MongoReturnedObjectEntry {
    id?: string,
    __v?: string,
    _id?: string,
}

export interface MongoReturnedObjectUser extends MongoReturnedObjectEntry {
    passwordHash?: string
}