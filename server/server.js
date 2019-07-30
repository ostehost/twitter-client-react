const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const TwitterStream = require('twitter-stream-api');
const Writable = require('stream').Writable;
const url = require('url');

const app = express();

const server = http.createServer(app);

require('dotenv').config();

var keys = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    token: process.env.TOKEN,
    token_secret: process.env.TOKEN_SECRET
};

var Twitter;

const wss = new WebSocket.Server({ server });

function noop() { }

function heartbeat() {
    this.isAlive = true;
    clearTimeout(this.pingTimeout);

    // Use `WebSocket#terminate()`, which immediately destroys the connection,
    // instead of `WebSocket#close()`, which waits for the close timer.
    // Delay should be equal to the interval at which your server
    // sends out pings plus a conservative assumption of the latency.
    this.pingTimeout = setTimeout(() => {
        if (Twitter) {
            Twitter.close();
            Twitter = false;
        }
        this.terminate();
    }, 3000 + 1000);
}

wss.on('connection', (ws, req) => {
    console.log('connect');

    if (Twitter) {
        Twitter.close();
        Twitter = false;
    }

    Twitter = new TwitterStream(keys);

    ws.isAlive = true;
    ws.on('pong', heartbeat);

    var Output = Writable({ objectMode: true });
    Output._write = function (obj, enc, next) {
        // console.log(obj);
        ws.send(JSON.stringify(obj));
        next();
    };

    // Twitter.debug(function (reqObj) {
    //     require('request-debug')(reqObj, function (type, data, req) {
    //         console.log('type', type);
    //     });
    // });

    Twitter.stream('statuses/filter', {
        track: [url.parse(req.url, true).query.track]
    });

    Twitter.on('connection success', function (uri) {
        console.log('connection success', uri);
    });

    Twitter.on('connection aborted', function () {
        console.log('connection aborted');
    });

    Twitter.on('connection error network', function () {
        console.log('connection error network');
    });

    Twitter.on('connection error stall', function () {
        console.log('connection error stall');
    });

    Twitter.on('connection error http', function () {
        console.log('connection error http');
    });

    Twitter.on('connection rate limit', function () {
        console.log('connection rate limit');
    });

    Twitter.on('connection error unknown', function () {
        console.log('connection error unknown');
    });

    Twitter.on('data keep-alive', function () {
        console.log('data keep-alive');
    });

    Twitter.on('data error', function () {
        console.log('data error');
    });

    Twitter.pipe(Output);
});

wss.on('open', heartbeat);
wss.on('ping', heartbeat);
wss.on('close', function clear() {
    clearTimeout(this.pingTimeout);
});

const interval = setInterval(function ping() {

    wss.clients.forEach(function each(ws) {
        console.log('in this', ws.isAlive);
        if (ws.isAlive === false) {
            console.log('termmm');

            return ws.terminate();
        }

        ws.isAlive = false;
        ws.ping(noop);
    });
}, 3000);

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port}`);
});