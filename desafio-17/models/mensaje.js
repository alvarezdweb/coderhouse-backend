import knex from "knex";
import { sqlite3 } from '../config/database.js'

const myKnex = knex(sqlite3);

class Mensaje {
    constructor(){
        myKnex.schema.hasTable('mensajes').then( exists => {
            if (!exists) {
              return myKnex.schema.createTable('mensajes', table => {
                table.increments('id');
                table.string('author');
                table.string('text');
                table.timestamp('fyh', { useTz: true }).notNullable().defaultTo(myKnex.fn.now());
              });
            }else { console.log('existe la tabla mensajes.') }
        });
    }

    async getMessages() {
        return await myKnex.from('mensajes').select();
    }

    async addMessage(message) {
        await myKnex('mensajes').insert(message);
    }
}

export default Mensaje;