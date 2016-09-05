//Hector
//Junior
//Fabio
//Jean

//Recursive Backtracker Maze from the cracks
//Encapsular en una clase...


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

function setup(){
    let canvas = createCanvas(400,400);
    canvas.parent('canvas');
    frameRate(-150);
}

function draw(){

  if(util.generate == true){
    background('red');
    tablero.forEach((e,i) => e.show());

    /*Metodo aparte*///Debe contactarse con el controller...
    crearLaberinto();
    /*Fin metodo aparte*/
  }
}

window.onload = () => {

  let btn = document.getElementById("setup");
  let btnGenera = document.getElementById("generar");
  let btnRecuperaBD = document.getElementById("recuperarBD");
  let btnGuardaBD = document.getElementById("guardarBD");
  let btnRecupera = document.getElementById("recuperar");
  let btnGuarda = document.getElementById("guardar");


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

}

let alerta = (...args) => window.alert(...args);
document.onkeydown = e =>{
                     toPromise(e)
                     .then(movimiento(e))
                     .catch(e => log(e));
}
