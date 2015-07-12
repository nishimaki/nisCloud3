// ---------------------------------
// Chatモジュール
// ---------------------------------
module.exports.init = function(socket) {

    var messages = [];
    var sockets = [];

    var async = require('async');

    socket.on('connection', function(socket) {
        // messages.forEach(function (data) {
        //   socket.emit('message', data);
        // });

        sockets.push(socket);

        socket.on('disconnect', function() {
            sockets.splice(sockets.indexOf(socket), 1);
            updateRoster();
        });

        socket.on('message', function(msg) {
            var text = String(msg || '');

            if (!text)
                return;

            socket.get('name', function(err, name) {
                var data = {
                    name: name,
                    text: text,
                    datetime: new Date()
                };

                broadcast('message', data);
                messages.push(data);
            });
        });

        socket.on('identify', function(name) {
            socket.set('name', String(name || 'Anonymous'), function(err) {
                updateRoster();
            });
        });

        socket.on('reconnect', function(msg) {
            updateRoster();
            messages.forEach(function(data) {
                socket.emit('message', data);
            });
        });

    });

    function updateRoster() {
        async.map(
            sockets,
            function(socket, callback) {
                socket.get('name', callback);
            },
            function(err, names) {
                broadcast('roster', names);
            }
        );
    }

    function broadcast(event, data) {
        sockets.forEach(function(socket) {
            socket.emit(event, data);
        });
    }

};