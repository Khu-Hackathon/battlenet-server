module.exports = (app, client) => {
    const router = require('express').Router();
    const bodyParser = require('body-parser');
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}));

    router.post('/createroom', (req, res) => {
        const query = `INSERT INTO room (id, name, num_problem, time, is_password, password, num_person, master) 
        VALUES (nextval('seq_room'),
            '${req.body["name"]}',
            '${req.body["num_problem"]}',
            '${req.body["time"]}',
            '${req.body["is_password"]}',
            '${req.body["password"]}',
            '${req.body["num_person"]}',
            '${req.body["master"]}')`;
        client.query(query, 
            (error, result) => {
                if(result) {
                    res.json({"result": 1});
                }

                if(error) {
                    console.log(error);
                    res.json({"result": 0});
                }
            }
        );
    });

    router.get('/getroom', (req, res) => {
        client.query('select * from room', (error, result) => {
            if(result) {
                res.json(result["rows"]);
            }
        })
    })

    return router;
}