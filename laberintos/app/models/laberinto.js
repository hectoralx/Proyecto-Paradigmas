let mongoose  =  require('mongoose');
let Schema    =  mongoose.Schema;

let LbtSchema =  new Schema({
  json : Mixed
});

module.exports = mongoose.model('Lbt', LbtSchema);
