require('dotenv').config();
import express from 'express';
import entryRouter from './src/routes/entry';
import usersRouter from './src/routes/users';
import loginRouter from './src/routes/login';
import { connect } from 'mongoose';

import morgan from 'morgan';

const mongoUrl = process.env.MONGO_URI;
const app = express();

const run = async(): Promise<void> => {
    await connect(mongoUrl as string);
};

run().catch(err => console.log(err));

app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/entry', entryRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});