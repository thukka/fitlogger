import Entry from '../../src/models/entry';
import User from '../../src/models/user';
import { UnknownEntry } from '../../src/types';


export const testUserObject = {
    email: 'testi',
    password: process.env.TEST_USER_PW
};

export const newTestUser = {
    ...testUserObject,
    name: 'teppo testaaja',
};

export const newEntryObject: UnknownEntry = {
    user: 'testi',
    date: '9999-11-17',
    duration: '1',
    distance: '1',
    difficulty: '0'
};

export const entryDbCheck = async (user: any) => {
    const listOfEntries = await Entry.find({ user: user });
    return listOfEntries;
};

export const usersDbCheck = async () => {
    const allUsers = await User.find({});
    return allUsers.map(u => u.toJSON());
};