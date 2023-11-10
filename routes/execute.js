module.exports = (app) => {
    const router = require('express').Router();
    const bodyParser = require("body-parser");
    const fs = require('fs');
    const { spawn } = require('child_process');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    
    router.post('/', async (req, res) => {
        const source = req.body["source"].split(/\r\n|\r\n/).join("\n");
        const input = req.body["input"]
        const file = 'test.c';
        console.log(file);
        fs.writeFile(file, source, 'utf8', (error) => {
            console.log("write end");
        })
        const compile = spawn('gcc', [file]);
        compile.stdout.on('data', data => {
            console.log("stdout: " + data);
        })
        compile.stderr.on('data', data => {
            console.log(String(data));
        });
        compile.on('close', data => {
            if(data == 0) {
                const run = spawn('./a.out', []);

                run.stdin.end(input);
                run.stdout.on('data', output => {
                    console.log('컴파일 완료');
                    const responseData = {'result': 'ok', 'output': output.toString('utf8')};
                    res.json(responseData);
                })
                run.stderr.on('data', output => {
                    console.log(String(output));
                })
                run.on('close', output => {
                    console.log('stdout: ' + output);
                })
            }
        })
    });

    return router;
}