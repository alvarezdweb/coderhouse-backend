import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const mysql = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'coderhouse'
    },
    pool: { min: 0, max: 7 }
}

export const sqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: __dirname + '/../storage/messages.sqlite'
    },
    useNullAsDefault: true
}