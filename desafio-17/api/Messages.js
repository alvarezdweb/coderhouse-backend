import Mensaje from '../models/mensaje.js';

const mensaje = new Mensaje();

class Messages {
    constructor(){}

    async getMessages() {
        try {
            return await mensaje.getMessages();
        } catch (err) {
            throw err;
        }
    }

    async addMessage(message) {
        try {
            await mensaje.addMessage(message)
        } catch (err) {
            throw err
        }
    }
}

export default Messages;