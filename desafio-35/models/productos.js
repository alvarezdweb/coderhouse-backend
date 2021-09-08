import mongoose from 'mongoose';

const schema = mongoose.Schema({
    title:{type: String, required: true},
    price:{type: Number, required: true},
    thumbnail:{type: String, required:true}
});

export const productos = mongoose.model('productos', schema);
