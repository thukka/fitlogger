import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';

const verifyToken = (token: string) => {
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.SECRET as string) as JwtPayload;
    } catch ({ message }) {
        console.log('Something went wrong when verifying token: ', message);
    }

    return decodedToken;
};

export default verifyToken;