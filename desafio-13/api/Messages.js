import fs from 'fs';

class Messages {

    #messages

    constructor(messages){
        this.#messages = [];
        try {
            fs.writeFile(`./storage/messages.txt`,'[]',{flag:'wx'}, err => {
                if(err){
                    console.log('el archivo ya existe.');
                }else{
                    console.log('el archivo se creo correctamente.');
                }
            });
        } catch (error) {
            throw new Error('error de escritura.');
        }
    }

    async getMessages() {
        try {
            const data = await fs.promises.readFile('./storage/messages.txt', 'utf-8');
            const array = JSON.parse(data);

            return array;
        } catch (error) {
            throw new Error('No hay mensajes!')
        }
    }

    async addMessage(message) {
        try {
            const data = await fs.promises.readFile('./storage/messages.txt', 'utf-8');
            const array = JSON.parse(data);
            array.push({
                fyh: new Date().toLocaleString(),
                ...message
            })
            await fs.promises.writeFile('./storage/messages.txt',JSON.stringify(array));
        } catch (error) {
            throw new Error('No se puede guardar el producto, ARCHIVO INEXISTENTE!.')
        }
    }
}

export default Messages;