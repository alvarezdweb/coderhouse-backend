
socket.on('messages', async function(data) { 
  const schemaAuthor = new normalizr.schema.Entity('author',{},{idAttribute: 'authorEmail'});

  const schemaMensaje = new normalizr.schema.Entity('post', {
      author: schemaAuthor
  },{idAttribute: '_id'});

  const schemaMensajes = new normalizr.schema.Entity('posts', {
  mensajes: [schemaMensaje]
  },{idAttribute: 'id'});

  const msgsDenormalize = normalizr.denormalize(data.result, schemaMensajes, data.entities);

  console.log(msgsDenormalize);
  chatRender(msgsDenormalize);
});

function chatRender(data) { 
    var html = data.mensajes.map(function(elem, index){ 
      return(`
            <div>
                <b style="color:blue;">${elem.author.authorEmail}</b> 
                [<span style="color:brown;">${elem.author.fyh}</span>] : 
                <i style="color:green;">${elem.text}</i>
            </div>
        `) 
    }).join(" "); 
    document.getElementById('messages').innerHTML = html; 
}

const emailCentroMensajes = document.getElementById('email')
const nameCentroMensajes = document.getElementById('name')
const surnameCentroMensajes = document.getElementById('surname')
const ageCentroMensajes = document.getElementById('age')
const textoCentroMensajes = document.getElementById('texto')
const botonCentroMensajes = document.getElementById('enviar')

function addMessage(e) { 
    var mensaje = { 
      author: {
        authorEmail: emailCentroMensajes.value,
        authorName: nameCentroMensajes.value,
        authorSurname: surnameCentroMensajes.value,
        authorAge: ageCentroMensajes.value,
        fyh: new Date()
      },
      text: textoCentroMensajes.value
    }; 
    
    socket.emit('new-message', mensaje); 

    textoCentroMensajes.value = ''
    textoCentroMensajes.focus()

    botonCentroMensajes.disabled = true

    return false;
}

emailCentroMensajes.addEventListener('input', () => {
    let hayEmail = emailCentroMensajes.value.length
    let hayTexto = textoCentroMensajes.value.length
    textoCentroMensajes.disabled = !hayEmail
    botonCentroMensajes.disabled = !hayEmail || !hayTexto
})

textoCentroMensajes.addEventListener('input', () => {
    let hayTexto = textoCentroMensajes.value.length
    botonCentroMensajes.disabled = !hayTexto
})