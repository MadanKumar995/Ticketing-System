const express = require('express');

const http = require('http');

// const socket = require('socket.io');
// const connection = require('./socket/connection');

const WebSocket = require('ws');

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const ticketsRoutes = require('./routes/ticket');

const messageRoutes = require('./routes/messages');

const agentRoutes = require('./routes/agent');

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// const server = http.createServer(app);
// var server = app.listen(4040, () => {
//     console.log('socket io listening');
// })
// var socketIo = socket(server);

const ports = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/auth', authRoutes);

app.use('/tickets', ticketsRoutes);

app.use('/chats', messageRoutes.messageRoute);

app.use('/agent', agentRoutes);

app.listen(ports, () => console.log(`listening on port ${ports}`));



// wss.on('connection', (ws) => {
//     console.log('WebSocket connection established');

//     ws.on('message', (message) => {
//         // Handle WebSocket messages
//         console.log('Received message:', message);
//         // You can handle the message and broadcast it to other clients if needed
//     });

//     ws.on('close', () => {
//         console.log('WebSocket connection closed');
//     });
// });

// messageRoutes.initSocketIO(io);

// socketIo.on('connection', (socket) => {
//     console.log('new client: ', socket.id);
//     socket.on('change', (changes) => {
//         socketIo.sockets.emit('change', changes);
//     });
//     socket.on('create', (newData) => {
//         socketIo.sockets.emit('create', newData);
//     });
// });

messageRoutes.initWebSocket(wss);

server.listen(8080, () => {
    console.log(`wss Server is listening on port 8080`);
});