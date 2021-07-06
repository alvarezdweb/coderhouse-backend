import knex from "knex";
import { mysql } from '../config/database.js'

const myKnex = knex(mysql);

class Producto {
    constructor(){
        myKnex.schema.hasTable('productos').then( exists => {
            if (!exists) {
              return myKnex.schema.createTable('productos', table => {
                table.increments('id').primary();
                table.string('title');
                table.float('price');
                table.string('thumbnail');
              });
            }else { console.log('existe la tabla productos.') }
          });

    }

    async getProducts(id) {
        try {
            if(id) {
                return await myKnex.from('productos').where('id','=',id);
            }
            return await myKnex.from('productos').select();
        } catch (err) {
            throw err;
        }

    }

    async addProduct(product) {
        try {
            const res = await myKnex('productos').insert(product);
            return this.getProducts(res);
        } catch (err) {
            throw err;
        }
    }

    async deleteProduct(id) {   
        let itemDeleted = await this.getProducts(id);
        const res = await myKnex.from('productos').where('id','=', id).del();
        return itemDeleted[0];
    }

    async updateProduct(product){
        const { id, title, price, thumbnail } = product;

        const res = await myKnex.from('productos').where('id', id)
            .update( {title: title, price: price, thumbnail: thumbnail});
        
        const productUpdated = await this.getProducts(id);
        return productUpdated[0];
    }
}

export default Producto;