import mongoose from 'mongoose';

const schema = mongoose.Schema({
    author:{type: String, required: true},
    text:{type: String, required: true},
    fyh:{type: Date, required:true}
});

export const mensajes = mongoose.model('mensajes', schema);

