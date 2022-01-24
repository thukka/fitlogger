import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';

const tokenExtractor = (token: string) => {
    if (token.startsWith('bearer ')) {
        return token.substring(7);
    } else {
        throw new Error('Malformed token.');
    }
};

const verifyToken = (token: string) => {
    try {
        token = tokenExtractor(token);
    } catch (err) {
        return undefined;
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.SECRET as string) as JwtPayload;
    } catch ({ message }) {
        console.log('Something went wrong when verifying token: ', message);
    }
    return decodedToken;
};

export default verifyToken;