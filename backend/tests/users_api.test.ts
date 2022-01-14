import 'jest';
import request from 'supertest';
import app from '../app';
import User from '../src/models/user';
import { usersDbCheck } from './helpers/testHelper';

const api = request(app);

describe('users api', () => {
    test('new user is succesfully created', async () => {
        const newUser = {
            name: 'Mr Foo Bar',
            password: 'foobar',
            email: 'foo@bar.fi'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200);

        const checkUsersStatus = await usersDbCheck();
        expect(checkUsersStatus).toHaveLength(2);
    });

    test('password is succesfully changed', async () => {
        const changedPassword = {
            email: 'foo@bar.fi',
            password: 'qwerty'
        };

        await api
            .put('/api/users/reset')
            .send(changedPassword)
            .expect(200)

        await api
            .post('/api/login')
            .send(changedPassword)
            .expect(200);
    });

    afterAll(async () => {
        await User.findOneAndRemove({ name: 'Mr Foo Bar' });
    });
});