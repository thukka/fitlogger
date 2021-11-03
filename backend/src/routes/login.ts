import express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/', async (req, res) => {
    const body = req.body;
    const user: any = await User.findOne({ email: body.email });

    const passwordCorrect = user === null 
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

    console.log('password correct? ', passwordCorrect);

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'Invalid username or password'
        })
    };

    const userForToken = {
        username: user.email,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET as string, { expiresIn: 60 * 60 });

    return res.status(200).send({ token, username: user.email, name: user.name });
});

export default router;