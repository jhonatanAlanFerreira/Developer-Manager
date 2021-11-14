const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/developers');

const developersSchema = new mongoose.Schema({
    nome: String,
    sexo: String,
    idade: Number,
    hobby: String,
    datanascimento: String

}, {
    collection: 'developers'
});

module.exports = {
    Mongoose: mongoose,
    DevelopersSchema: developersSchema
}