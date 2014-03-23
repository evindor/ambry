module.exports = function(io) {
    io.set('authorization', function(data, accept) {
        debugger;
    });

    io.sockets.on('connection', function(socket) {
        console.log(arguments)
        //req.user.updateStars(function(err, user, stars) {
            //socket.emit('user', JSON.stringify(user))
            //socket.emit('stars', JSON.stringify(stars))
        //});
    });
}
