//Hector
//Junior
//Fabio
//Jean

//Recursive Backtracker Maze from the cracks

let columnas, filas;
let w = 20;
let tablero = [];

let actual;

let stack = [];


function setup(){
  createCanvas(400,400);
  columnas = floor(width/w);
  filas = floor(height/w);
  frameRate(-255);
  for(let j = 0; j < filas; j++ ){
    for (let i = 0; i < columnas; i++) {
      let casilla = new Casilla(i,j);
      tablero.push(casilla);
    }
  }
  actual = tablero[0];
}

function draw(){
  background(51);
  for(let i = 0; i < tablero.length; i++){
    tablero[i].show();
  }
  actual.visitado = true;
  actual.revisaVecinos();
  actual.hightlight();
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
  if(i<0 || j<0 || i > columnas-1 || j > filas-1){
    return -1;
  }
  return i + j * columnas;
}

function Casilla(i,j){
  this.i = i;
  this.j = j;
  this.paredes = [true, true, true, true];
  this.visitado = false;
  this.revisaVecinos = function(){
    let vecinos = [];
    //es un arreglo unidimensional hay que ver
    //los vecinos

    let arriba    = tablero[indices(i, j-1)];
    let derecha   = tablero[indices(i+1, j)];
    let abajo     = tablero[indices(i, j+1)];
    let izquierda = tablero[indices(i-1, j)];

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
    if(vecinos.length > 0){
      let r = floor(random(0, vecinos.length));
      return vecinos[r];
    }else{
      return undefined;
    }
  }
  this.hightlight = function(){
    var x = this.i*w;
    var y = this.j*w;
    noStroke();
    fill(250,0,0,175);
    rect(x,y,w,w);
  }


  this.show = function(){
    let x = this.i*w;
    let y = this.j*w;
    stroke(255);
    if(this.paredes[0]){
      line(x    , y    , x + w, y   );
    }
    if(this.paredes[1]){
      line(x + w, y    , x + w, y + w);
    }
    if(this.paredes[2]){
      line(x + w, y + w, x    , y + w);
    }
    if(this.paredes[3]){
      line(x    , y + w, x    , y    );
    }
    if(this.visitado){
      noStroke();
      fill(255,255,0,150);
      rect(x, y, w, w);
    }
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
