var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblEscritorios = [
    lblEscritorio1,
    lblEscritorio2,
    lblEscritorio3,
    lblEscritorio4,
];
var lblTickets = [
    lblTicket1,
    lblTicket2,
    lblTicket3,
    lblTicket4,
];

socket.on('estadoActual', function(data){
    actualizaHTML(data.ultimosCuatro);
});

socket.on('estadoActualPush', function(data){
    console.log(data);
    var audio = new Audio('audio/new-ticket.mp3');
    actualizaHTML(data.ultimosCuatro);
    audio.play();
});

function actualizaHTML (tickets) {
    for (var posision = 0; posision < tickets.length; posision++) {
        lblTickets[posision].text('Numero ' + tickets[posision].numero);
        lblEscritorios[posision].text('Modulo ' + tickets[posision].escritorio);
        
    }
}