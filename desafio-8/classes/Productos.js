class Productos {
    
    #products 

    constructor(products) {
        this.#products = products || [];
    };

    getProducts(id) {
        if(id) {
            const product = this.#products.filter( product => product.id == id);
            console.log(product.length);
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

    addProduct(product) {
        const newProduct = {id: this.#products.length +1, ...product}
        this.#products.push(newProduct);
        return newProduct;
    };
}

export default Productos;