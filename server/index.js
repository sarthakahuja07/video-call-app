// create express server and add socket.io support with cors enabled and listen to port 5000    
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const port = process.env.PORT || 5000
app.use(cors());

// setting up socket.io with cors
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.get('/', (req, res) => {
    res.send("Server is running");
})


// listen to connection event on socket.io
io.on('connection', (socket) => {
    console.log("curr user is connected");
    // "currentUser" give the id of the current user connected to the socket
    socket.emit('me', socket.id);

    // tells when a user gets disconnected by using the ''disconnect'' event
    socket.on('disconnect', () => {
        socket.broadcast.emit("callEnded");
    });

    // Calls a user using the "callUser" event by passing in data parameter that gives the signal, who the call is from and name of the person calling as an object

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });
    // accepts a call from another user using the "callUser" event AND GIVES THE SIGNAL DATA TO THE CALLER.

    socket.on('acceptCall', (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })
})

server.listen(port, () => {
    console.log(` Server Running a port ${port}`)
})
