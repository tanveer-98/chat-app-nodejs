const express = require('express')
const cors = require('cors');
const app = express();
const path = require('path');
const http = require('http')
const socketio = require('socket.io');
require('dotenv').config();

const publicDirectory = path.resolve(__dirname,'../public');
const PORT = process.env.PORT;
const server = http.createServer(app);
 const io = socketio(server);
// middlewares 
app.use(cors());
app.use(express.json());
app.use(express.static(publicDirectory))


//Goal 1: send a wlcome message to new users
// 1. Have server emit 'message' when new client connects 
// - send welcome as the event data 
// 2 have client listen for 'message"event and print to console 
// 3 test your wrk
let count = 0 ; 
// Goal 2: allow clients to send messages  to one another
// 1. create a form with an input and button 
// 2. setup event listener for form submission
// - Emit "sendMessage" with input string as message data 
// 3. have server listen for 'sendMessage"
// 4. Test
io.on('connection',(socket)=>{
    // console.log('New web socket connection')
    // socket.emit('countUpdated',count);
    // socket.on('increment',()=>{
    //     count++;
    //     socket.emit('countUpdated',count);
    // })
    console.log('New websocket connectin');

    socket.broadcast.emit('message','A new user has joined');
    socket.emit('success_connection','Welcome to the Chat Application')
    socket.on('sendMessage',(message)=>{
        io.emit('message',message);
    })

    socket.on('disconnect',()=>{
        io.emit('message','A user has left the chat');
    })
})






server.listen(PORT,()=>{
    console.log('listening on port: ' + PORT);
})

module.exports = {
    io
}