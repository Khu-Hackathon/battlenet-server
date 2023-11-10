module.exports = (app, client) => {
    const router = require('express').Router();
    const bodyParser = require("body-parser");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    
    router.post('/problem', async (req, res) => {
        const query = `select * from problems where id=${req.body["number"]}`;
        client.query(query, 
            (error, result) => {
                if(result) {
                    res.json(result["rows"]);
                }

                if(error) {
                    console.log(error);
                    res.json({"result": 0});
                }
            }
        );
    });
    
    router.post('/example', async (req, res) => {
        const query = `select * from ex_problems where problem_no=${req.body["number"]}`;
        client.query(query, 
            (error, result) => {
                if(result) {
                    res.json(result["rows"]);
                }

                if(error) {
                    console.log(error);
                    res.json({"result": 0});
                }
            }
        );
    });

    return router;
}