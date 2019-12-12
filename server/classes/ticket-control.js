const fs = require('fs');

class Ticket{

    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor (){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];
        
        let data = require('../data/data.json');

        if( data.hoy === this.hoy ){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;
        }else {
            this.reiniciarConteo();
        }
    }

    siguiente(){
        this.ultimo++;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return this.ultimo;
    }

    ultimoTicket(){
        return this.ultimo;
    }

    getUltimosCuatro(){
        return this.ultimosCuatro;
    }

    atenderTicket(escritorio){
        if(this.tickets.length === 0) return 'no hay tickets';

        let numeroTicket= this.tickets[0].numero;
        this.tickets.shift(); // elimina la primera psoicion del arreglo 
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimosCuatro.unshift(atenderTicket);

        if ( this.ultimosCuatro.length === 5) this.ultimosCuatro.splice(-1, 1 ); // borra el ultimo elemento
        console.log('ultimos cuatro');
        this.grabarArchivo();
        console.log('ultimos cuatro pospos ');

        return atenderTicket;
    }

    reiniciarConteo(){
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];
        this.grabarArchivo();
        console.log('Se ha inicializado el sistema');
    }

    grabarArchivo(){
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        }

        const jsonDataString = JSON.stringify(jsonData);
        console.log(jsonDataString);

        try {
            fs.writeFileSync('./server/data/data.json', jsonDataString);
        } catch (error) {
            console.log(error);
        }
      
    }
}

module.exports = { TicketControl };