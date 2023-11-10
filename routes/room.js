module.exports = (app) => {
    const router = require('express').Router();

    router.get('/findroom', (req, res) => {
        res.json("hello");
    });

    return router;
}