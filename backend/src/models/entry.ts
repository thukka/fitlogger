import { Entry, MongoReturnedObjectEntry } from '../types';
import mongoose, { Schema } from 'mongoose';

const entrySchema = new Schema<Entry>({
    user: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    difficulty: Number
});

entrySchema.set('toJSON', {
    transform: (_document, returnedObject: MongoReturnedObjectEntry) => {
        returnedObject.id = returnedObject._id?.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Entry = mongoose.model<Entry>('Entry', entrySchema);

export default Entry;