import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => {
    res.send('list of entries!')
});

export default router;