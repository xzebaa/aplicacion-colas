var socket = io();


var searchParams = new URLSearchParams(window.location.search);
if ( !searchParams.has('escritorio') ) {
   // window.location = '/index.html';
    throw new Error('el escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

$('h1').text('Escritorio '+ escritorio)


$('button').on('click', function(){
    socket.emit('atenderTicket', {escritorio}, function(error, data){

        if( error ) return alert("ups tenemos un ploblema!");

        if ( data === 'no hay tickets') return alert("no hay mas ticket para atender!");

        $('small').text(data.numero);
    
    })
})
