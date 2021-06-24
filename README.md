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

## Desafio-9
~~~
Se suman a las rutas del desafío-8:

PUT
/api/productos/actualizar/:id
- Devuelve el producto que fue actualizado.
- Si producto.ID no existe devolverá {error : 'producto no encontrado'}

DELETE
/api/productos/borrar/:id
- Devuelve el producto que fue borrado.
- Si producto.ID no existe devolverá {error : 'producto no encontrado'}

Se utilizo el middleware express.static para compartir public/index.html. Este contiene
un formulario ACTION="POST".
~~~

## Desafio-10
~~~
Se suma a las rutas del desafío-9:

GET
productos/vista/
- Devuelve array de productos en una plantilla de handlebars con style de bootstrap.
- Si no hay productos en la lista devolverá {error : 'no hay productos cargados'}
~~~

## Desafio-11
~~~
desafio-11-ejs: 
    Se reemplazó el motor de plantillas handlebars por ejs.
desafio-11-pug: 
    Se reemplazó el motor de plantillas handlebars por pug.

Habiendo experimentado con estos tres motores de plantillas preferiría usar para mi proyecto
Handlebars. Handlebars conserva la estructura HTML y nos permite incluir lógica con "mustache
syntax", desde mi punto de vista se puede obtener un código más ordenado y fácil de mantener.
~~~

## Desafio-12
~~~

~~~

## Desafio-13
~~~

~~~

## Desafio-14
~~~
npm run ServerES6toJS5
transpile ./server.es6.js to ./server.js

npm run ServerTStoJS5
transpile ./server.ts to ./dist/server.js
~~~
