import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();
import Entry from '../models/entry';
import { JwtPayload, Entry as EntryType } from '../types';

router.post('/new', async (req, res) => {
    try {
        const body = req.body;
        const newEntry: EntryType = {
            user: body.user,
            date: body.date,
            duration: body.duration,
            distance: body.distance,
            difficulty: body.difficulty ?? 0
        };
        const entry = new Entry(newEntry);
        const savedEntry = await entry.save();
        res.json(savedEntry);
    } catch ({ message }) {
        res.status(400).send(message);
    }
});

router.get('/', async (req, res) => {

    const token = req.headers.authorization;
    let decodedToken;

    try {
        decodedToken = jwt.verify(token as string, process.env.SECRET as string) as JwtPayload;
    } catch ({ message }) {
        console.log('Something went wrong when verifying token: ', message);
    }

    if (!token || decodedToken === undefined) {
        return res.status(400).send('Token was not found');
    }

    const user = decodedToken.username;
    try {
        const userEntryList = await Entry.find({ user: user });
        return res.json(userEntryList);
    } catch ({ message }) {
        return res.status(400).send(message);
    }
});

export default router;