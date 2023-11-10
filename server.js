const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('./io')(server);
const { Client } = require('pg');
const cors = require('cors');
app.use(cors());

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "codingtest",
    password: "1417",
    port: 5432
})

client.connect();

const login = require('./routes/login')(app, client);
app.use('/login', login);

const room = require('./routes/room')(app, client);
app.use('/room', room);

const signup = require('./routes/signup')(app, client);
app.use('/signup', signup);

const problem = require('./routes/problem')(app, client);
app.use('/problem', problem);

const execute = require('./routes/execute')(app);
app.use('/execute', execute);

server.listen(8080, () => {
    console.log(`server on port 8080`);
})

