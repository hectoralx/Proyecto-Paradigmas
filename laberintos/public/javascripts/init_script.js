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
  let btnRecupera = document.getElementById("recuperar");
  let btnGuarda = document.getElementById("guardar");
  btn.onclick = e => toPromise(e).then(autocomplete)
                                 .catch(log("Error...!"));
  btnGenera.onclick = e => toPromise(e).then(generar())
                                       .catch(e);
  btnRecupera.onclick = e => toPromise(e).then(recuperar("tablero"))
                                         .catch(e);
  btnGuarda.onclick = e => toPromise(e).then(guardar("tablero",tablero))
                                       .catch(e);
}

/////////////////////////////////////////////
//                      Model



let crearTableroY = (n, m, i, j, a) =>{
  a.push(new Casilla(j,i));
  return j+1 < n ? crearTableroY(n, m, i, ++j, a) : a;
}

let crearTableroX = (n, m, i, j, a) =>{
  crearTableroY(n, m, i, j, a);
  return a.length < n*m ? crearTableroX(n, m, ++i, j, a) : a;
}

function setFilasColumnas(){
    util.filas = floor(((tablero[tablero.length-1].i)+1)/**20/w*/);
    util.columnas = floor(((tablero[tablero.length-1].j)+1)/**20/w*/);
}



function generar(){
  util.filas = controller.getFilas();
  util.columnas = controller.getColumnas();
  util.generate = (util.filas <= 40 && util.columnas <= 40)? true : false;
  (util.generate == true)?crearTableroX(util.filas,util.columnas,0,0,tablero):alerta("Dimensiones muy grandes");
  if(tablero[0])
    tablero[0].actual = true;
  return true;
}//Esto va en el controller???

function crearLaberinto(){



      tablero.buscaActual().visitado = true;
      tablero.buscaActual().revisaVecinos();
      tablero.buscaActual().hightlight();
      //Paso 1

      let sig = tablero.buscaActual().revisaVecinos();//sig = siguiente
      if(sig){
        sig.visitado = true;
        //Paso 2
        util.stack.push(tablero.buscaActual());
        //Paso 3
        removerParedes(tablero.buscaActual(), sig);
        //Paso 4
        tablero.buscaActual().actual = false;
        sig.actual = true;

      }else if(util.stack.length > 0){

          tablero.buscaActual().actual = false;
          util.stack.pop().actual = true;
      }
}//Model...

function removerParedes(a, b){
  let x = a.i - b.i;
  if(x === 1){
    a.paredes[3] = false;
    b.paredes[1] = false;
  }else if(x === -1){
    a.paredes[1] = false;
    b.paredes[3] = false;
  }
  let y = a.j - b.j;
  if(y === 1){
    a.paredes[0] = false;
    b.paredes[2] = false;
  }else if(y === -1){
    a.paredes[2] = false;
    b.paredes[0] = false;
  }
}//Model

function movimiento(e) {//Model?
 let key = (e.keyCode) ? e.keyCode : e.which;

 let p;
 // arriba
 if (key == 38 && tablero.buscaActual().moverArriba()) {
     tablero.buscaActual().camino = true;
     p = tablero[tablero.indices(tablero.buscaActual().i, tablero.buscaActual().j-1)];
     tablero.buscaActual().actual = false;
     p.actual = true;
 //derecha
 }else if (key == 39 && tablero.buscaActual().moverDerecha()) {
     tablero.buscaActual().camino = true;
     p = tablero[tablero.indices(tablero.buscaActual().i+1, tablero.buscaActual().j)];
     tablero.buscaActual().actual=false;
     p.actual = true;
 }
 //abajo
 else if (key == 40 && tablero.buscaActual().moverAbajo()) {
     tablero.buscaActual().camino = true;
     p = tablero[tablero.indices(tablero.buscaActual().i, tablero.buscaActual().j+1)];
     tablero.buscaActual().actual = false;
     p.actual = true;
 }
 //izquierda
 else if (key == 37 && tablero.buscaActual().moverIzquierda()) {
    tablero.buscaActual().camino = true;
    p = tablero[tablero.indices(tablero.buscaActual().i-1, tablero.buscaActual().j)];
    tablero.buscaActual().actual = false;
    p.actual = true;
 }
 else {
   return false;
 }

 if((tablero.buscaActual().actual == tablero[tablero.length-1].actual)){
   alerta("Felicidades, ganaste!");
 }
}

/*CHECKEAR SI HAY CONEXION CON LA BASE DE DATOS??*/

function guardar(id, tablero){
  const url = 'http://localhost:8080/api/guardar';
  fetch(url,{method: 'POST',
        body: JSON.stringify(tablero), headers: new Headers({'Content-Type':'application/json'})
                                                    }).then(response => console.log(response));
    //return sessionStorage.setItem(id, JSON.stringify(tablero));

}//Model

function recuperar(id){

      let jsonTablero = sessionStorage.getItem(id);
      let container = JSON.parse(jsonTablero);
      container.map(e => tablero.push(new Casilla(e.i,e.j,e.paredes,e.visitado,e.camino,e.meta,e.actual)));
      util.generate = true;
      setFilasColumnas();

/*

      const url = 'http://localhost:8080/api/cargar';
      fetch(url,{method: 'GET', headers: new Headers({'Content-Type':'application/json'})})
                                                    .then(tableroQ=>tableroQ.json())
                                                    .then(tab=>tab.map(e => tablero.push(new Casilla(e.i,e.j,e.paredes,e.visitado,e.camino,e.meta,e.actual))))
                                                    .then(console.log(tablero))
                                                    .catch(err=>console.log(err));
                                                    util.generate = true;
                                                    setFilasColumnas();
                                                    */                          
}//Model

function autocomplete(e){
  for(let i = 0; i < tablero.length; i++){
    if(tablero.buscaActual().moverArriba() && !tablero.buscaActual().visitado){
      tablero.buscaActual().camino = true;

      /**/
      tablero.buscaActual().actual = false;
      tablero[tablero.indices(tablero.buscaActual().i, tablero.buscaActual().j-1)].actual = true;
      /**/

      tablero.buscaActual().visitado = true;
    }else if (tablero.buscaActual().moverDerecha() && !tablero.buscaActual().visitado) {

      tablero.buscaActual().camino = true;

      /**/
      tablero.buscaActual().actual = false;
      tablero[tablero.indices(tablero.buscaActual().i+1, tablero.buscaActual().j)].actual = true;
      /**/


      tablero.buscaActual().visitado = true;
    }else if (tablero.buscaActual().moverAbajo() && !tablero.buscaActual().visitado) {

      tablero.buscaActual().camino = true;

      /**/
      tablero.buscaActual().actual = false;
      tablero[tablero.indices(tablero.buscaActual().i, tablero.buscaActual().j+1)].actual = true;
      /**/

      tablero.buscaActual().visitado = true;
    }else if (tablero.buscaActual().moverIzquierda() && !tablero.buscaActual().visitado) {

      tablero.buscaActual().camino = true;

      /**/
      tablero.buscaActual().actual = false;
      tablero[tablero.indices(tablero.buscaActual().i-1, tablero.buscaActual().j)].actual = true;
      /**/

      tablero.buscaActual().visitado = true;
    }
  }
}//Model...
let log = (...args) => console.log(...args);//Para ver errores... Model
let alerta = (...args) => window.alert(...args);

let toPromise = e => Promise.resolve(e);//Model

document.onkeydown = e =>{
                     toPromise(e)
                     .then(movimiento(e))
                     .catch(e);
}
