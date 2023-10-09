const express = require("express")
 const { createServer } = require('node:http');
const { Server } = require('socket.io');
const ACTIONS = require("./actions");
const {validate, version} = require("uuid")

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "OPTIONS"]
    }
});

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

io.on('connection', (socket) => {
    socket.on("NEXT" , async () => {
        const sockets = Array.from(io.sockets.sockets).map(socket => socket[0]);


        for (let id of sockets) {
            const findSocket = io.sockets.sockets.get(id)

            if(
                socket.data.description &&
                findSocket.data.description &&
                !findSocket?.data?.partnerID &&
                findSocket.id !== socket.id
            ){
                findSocket.data.partnerID = socket.id
                socket.data.partnerID = findSocket.id
                break;
            }
        }

        if(socket.data?.partnerID){
            const partner = io.sockets.sockets.get(socket.data?.partnerID)


            if(partner)
                partner.emit('REMOTE', socket.data)
        }

        // const partner = io.sockets.sockets.get(socket.data?.partnerID)
    })


    socket.on("REMOTE", ({icecandidate, description}) => {
        socket.data.description = description
        socket.data.icecandidate = icecandidate
        console.log("REMOTE")
    })

    socket.on("LOCALE", ({icecandidate, description}) => {

        if(socket.data?.partnerID){
            const partner = io.sockets.sockets.get(socket.data.partnerID)

            if(partner)
                partner.emit('LOCALE', {icecandidate, description})
        }
        console.log("LOCALE")
    })

    socket.on('disconnect', () => {
        if(socket.data?.partnerID) {
            const partner = io.sockets.sockets.get(socket.data.partnerID)

            if(partner)
                partner.emit('LEAVE')
        }
        if(socket?.data?.partnerID)
            delete socket.data.partnerID

        console.log('user disconnected', socket.id);
    });

    console.log(socket.id)
    socket.broadcast.emit("LIVE_COUNT", io.sockets.sockets.size);
    socket.emit("LIVE_COUNT", io.sockets.sockets.size);
});

server.listen(9000, () => {
    console.log('server running at http://localhost:9000');
});