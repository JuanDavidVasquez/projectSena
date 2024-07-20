import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectarDB from "./config/db.js";
import usuarioRoute from './routes/usuarioRoute.js';
import proyectoRoute from './routes/proyectoRoute.js'
import tareaRoute from './routes/tareaRoute.js';

const app = express();
app.use(express.json());

dotenv.config();

connectarDB();

const whitelist = [process.env.FRONTEND_URL];

const blacklist = [];

const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error("Error de cors"));
        }
    }
}

app.use(cors(corsOptions));

//Routing

app.use('/api/usuarios', usuarioRoute);
app.use('/api/proyectos', proyectoRoute);
app.use('/api/tareas', tareaRoute);


const PORT = process.env.PORT || 4000;

const servidor = app.listen(4000, () =>{
    console.log(`servidor corriendo en el puerto ${PORT}`)
});


// Socket.io

import { Server } from 'socket.io'

const io = new Server(servidor, {
    pingTimeout: 6000,
    cors: {
        origin: process.env.FRONTEND_URL,
    },
});

io.on('connection', (socket)=>{
      // Definir los eventos de socket io

    socket.on('abrir proyecto', (proyecto) =>{
        socket.join(proyecto);        
    });

    socket.on('nueva tarea', (tarea)=>{
        const  proyecto  = tarea.proyecto;
        socket.to(proyecto).emit('tarea agregada', tarea);
    });
    
  /*   socket.on('nueva tarea', (tarea) => {
        const proyecto = tarea.proyecto;
        // Emitir el evento 'tarea agregada' a todos los sockets en la sala del proyecto
        io.to(proyecto).emit('tarea agregada', tarea);
    }); */

    socket.on('eliminar tarea', tarea =>{
        const  proyecto  = tarea.proyecto;
        socket.to(proyecto).emit('tarea eliminada', tarea);
    });

    socket.on("actualizar tarea", (tarea) =>{
        const proyecto = tarea.proyecto._id;
        socket.to(proyecto).emit("tarea actualizada", tarea);
    });

    socket.on('cambiar estado', (tarea)=>{
        const proyecto = tarea.proyecto._id;
        socket.to(proyecto).emit("nuevo estado", tarea); 
    })

});