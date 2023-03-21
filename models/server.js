const express = require('express');
const cors = require('cors');
const { socketController } = require('../socket/controller');




class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);


        this.paths = {}
        
        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        //Sockets 
        this.socket();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );


    }

    routes() {
        
    }

    socket() {
        this.io.on("connection", socketController);
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;



