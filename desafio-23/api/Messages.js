
import { normalize, schema, denormalize } from 'normalizr';
import {mensajes} from '../models/mensajes.js';
 
class Messages {
    constructor  (){}

    async getMessages() {
        try {
            return this.normalizeMessages(await mensajes.find());
        } catch (err) {
            throw err;
        }
    }

    async addMessage(message) {
        try {
            console.log(message)
            return mensajes.create(message)
        } catch (err) {
            throw err
        }
    }

    normalizeMessages(mensajes){
        
        const schemaAuthor = new schema.Entity('author',{},{idAttribute: 'authorEmail'});

        const schemaMensaje = new schema.Entity('post', {
            author: schemaAuthor
        },{idAttribute: '_id'});

        const schemaMensajes = new schema.Entity('posts', {
        mensajes: [schemaMensaje]
        },{idAttribute: 'id'});

        let mensajesConId = { 
            id: 'mensajes', 
            mensajes : mensajes.map( mensaje => ( {...mensaje._doc, _id: JSON.stringify(mensaje._id)}))
        }

        let mensajesConIdN = normalize(mensajesConId, schemaMensajes);

        return mensajesConIdN;
    }
}

export default Messages;