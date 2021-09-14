import mongoose from 'mongoose';

const schema = mongoose.Schema({
    // author:{type: String, required: true},
    // authorName:{type: String},
    // authorSurname:{type: String},
    // authorAge:{type: String},
    // text:{type: String, required: true},
    // fyh:{type: Date, required:true}
    author: {
        authorEmail:{type: String, required: true},
        authorName:{type: String},
        authorSurname:{type: String},
        authorAge:{type: String},
        fyh:{type: Date, required:true}
    },
    text: {type: String, required: true}
});

export const mensajes = mongoose.model('mensajes', schema);

