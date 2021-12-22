import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import User from '../models/user';
import { User as UserType, NewUser } from '../types';
import parseNewUser, { parsePassword } from '../utils/parseNewUser';

router.get('/', async (_req, res) => {
    const users: UserType[] = await User.find({});
    res.json(users.map(u => u.toJSON()));
});

router.post('/', async (req, res) => {
    try {
        const body: NewUser = parseNewUser(req.body);

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(body.password, saltRounds);

        const user = new User({
            name: body.name,
            email: body.email,
            passwordHash,
        })

        const savedUser = await user.save();
        res.json(savedUser);
    } catch ({ message }) {
        res.status(400).send(message);
    }
});

router.put('/reset', async (req, res) => {
    try {
        const email = req.body.email;
        const newPassword = parsePassword(req.body.password);
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        const updatedUser = await User.findOneAndUpdate({ email: email }, { passwordHash: newPasswordHash }, { new: true });
        res.json(updatedUser);
    } catch ({ message }) {
        res.status(401).send(message);
    }
});

export default router;