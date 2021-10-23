const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/developers');

const developersSchema = new mongoose.Schema({
    nome: String,
    sexo: String,
    idade: Number,
    hobby: String,
    datanascimento: Date

}, {
    collection: 'developers'
});

module.exports = {
    Mongoose: mongoose,
    DevelopersSchema: developersSchema
}