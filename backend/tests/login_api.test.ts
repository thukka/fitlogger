import 'jest';
import request from 'supertest';
import app from '../app';
import { testUserObject } from './helpers/testHelper';

const api = request(app);

describe('login api', () => {
    test('user can log in', async () => {
        await api
            .post('/api/login')
            .send(testUserObject)
            .expect(200);
    });

    test('401 when wrong credentials are used', async () => {
        const incorrectCredentials = { ...testUserObject, password: 'incorrectPW' };
        await api
            .post('/api/login')
            .send(incorrectCredentials)
            .expect(401);
    });
});