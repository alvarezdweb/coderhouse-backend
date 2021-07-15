
import {mensajes} from '../models/mensajes.js';
 
class Messages {
    constructor  (){}

    async getMessages() {
        try {
            return await mensajes.find();
        } catch (err) {
            throw err;
        }
    }

    async addMessage(message) {
        try {
            const newMessage = {fyh: new Date(), ...message}
            return mensajes.create(newMessage)
        } catch (err) {
            throw err
        }
    }
}

export default Messages;