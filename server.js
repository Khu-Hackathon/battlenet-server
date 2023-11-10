const { Client } = require("pg");

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "codingtest",
    password: "1234",
    port: 5432
})

client.connect();

// 모듈
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('./io')(server);

// 앱 세팅
app.set("views", "../client/pages");
app.set("view engine", "vue");

// 라우팅
const cors = require('cors');
app.use(cors());

const login = require('./routes/login')(app, client);
app.use('/login', login);

const signup = require('./routes/signup')(app, client);
app.use('/signup', signup);

const room = require('./routes/room')(app);
app.use('/room', room);

server.listen(8080, () => {
    console.log(`server on port 8080`);
})
