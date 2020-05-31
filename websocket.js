const WebSocket = require('ws');

const wsServer = new WebSocket.Server({port: 3001});
clients = {};
loggedClients = {};
nextClientID = 0;
let WSF = {};

exports.reloadUser = id => {
    id = id.toString();
    if (id in loggedClients) {
        loggedClients[id].result("reload", {});
    }
}

exports.getClients = () => {
    return loggedClients;
}

WSF.login = (client, params) => {
    if (client.userId != null) {
        client.result("error", "ALREADY LOGGED IN!");
        return;
    }
    client.userId = params['userId'];
    loggedClients[client.userId] = client;

    if (client.userId == 0) {
        client.result("clients", Object.keys(loggedClients));
    }else{
        if(0 in loggedClients){
            loggedClients[0].result("clients", Object.keys(loggedClients));
        }
    }

    client.result("login", {
        "socketId": client.id
    });
}


WSF.sendStatus = (client, params) => {
    let userId = params['userId'];
    let message = params['status'];

    if (userId in loggedClients) {
        loggedClients[userId].result("status", {
            "from": client.userId,
            "status": message
        });
    } else {
        client.result("error", "TARGET USER NOT LOGGED IN!");
        client.terminate();
    }
}


WSF.checkStatus = (client, params) => {
    let userId = params['userId'];

    if (userId in loggedClients) {
        client.result("status", {
            "from": userId,
            "status": "online"
        });
    } else {
        client.result("status", {
            "from": userId,
            "status": "offline"
        });
    }
}


function onDisconnected(socket) {
    console.log(socket.id + ' disconnected !');
    delete clients[socket.id];

    if (socket.userId != null) {
        delete loggedClients[socket.userId];
    }
    if (0 in loggedClients) {
        loggedClients[0].result("clients", Object.keys(loggedClients));
    }
}


wsServer.on('connection', function connection(wsClient) {

    nextClientID++;
    console.log(nextClientID + ' connected !');
    wsClient.id = nextClientID;
    wsClient.userId = null;
    clients[wsClient.id] = wsClient;

    wsClient.isAlive = true;
    wsClient.on('pong', heartbeat);

    wsClient.result = function (action, params) {
        this.send(JSON.stringify(
            {"action": action, "params": params}
        ));
    }

    wsClient.on('message', function incoming(message) {

        let json = JSON.parse(message);
        if (!('action' in json && 'params' in json)) {
            wsClient.result("error", "MISSING PARAMS!");
            wsClient.terminate();
            return;
        }

        if (wsClient.userId == null && json["action"] !== 'login') {
            wsClient.result("error", "NOT AUTHORIZED!");
            wsClient.terminate();
            return;
        }

        if (json['action'] in WSF) {
            WSF[json['action']](wsClient, json['params']);
        } else {
            wsClient.result("error", "ACTION " + json['action'] + " NOT FOUND!");
            wsClient.terminate();
        }

    });


    wsClient.on('error', function incoming(message) {
        console.log('Websocket error: %s', message);
        wsClient.terminate();
    });

    wsClient.on('close', function incoming(code, reason) {
        onDisconnected(wsClient);
    });


});


function noop() {
}

function heartbeat() {
    this.isAlive = true;
}

const interval = setInterval(function ping() {
    wsServer.clients.forEach(function each(wsClient) {
        if (wsClient.isAlive === false) return wsClient.terminate();
        wsClient.isAlive = false;
        wsClient.ping(noop);
    });
}, 30000);

wsServer.on('close', function close() {
    clearInterval(interval);
});