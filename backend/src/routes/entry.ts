import express from 'express';
const router = express.Router();
import Entry from '../models/entry';
import { Entry as EntryType } from '../types';
import verifyToken from '../utils/verifyToken';

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
    let decodedToken = verifyToken(token as string);

    if (!token || decodedToken === undefined) {
        return res.status(401).json({ error: 'Token expired or it was not found' });
    }

    const user = decodedToken.username;
    try {
        const userEntryList = await Entry.find({ user: user });
        return res.json(userEntryList);
    } catch ({ message }) {
        return res.status(400).send(message);
    }
});

router.delete('/:id', async (req, res) => {
    const token = req.headers.authorization;
    let decodedToken = verifyToken(token as string);

    if (!token || decodedToken === undefined) {
        return res.status(401).json({ error: 'Token expired or it was not found' });
    }

    const entry: EntryType | null = await Entry.findById(req.params.id);
    if (decodedToken.username.toString() === entry?.user) {
        await Entry.findByIdAndRemove(req.params.id);
        return res.status(204).send('Entry deleted');
    }

    return res.status(401).json({ error: 'Unauthorized access' });
});

export default router;