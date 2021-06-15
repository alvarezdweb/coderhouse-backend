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

    updateProduct(product) {
        let updated = false;

        this.#products = this.#products.map( e => {
            if(e.id === product.id){
                updated = true;
                return product;

            }
            return e;
        });
        
        if(updated){
            return product;
        }
        return {error: 'producto no encontrado.'}
    };

    deleteProduct(id) {
        let deletedItem;

        this.#products = this.#products.filter( product => {
            if( product.id != id){
                return product
            }
            deletedItem = product;
        });
        
        if(deletedItem){
            return deletedItem;
        }
        return {error: 'producto no encontrado.'}
    }
}

export default Productos;