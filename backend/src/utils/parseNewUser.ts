import { NewUser } from '../types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (str: unknown): string => {
    if (!str || !isString(str)) {
        throw new Error('Incorrect or missing field! ' + str);
    }
    return str;
};

const parsePassword = (str: unknown): string => {
    if (!str || !isString(str)) {
        throw new Error('Password is not a string or it is missing! ' + str);
    }
    if (str.length < 5) {
        throw new Error('Password is too short! Minimum 5 characters');
    }
    return str;
}

const parseNewUser = ({ name, password, email }: { name: unknown, password: unknown, email: unknown }): NewUser => {
    if (!name || !password || !email) {
        throw new Error('Incorrect request fields!');
    }

    const newUser: NewUser = {
        name: parseString(name),
        password: parsePassword(password),
        email: parseString(email),
    };

    return newUser;
};

export default parseNewUser;