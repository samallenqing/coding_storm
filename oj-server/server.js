const express = require('express');
const app = express();
const restRouter = require('./routes/rest');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
var socketIO = require('socket.io');
var io = socketIO();
var editorSocketService = require('./services/editorSocketService')(io);
const server = http.createServer(app);
io.attach(server);
server.listen(3000);
server.on('listening', onListening);

function onListening() {
    console.log('App listening on port 3000');
}

app.use('/api/v1', restRouter);
app.use(express.static(path.join(__dirname, "../public")));
app.use((req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, "../public")})
});



mongoose.connect('mongodb://sam:123@ds235239.mlab.com:35239/test-db');