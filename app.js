// src/app.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const db = require('./db');
const routes = require('./routes');
const sockets = require('./sockets/socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve static files from 'public' directory
app.use(express.json());
app.use('/api', routes);

sockets(io, db);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
