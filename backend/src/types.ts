export interface User {
    name: string,
    passwordHash: string,
    email: string,
    toJSON: () => string
}

export interface NewUser extends Omit<User, 'toJSON' | 'passwordHash'> {
    password: string
};