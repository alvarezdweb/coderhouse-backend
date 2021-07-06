import Producto from "../models/producto.js";
const producto = new Producto();

class Productos {
    
    #products 

    constructor(products) {
        this.#products = products || [];
    };

    async getProducts(id) {
        this.#products = await producto.getProducts();

        if(id) {
            const product = await producto.getProducts(id);
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
        return await producto.addProduct(product);
    };

    async updateProduct(product) {

        const res = await producto.updateProduct(product);
        
        if(res){
            return res;
        }
        return {error: 'producto no encontrado.'}
    };

    async deleteProduct(id) {

        let deletedItem =  await producto.deleteProduct(id);
        console.log(deletedItem)
        
        if(deletedItem){
            return deletedItem;
        }
        return {error: 'producto no encontrado.'}
    }
}

export default Productos;