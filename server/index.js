// create express server and add socket.io support with cors enabled and listen to port 5000    
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const port = process.env.PORT || 5000
app.use(cors());

// setting up socket.io with cors
const io = require('socket.io')(server, {
    origins: '*:*',
    methods: ['GET', 'POST']
});

app.get('/', (req, res) => {
    res.send("Server is running");
})

// listen to connection event on socket.io
io.on('connection', (socket) => {
    console.log("curr user is connected");
    // "currentUser" give the id of the current user connected to the socket
    socket.emit('currentUser', socket.id);

    // tells when a user gets disconnected by using the ''disconnect'' event
    socket.on('disconnect', () => {
        socket.broadcasr.emit('userDisconnected', socket.id);
    });

    // Calls a user using the "callUser" event by passing in data parameter that gives the signal, who the call is from and name of the person calling as an object

    socket.on('callUser', (data) => {
        io.to(data.to).emit('callUser', {
            signal: data.signalData,
            from: data.from,
            to: data.to
        });
    })
    // accepts a call from another user using the "callUser" event AND GIVES THE SIGNAL DATA TO THE CALLER.

    socket.on('acceptCall', (data) => {
        io.to(data.to).emit('acceptCall', data.signal);
    })
})

server.listen(5000, () => {
    console.log(` Server Running a port ${port}`)
})
