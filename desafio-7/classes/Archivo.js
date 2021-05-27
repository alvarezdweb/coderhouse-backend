import fs from 'fs';

class Archivo {

    #fileName;

    constructor(fileName){
        try {
            fs.writeFile(`./storage/${fileName}`,'[]',{flag:'wx'}, err => {
                if(err){
                    console.log('el archivo ya existe.');
                }else{
                    console.log('el archivo se creo correctamente.');
                }
            })
        } catch (err) {
            throw new Error('error de escritura.')
        }
        this.#fileName = `./storage/${fileName}`
    }  

    async leer() {
        try {
            const data = await fs.promises.readFile(this.#fileName, 'utf-8');
            const array =  JSON.parse(data);
            // console.log(array);
            return array;
        } catch (error) {
            throw new Error('El archivo que quiere LEER no existe.')
        }
    }

    async guardar(product) {
        try {
            const data = await fs.promises.readFile(this.#fileName, 'utf-8');
            const array = JSON.parse(data);
            array.push({
                ...product,
                id: array.length + 1
            })
            await fs.promises.writeFile(this.#fileName,JSON.stringify(array));
        } catch (error) {
            throw new Error('No se puede guardar el producto, ARCHIVO INEXISTENTE!.')
        }
    }

    async borrar(){
        try {
            await fs.promises.unlink(this.#fileName);
            console.log('archivo borrado exitosamente.');
        } catch (error) {
            throw new Error('El archivo que quiere BORRAR no existe.')
        }
    }
}

export default Archivo;