//       ID                   nombre                           Horario
//     115610655        Hector Carvajal Hernandez                1pm
//     116070969      Jean Francis Abarca Bermudez               10am
//     702240573        Junior Juárez Centeno                    1pm
//     402200718          Fabio Campos Rojas                     1pm


//setup and packages
let express    = require('express');
let bodyParser = require('body-parser');
let app        = express();
let morgan     = require('morgan');
let path       = require('path');
let port       = process.env.PORT || 8080;

app.set('views', __dirname + '/views');
app.set('public', __dirname + '/public');
app.set('models', __dirname + '/models');
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

//console.log FP
let log = s => console.log(s);

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/laberintos');
let tableroModel = require('./app/models/laberinto').tableroModel;

//let tableroModel = require('./app/models/laberinto.js').tableroModel;

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

//router setup
let router = express.Router();

//this is being used to debug API, tracking what's going on
router.use((req, res, next) => {
  log('something is happening...!');
  next();
})//create a route to access API with http://localhost:8080/index.html
router.get('/index.html', (req, res) => res.render('index.html'));

//domain building, with /api as root access
app.use('/', router);
app.listen(port);
log('REST-API listening at port ' + port);

app.post('/api/guardar', (req, res) => {
    tableroModel.remove().then(res=>log(res)).catch(err=>log(err));
    let objArray = req.body;
    let lTablero = new tableroModel({
        casillas : objArray
    });
    lTablero.save().then(res.send('Guardado con éxito')).catch(err=>log(err));
});

app.get('/api/cargar', (req, res) => {
    let query = tableroModel.findOne();
    let p = query.exec();
    log(p);
    p.then(data=>res.send(JSON.stringify(data.casillas))).catch(err=>log(err));
});
