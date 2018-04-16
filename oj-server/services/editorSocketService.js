var redisClient = require('../entity/redisClient');
const TIMEOUT_IN_SECONDS = 3600;

module.exports = function (io) {
    var collaborations = {};
    var socketIdToSessionId = {};

    var sessionPath = '/temp_sessions/';

    io.on('connection', (socket) => {

        let sessionId = socket.handshake.query['sessionId'];
        socketIdToSessionId[socket.id] = sessionId;

        if (sessionId in collaborations) {
            collaborations[sessionId]['participants'].push(socket.id);

            let participants = collaborations[sessionId]['participants'];
            for (let i = 0; i < participants.length; i++) {
                io.to(participants[i]).emit("show", participants);
            }
        } else {
            redisClient.get(sessionPath + "/" + sessionId, data => {
                if (data) {
                    console.log("session terminated previously, pulling back from Redis");
                    collaborations[sessionId] = {
                        'cachedInstructions': JSON.parse(data),
                        'participants': []
                    };
                } else {
                    console.log("creating new session");
                    collaborations[sessionId] = {
                        'cachedInstructions': [],
                        'participants': []
                    };
                }

                collaborations[sessionId]['participants'].push(socket.id);
                io.to(socket.id).emit("show", socket.id);
            })
        }


        socket.on('change', delta => {
            let sessionId = socketIdToSessionId[socket.id];
            console.log("change " + sessionId + " " + delta);

            if (sessionId in collaborations) {
                collaborations[sessionId]['cachedInstructions'].push(["change", delta, Date.now()]);

                let participants = collaborations[sessionId]['participants'];

                for (let i = 0; i < participants.length; i++) {
                    if (socket.id != participants[i]) {
                        io.to(participants[i]).emit("change", delta);
                    }
                }
            } else {
                console.log("Could not find socket id in collaborations");
            }
        });

        socket.on('restore', () => {
            let sessionId = socketIdToSessionId[socket.id];
            console.log('restore buffer for session: ' + sessionId + ', socket: ' + socket.id);

            if (sessionId in collaborations) {
                let instructions = collaborations[sessionId]['cachedInstructions'];
                for (let i = 0; i < instructions.length; i++) {
                    socket.emit(instructions[i][0], instructions[i][1]);
                }

            } else {
                console.log('warning: could not find any collaboration for this session');
            }
        });

        socket.on('disconnect', () => {
            let sessionId = socketIdToSessionId[socket.id];
            console.log('socket: ' + socket.id + ' disconnected from session ' + sessionId);

            let foundAndRemove = false;
            if (sessionId in collaborations) {
                let participants = collaborations[sessionId]['participants'];
                let index = participants.indexOf(socket.id);
                if (index >= 0) {
                    participants.splice(index, 1);
                    foundAndRemove = true;

                    if (participants.length == 0) {
                        console.log('last participant in collaboration, committing to redis, remove from memory');

                        let key = sessionPath + "/" + sessionId;
                        let value = JSON.stringify(collaborations[sessionId]['cachedInstructions']);

                        redisClient.set(key, value, redisClient.redisPrint);
                        redisClient.expire(key, TIMEOUT_IN_SECONDS);

                        delete collaborations[sessionId];
                    }
                }

                for (let i = 0; i < participants.length; i++) {
                    io.to(participants[i]).emit("show", participants);
                }
            }

            if (!foundAndRemove) {
                console.log("warning: could not tie socket id to any collaboration");
            }

            console.log(collaborations);
        });
    });
}