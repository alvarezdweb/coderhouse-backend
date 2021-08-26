import mongoose from 'mongoose';

const schema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String
});

export const users = mongoose.model('users', schema);
