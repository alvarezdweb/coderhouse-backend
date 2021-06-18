let title = document.querySelector('#title');
let price = document.querySelector('#price');
let thumbnail = document.querySelector('#thumbnail');

let socket = io.connect();
socket.on('data', (data) => {
    render(data);
});

const addProduct = async(e, form) => {
    e.preventDefault();

    await fetch(form.action, 
        {   
            method:'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(Object.fromEntries(new FormData(form)))
        }
    );

    title.value = '';
    price.value = '';
    thumbnail.value = '';
    socket.emit('newProduct','producto cargado!')

}

socket.on('addProduct', data => { render(data) });

const render = (data) => {
    if(!data.error){
        const html = `
    <div class="table-responsive">
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Foto</th>
                    </tr>
                </thead>
                <tbody>
                ${data.map( (e) => {
                    return(`
                    <tr>
                        <td>${e.title}</td>
                        <td>${e.price}</td>
                        <td>
                            <img src="${e.thumbnail}" alt="not found" width="50">
                        </td>
                    </tr>
                    `)
                }).join(" ")}
                </tbody>
            </table>
        </div>
    `

    document.querySelector('#products').innerHTML = html;
    } 
}