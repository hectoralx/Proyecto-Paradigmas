//       ID                   nombre                           Horario
//     115610655        Hector Carvajal Hernandez                1pm
//     116070969      Jean Francis Abarca Bermudez               10am
//     702240573        Junior Juárez Centeno                    1pm
//     402200718          Fabio Campos Rojas                     1pm

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let casillaSchema = new Schema({
    actual: Boolean,
    i : Number,
    j : Number,
    paredes : [Boolean,Boolean,Boolean,Boolean],
    visitado : Boolean,
    camino : Boolean,
    meta : Boolean,
},{_id: false});

let tableroSchema = new Schema({
    casillas:[casillaSchema]
},{versionKey: false});

let tableroModel = mongoose.model('tableros', tableroSchema);

module.exports = { tableroModel : tableroModel};
