import express from 'express';
import {router, viewRouter} from './routes/productos.js';
import handlebars from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});

app.use('/api/', router);
app.use(viewRouter)
app.use(express.static('public'));

app.engine("hbs", handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
}))

app.set("view engine", "hbs")
app.set("views", "./views")

const server = app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en http://localhost:${PORT}`);
});

server.on('error', error => {
    console.log('Error:', error);
});

app.get('/', (req, res) => {
    res.sendFile('index');
});