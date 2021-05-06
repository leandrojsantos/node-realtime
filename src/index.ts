import express from 'express';
import socketio from 'socket.io';
import path from 'path';
import http from 'http';

//cria aplicação express e tira server express, colocando numa const para rodar no mesmo url
const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer);

app.use(express.static(path.join(__dirname, '..', 'public')));

io.on('connection', (socket) =>{
  console.log(`New connection: ${socket.id}`);
  
  socket.on('message', message =>{
    //console.log(`New text: ${message}`);
    socket.emit('received', `Receiveed message ${message}`);
  })
});

httpServer.listen(3333);