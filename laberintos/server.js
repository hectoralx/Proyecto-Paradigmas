
//setup and packages

let express    = require('express');
let bodyParser = require('body-parser');
let app        = express();
let morgan     = require('morgan');
let path       = require('path');
let port       = process.env.PORT || 8080;

app.set('views', __dirname + '/views');
app.set('public', __dirname + '/public');
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

//console.log FP
let log = s => console.log(s);

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
});

//create a route to access API with http://localhost/api/index.html
router.get('/index.html', (req, res) => res.render('index.html'));

//domain building, with /api as root access
app.use('/api', router);
app.listen(port);
log('REST-API listening at port ' + port);
