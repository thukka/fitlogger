import 'jest';
import request from 'supertest';
import app from '../app';
import Entry from '../src/models/entry';
import { newEntryObject, testUserObject, entryDbCheck } from './helpers/testHelper';
import { UnknownEntry } from '../src/types';

const api = request(app);

describe('entry api', () => {
    beforeEach(async () => {
        await Entry.deleteMany({});
    });
    
    describe('deleting an entry', () => {
        test('entry succesfully deleted', async () => {
            const testUser = await api.post('/api/login').send(testUserObject);

            await api
                .post('/api/entry/new')
                .send(newEntryObject)
                .set({ Authorization: `bearer ${testUser.body.token}` })
                .expect(200)
                .expect('Content-Type', /application\/json/);

            const entriesAfterPost = await entryDbCheck(testUser.body.username);
            expect(entriesAfterPost[0].date).toContain('9999-11-17');
            await api
                .delete(`/api/entry/${entriesAfterPost[0]._id}`)
                .set({ Authorization: `bearer ${testUser.body.token}` })
                .expect(204)

            const entriesAfterDelete = await entryDbCheck(testUser.body.username);
            expect(entriesAfterDelete).toHaveLength(0);
        });
    });

    describe('adding an entry', () => {
        test('new entry succesfully added', async () => {
            const newEntry = newEntryObject;
            const testUser = testUserObject;
            const getTestUser = await api.post('/api/login').send(testUser);

            await api
                .post('/api/entry/new')
                .send(newEntry)
                .set({ Authorization: `bearer ${getTestUser.body.token}` })
                .expect(200)
                .expect('Content-Type', /application\/json/);

            const entriesAtEnd = await entryDbCheck(testUser.email);
            expect(entriesAtEnd[0].date).toContain('9999-11-17');
        });

        test('error 400 if a field is missing', async () => {
            const newEntry: UnknownEntry = newEntryObject;
            delete newEntry.difficulty;
            const testUser = testUserObject;
            const getTestUser = await api.post('/api/login').send(testUser);

            await api
                .post('/api/entry/new')
                .send(newEntry)
                .set({ Authorization: `bearer ${getTestUser.body.token}` })
                .expect(400)
        });

        test('error 401 if token is incorrect', async () => {
            const newEntry = newEntryObject;
            await api
                .post('/api/entry/new')
                .send(newEntry)
                .set({ Authorization: 'not a valid token' })
                .expect(401)

            const entriesAtEnd = await entryDbCheck('testi');
            expect(entriesAtEnd).toHaveLength(0);
        });
    });
});