//       ID                   nombre                           Horario
//     115610655        Hector Carvajal Hernandez                1pm
//     116070969      Jean Francis Abarca Bermudez               10am
//     702240573        Junior Juárez Centeno                    1pm
//     402200718          Fabio Campos Rojas                     1pm



/////////////////////////////////////
///         Instancias Variables

let tablero = new Tablero();
let util = new Util();
const w = 10;


/////////////////////////////////////////////
//                      Controller
class Controller extends p5{

    constructor(){
      super();
    }

    getFilas(){
      return floor(document.getElementById('Filas').value/**10/w*/);
    }

    getColumnas(){
      return floor(document.getElementById('Columnas').value/**10/w*/);
    }
}

let controller = new Controller();
let worker = new Worker("./javascripts/worker.js");

function startWorker(){
    document.getElementById("generar").disabled     = true;
    document.getElementById("setup").disabled       = true;
    document.getElementById("recuperarBD").disabled = true;
    document.getElementById("guardarBD").disabled   = true;
    document.getElementById("recuperar").disabled   = true;
    document.getElementById("guardar").disabled     = true;
    document.getElementById("mySelect").disabled    = true;
    document.getElementById("Filas").disabled       = true;
    document.getElementById("Columnas").disabled    = true;
    worker.postMessage("start");
}

function stopWorker(){
  worker.terminate();
  document.getElementById("generar").disabled     = false;
  document.getElementById("setup").disabled       = false;
  document.getElementById("recuperarBD").disabled = false;
  document.getElementById("guardarBD").disabled   = false;
  document.getElementById("recuperar").disabled   = false;
  document.getElementById("guardar").disabled     = false;
  document.getElementById("mySelect").disabled    = false;
  document.getElementById("Filas").disabled       = false;
  document.getElementById("Columnas").disabled    = false;
}
function setup(){
    let canvas = createCanvas(400,400);
    canvas.parent('canvas');
    frameRate(-150);
}

function draw(){

  if(util.generate == true){
    background('red');
    tablero.forEach((e,i) => {startWorker(); e.show();});

    /*Metodo aparte*///Debe contactarse con el controller...
    crearLaberinto();
    /*Fin metodo aparte*/
  }
}



window.onload = () => {

  function radios(){
     let select = document.getElementById("mySelect");
     let strUser = select.options[select.selectedIndex].value;


    if(strUser == "Online"){
      //console.log(e.value);
      btnGuarda.className = "invisible";
      btnRecupera.className = "invisible";
      btnGuardaBD.className = "visible";
      btnRecuperaBD.className = "visible";
    }
    if(strUser == "Local"){
      btnGuardaBD.className = "invisible";
      btnRecuperaBD.className = "invisible";
      btnGuarda.className = "visible";
      btnRecupera.className = "visible";
    }

  }

  let btn = document.getElementById("setup");
  let btnGenera = document.getElementById("generar");
  let btnRecuperaBD = document.getElementById("recuperarBD");
  let btnGuardaBD = document.getElementById("guardarBD");
  btnRecuperaBD.className = "invisible";
  btnGuardaBD.className = "invisible";
  let btnRecupera = document.getElementById("recuperar");
  let btnGuarda = document.getElementById("guardar");

  let select = document.getElementById("mySelect");

  btn.onclick = e => toPromise(e).then(autocomplete)
                                 .then(intersecciones);

  btnGenera.onclick = e => toPromise(e).then(generar())
                                       .catch(e => log(e));

  btnGuardaBD.onclick = e => toPromise(e).then(guardarBD())
                                         .catch(e => log(e));

  btnRecuperaBD.onclick = e => toPromise(e).then(recuperarBD())
                                         .catch(e => log(e));

  btnGuarda.onclick = e => toPromise(e).then(guardar("tablero",tablero))
                                         .catch(e => log(e));

  btnRecupera.onclick = e => toPromise(e).then(recuperar("tablero"))
                                           .catch(e => log(e));

  select.onchange = e => radios();

  document.onkeydown = e => toPromise(e).then(movimiento(e))
                                        .catch(e => log(e));


}

let alerta = (...args) => window.alert(...args);
