const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.emit('estadoActual', { 
        actual: ticketControl.ultimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatro()
    })

    client.on('SiguienteTicket', (data, callback) => {
        const numeroSiguiente = ticketControl.siguiente();
        console.log('siguiente numero = ', numeroSiguiente);
        callback(numeroSiguiente);
    });

    client.on('atenderTicket', (data, callback) => {

        if( !data.escritorio ) return callback({message: 'es nesesario el escruitorio'}, null);

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        
        console.log('SiguienteTicket');
        client.broadcast.emit('estadoActualPush',{ 
            actual: ticketControl.ultimoTicket(),
            ultimosCuatro: ticketControl.getUltimosCuatro()
        })

        return callback(null, atenderTicket);
    })

});