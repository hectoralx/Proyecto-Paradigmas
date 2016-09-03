//Hector
//Junior
//Fabio
//Jean

//Recursive Backtracker Maze from the cracks

let columnas, filas;
let w = 40;
let tablero = [];
let actual;
let stack = [];



class PArray extends Array {

    range(a,b,c){
      return Array.from({length : b - a}, (_, k) => k = c);
    }
    rangeSecuence(a,b){
      return Array.from({length : b - a}, (_, k) => k + a );
    }



}

let crearTableroY = (n, m, i, j, a) =>{

  a.push(new Casilla(j,i));
  return j+1 < n ? crearTableroY(n, m, i, ++j, a) : a;

}

let crearTableroX = (n, m, i, j, a) =>{

  crearTableroY(n, m, i, j, a);
  return a.length < n*m ? crearTableroX(n, m, ++i, j, a) : a;

}



let vectorcitoDelPoder = new PArray();
let needNumbers = new PArray();
let dam = [];


function setup(){
  createCanvas(400,400);
  columnas = floor(width/w);
  filas = floor(height/w);
  frameRate(-150);

  crearTableroX(filas,columnas,0,0,tablero);

  actual = tablero[0];
  meta = indices(tablero.length-1);
  //actual.addEventListener
}



function draw(){
  background(51);
  tablero.forEach((e,i) => e.show());

  actual.visitado = true;
  actual.revisaVecinos();
  actual.hightlight();
  //meta.colMeta();
  //Paso 1
  let sig = actual.revisaVecinos();//sig = siguiente
  if(sig){
    sig.visitado = true;
    //Paso 2
    stack.push(actual);
    //Paso 3
    removerParedes(actual, sig);
    //Paso 4
    actual = sig;
  }else if(stack.length > 0){
      actual = stack.pop();
  }
}

function indices(i,j){
  return (i<0 || j<0 || i > columnas-1 || j > filas-1)?-1:(i+j*columnas);
}

class Casilla{

  constructor(i,j){
    this.i = i;
    this.j = j;
    this.paredes = [true, true, true, true];//Arriba, derecha, abajo, izquierda...
    this.visitado = false;
    this.camino = false;
    this.meta = false;
    this.calcCord = (a) => {return a*w}; // Calcula la coordenada
  }
  seti(i){
    this.i = i;
  }


  revisaVecinos(){
    let vecinos = [];
    //es un arreglo unidimensional hay que ver
    //los vecinos

    let arriba    = tablero[indices(this.i, this.j-1)];
    let derecha   = tablero[indices(this.i+1, this.j)];
    let abajo     = tablero[indices(this.i, this.j+1)];
    let izquierda = tablero[indices(this.i-1, this.j)];

    if(arriba && !arriba.visitado){
      vecinos.push(arriba);
    }
    if(derecha && !derecha.visitado){
      vecinos.push(derecha);
    }
    if(abajo && !abajo.visitado){
      vecinos.push(abajo);
    }
    if(izquierda && !izquierda.visitado){
      vecinos.push(izquierda);
    }
    return (vecinos.length > 0)?vecinos[floor(random(0, vecinos.length))]:undefined;
  }
  hightlight(){
    noStroke();
    fill(250,0,0,255);
    rect(this.calcCord(this.i),this.calcCord(this.j),w,w);
  }


  show(){

    stroke(255);
    strokeWeight(2);
    if(this.paredes[0])
      line(this.calcCord(this.i)    , this.calcCord(this.j)    , this.calcCord(this.i) + w, this.calcCord(this.j)   );
    if(this.paredes[1])
      line(this.calcCord(this.i) + w, this.calcCord(this.j)    , this.calcCord(this.i) + w, this.calcCord(this.j) + w);
    if(this.paredes[2])
      line(this.calcCord(this.i) + w, this.calcCord(this.j) + w, this.calcCord(this.i)    , this.calcCord(this.j) + w);
    if(this.paredes[3])
      line(this.calcCord(this.i)    , this.calcCord(this.j) + w, this.calcCord(this.i)    , this.calcCord(this.j)    );
    if(this.visitado){
      noStroke();
      fill(255,255,0,210);
      rect(this.calcCord(this.i), this.calcCord(this.j), w, w);
    }
    if(this.i == filas-1 && this.j == columnas-1)
      this.meta =true;
    //Este es mejor dejarlo para cuando el se auto-solucione...
    if(this.camino){
      noStroke();
      fill(0,0,128,150);
      rect(this.calcCord(this.i), this.calcCord(this.j), w, w);
    }
    if(this.meta){
      noStroke();
      fill(33,22,128,250);
      rect(this.calcCord(this.i), this.calcCord(this.j), w, w);
    }
  }

  getMeta(){
    return this.meta;
  }
  moverArriba(){
    let arriba = tablero[indices(this.i, this.j-1)];
    return (!arriba || this.paredes[0]) ? false : true;
  }

  moverDerecha(){
    let derecha = tablero[indices(this.i+1, this.j)];
    return (!derecha||this.paredes[1]) ? false : true;
  }

  moverAbajo(){
    let abajo = tablero[indices(this.i, this.j+1)];
    return (!abajo||this.paredes[2]) ? false : true;
  }

  moverIzquierda(){
    let izquierda = tablero[indices(this.i-1, this.j)];
    return (!izquierda||this.paredes[3]) ? false : true;
  }



}//FinDeLaClase...

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

}

document.onkeydown = function(e) {
 var key = (e.keyCode) ? e.keyCode : e.which;

 // arriba
 if (key == 38 && actual.moverArriba()) {
     actual.camino = true;
     actual = tablero[indices(actual.i, actual.j-1)];

 //derecha
 }else if (key == 39 && actual.moverDerecha()) {
     actual.camino = true;
     actual = tablero[indices(actual.i+1, actual.j)];
 }
 //abajo
 else if (key == 40 && actual.moverAbajo()) {
     actual.camino = true;
     actual = tablero[indices(actual.i, actual.j+1)];
 }
 //izquierda
 else if (key == 37 && actual.moverIzquierda()) {
    actual.camino = true;
    actual = tablero[indices(actual.i-1, actual.j)];
 }
}


function autocomplete(e){
  for(let i = 0; i < tablero.length; i++){
    if(actual.moverArriba() && !actual.visitado){
      actual.camino = true;
      actual = tablero[indices(actual.i, actual.j-1)];
      actual.visitado = true;
    }else if (actual.moverDerecha() && !actual.visitado) {

      actual.camino = true;
      actual = tablero[indices(actual.i+1, actual.j)];
      actual.visitado = true;
    }else if (actual.moverAbajo() && !actual.visitado) {

      actual.camino = true;
      actual = tablero[indices(actual.i, actual.j+1)];
      actual.visitado = true;
    }else if (actual.moverIzquierda() && !actual.visitado) {

      actual.camino = true;
      actual = tablero[indices(actual.i-1, actual.j)];
      actual.visitado = true;
    }
  }
}
let log = (...args) => console.log(...args);


let toPromise = e => Promise.resolve(e);
window.onload = () => {
  let btn = document.getElementById("setup");
  btn.onclick = e => toPromise(e).then(autocomplete)
                                 .catch(log("Error...!"));
}


/**
  TREMAUX
**/

// (1) No siga el mismo camino dos veces 7682 JC Engi

// (2) Si llega a un cruce nuevo, no importa qué camino siga

// (3) Si un camino nuevo lo lleva a un cruce viejo, o a un callejón sin salida, retroceda hasta la entrada del camino

// (4) Si un camino viejo lo lleva a un cruce viejo, tome un camino nuevo, y si no lo hay, tome cualquiera
