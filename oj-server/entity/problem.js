const mogoose = require('mongoose');
const ProblemSchema = mogoose.Schema({
    id: Number,
    name: String,
    desc: String,
    difficulty: String
});

const ProblemModel = mogoose.model('ProblemModel', ProblemSchema);

module.exports = ProblemModel;