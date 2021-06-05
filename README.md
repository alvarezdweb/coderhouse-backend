# coderhouse-backend

## Desafio-7
~~~
/items
- listado de items leidos de productos.txt

/item-random
- item random filtrado por ID

/visitas
- cantidad de visitas que se realizar a cada ruta (items, item)
~~~

## Desafio-8
~~~
GET
/api/productos/listar
- Devuelve array de productos
- Si no hay productos en la lista devolverá {error : 'no hay productos cargados'}

GET
/api/productos/listar/:id
- Devuelve el producto de la lista con el REQUEST ID
- Si producto.ID no existe devolverá {error : 'producto no encontrado'}

POST
/api/productos/guardar/
- Guardar el producto en el array.
- Devuelve el producto incorporado. 
~~~

