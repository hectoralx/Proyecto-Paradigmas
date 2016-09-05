var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var casillaSchema = new Schema({
    actual: Boolean,
    i : Number,
    j : Number,
    paredes : [Boolean,Boolean,Boolean,Boolean],
    visitado : Boolean,
    camino : Boolean,
    meta : Boolean,
},{_id: false});

var tableroSchema = new Schema({
    casillas:[casillaSchema]
},{versionKey: false});

var tableroModel = mongoose.model('tableros', tableroSchema);

module.exports = { tableroModel : tableroModel};
