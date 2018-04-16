const ProblemModel = require('../entity/problem');

const getProblems = function () {
    return new Promise((resolve, reject) => {
        ProblemModel.find({}, function (err, problems) {
            if (err) {
                reject(err)
            } else {
                resolve(problems);
            }
        })
    })
};

const getProblemByID = function (id) {
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({id: id}, function (err, problem) {
            if (err) {
                reject(err)
            } else {
                resolve(problem)
            }
        })
    })
};

const addProblem = function (newProblem) {
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({name: newProblem.name}, function (err, data) {
            if (data) {
                reject("Problem name already exists.")
            } else {
                ProblemModel.count({}, function (err, num) {
                    newProblem.id = num + 1;
                    let mongoProblem = new ProblemModel(newProblem);
                    mongoProblem.save();
                    resolve(mongoProblem);
                })
            }
        })
    })
};

const deleteProblemByID = function (id) {
    return new Promise(((resolve, reject) => {
        ProblemModel.findByIdAndRemove(id, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    }))
};

const updateProblemByID = function (updateProblem) {
    return new Promise((resolve, reject) => {
        console.log(updateProblem._id);
        ProblemModel.findByIdAndUpdate(updateProblem._id, updateProblem, {new: true}, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
};

module.exports = {
    getProblems,
    addProblem,
    getProblemByID,
    deleteProblemByID,
    updateProblemByID
};