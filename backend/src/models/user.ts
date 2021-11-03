import { User } from '../types';
import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema<User>({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    passwordHash: String,
    email: {
        type: String,
        unique: true,
        required: true
    }
});

userSchema.plugin(uniqueValidator);
userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
})

const User = mongoose.model<User>('User', userSchema);

export default User;