import {productos} from '../models/productos.js';

class Productos {
    
    #products 

    constructor(products) {
        this.#products = products || [];
    };

    async getProducts(id) {
        this.#products = await productos.find();
        if(id) {
            const product = await productos.findById(id);
            if(product.length===0){
                return {error: 'producto no encontrado.'}
            }
            return product;
        }
        if(this.#products.length===0){ 
            return {error: 'no hay productos cargados.'}
        }
        return this.#products;
    };

    async addProduct(product) {
        return await productos.create(product);
    };

    async updateProduct(product) {
        const res = await productos.updateOne({_id: product.id}, {$set: {...product}});
        
        if(res){
            return res;
        }
        return {error: 'producto no encontrado.'}
    };

    async deleteProduct(id) {
        const deletedItem =  await productos.deleteOne({_id: id});
        
        if(deletedItem){
            return deletedItem;
        }
        return {error: 'producto no encontrado.'}
    }
}

export default Productos;