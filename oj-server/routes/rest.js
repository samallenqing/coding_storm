const express = require('express');
const router = express.Router();

const problemService = require('../services/problemService');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const nodeRestClient = require('node-rest-client').Client;
const restClient = new nodeRestClient();
EXECUTOR_SERVER_URL = 'http://localhost:5000/build_and_run';
// EXECUTOR_SERVER_URL = 'http://192.168.1.105/build_and_run';

restClient.registerMethod('build_and_run', EXECUTOR_SERVER_URL, 'POST');

router.get('/problems', function (req, res) {
    problemService.getProblems()
        .then(problems => res.json(problems));
});

router.get('/problems/:id', (req, res) => {
    const id = req.params.id;
    problemService.getProblemByID(+id)
        .then(problem => res.json(problem))
});

router.post('/problems', jsonParser, (req, res) => {
    problemService.addProblem(req.body)
        .then(
            (problem) => {
                res.json(problem);
            },
            (error) => {
                res.status(400).send('Problem name exists');
            }
        )
});

router.delete('/problems/:id', (req, res) => {
    const id = req.params.id;
    problemService.deleteProblemByID(id)
        .then(problem => res.send({problem}));
});

router.put('/problems', jsonParser, (req, res) => {
    problemService.updateProblemByID(req.body)
        .then(
            (updateProblem) => {
                res.json(updateProblem);
            },
            (error) => {
                res.status(400).send('Cannot update problems');
            }
        )
});

router.post('/build_and_run', jsonParser, (req, res) => {
    const userCode = req.body.userCode;
    const lang = req.body.lang;
    console.log('lang:', lang, 'code:', userCode);

    restClient.methods.build_and_run({
            data: {code: userCode, lang: lang},
            headers: {'Content-Type': 'application/json'}
        }, (data, response) => {
            const text = `Build output: ${data['build']}, execute output: ${data['run']}`;
            res.json(text)
        }
    )

});

module.exports = router;