import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import entryRouter from './src/routes/entry';
import usersRouter from './src/routes/users';
import loginRouter from './src/routes/login';
import testRouter from './src/routes/testing';
import { connect } from 'mongoose';

import morgan from 'morgan';
const app = express();

const mongoUrl = process.env.NODE_ENV === 'test' ? process.env.MONGO_TEST_URI : process.env.MONGO_URI;

const run = async(): Promise<void> => {
    await connect(mongoUrl as string);
};

run().catch(err => console.log(err));

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('build'));

app.use('/api/entry', entryRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
if (process.env.NODE_ENV === 'test') {
    app.use('/api/testing', testRouter);
}

export default app;