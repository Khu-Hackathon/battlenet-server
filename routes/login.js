module.exports = (app, client) => {
    const router = require('express').Router();
    const User = require("../models/User");
    const bodyParser = require("body-parser");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    
    router.post('/login', async (req, res) => {       
        const user = new User(req.body, client);
        const response = await user.login();
        res.json(response);
    });

    return router;
}