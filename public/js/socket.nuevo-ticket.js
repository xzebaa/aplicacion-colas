let socket = io();

let label = $('#lblNuevoTicket');

socket.on('connect', function(){
    console.log('conectado');
});

socket.on('disconnect', function(){
    console.log('desconectado');
})

socket.on('estadoActual', function(data){
    console.log('data de estado actual', data);
    label.text('numero ' + data.actual);

})

$('button').on('click', function(){
    socket.emit('SiguienteTicket', null, function(siguienteTicket){
        console.log('entro', siguienteTicket);
        label.text('numero ' + siguienteTicket);
    });
})