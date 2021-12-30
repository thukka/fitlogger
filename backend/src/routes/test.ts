import express from 'express';
import User from '../models/user';
import Entry from '../models/entry';
const router = express.Router();

router.post('/reset', async (_req, res) => {
    await User.deleteMany({});
    await Entry.deleteMany({});
    res.status(204).end();
});

export default router;