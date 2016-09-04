//Hector
//Junior
//Fabio
//Jean

//Recursive Backtracker Maze from the cracks

let columnas, filas;
let w = 20;


let generate = false;
let stack = [];



class Tablero extends Array {


    constructor(actual){
      super();

    }
    range(a,b,c){
      return Array.from({length : b - a}, (_, k) => k = c);
    }
    rangeSecuence(a,b){
      return Array.from({length : b - a}, (_, k) => k + a );
    }
    indices(i,j){
      return (i<0 || j<0 || i > filas-1 || j > columnas-1)?-1:(i+j*filas);
    }
    buscaActual(){

        return this.find(e => (e.actual === true));

    }


    static from(plain){
      let tab = plain;
  	  tab.actual=plain.actual;
      tab.meta = plain.meta;
  	  return tab;
    }

    static to(tab){
        //tab = this;
      return {
          _class : 'Tablero',
          //me     : this.actual
          //me     : tab
          /*tablero: this.tab,*/

          //actual : tab.actual,
          //meta   : tab.meta
        };
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


function setup(){

    let canvas = createCanvas(400,400);
    canvas.parent('canvas');
    //columnas = floor(width/w);
    //filas = floor(height/w);
    frameRate(-150);
    //crearTableroX(filas,columnas,0,0,tablero);
    //tablero.buscaActual() = tablero[0];
    //meta = tablero.indices(tablero.length-1);
    //tablero.buscaActual().addEventListener


}

function setFilasColumnas(){
    filas = floor(((tablero[tablero.length-1].i)+1)*20/w);
    columnas = floor(((tablero[tablero.length-1].j)+1)*20/w);
}

function generar(){


  filas = floor(document.getElementById('Filas').value*20/w);
  columnas = floor(document.getElementById('Columnas').value*20/w);

  generate = (filas <= 20 && columnas <= 20)? true : false;

  (generate == true)?crearTableroX(filas,columnas,0,0,tablero):log("Dimensiones muy grandes");
  tablero[0].actual = true;
  return true;
  //filas = document.getElementById('Filas').value;
  //columnas = document.getElementById('Columnas').value;

}



function draw(){

  if(generate == true){
    background('red');
    tablero.forEach((e,i) => e.show());

    //log(tablero.buscaActual());
    //log("Mil Holis:3");
    tablero.buscaActual().visitado = true;
    tablero.buscaActual().revisaVecinos();
    tablero.buscaActual().hightlight();
    //meta.colMeta();
    //Paso 1
    let sig = tablero.buscaActual().revisaVecinos();//sig = siguiente
    //log(tablero);
    if(sig){
      sig.visitado = true;
      //Paso 2
      stack.push(tablero.buscaActual());
      //Paso 3
      removerParedes(tablero.buscaActual(), sig);
      //Paso 4
      tablero.buscaActual().actual = false;
      sig.actual = true;

    }else if(stack.length > 0){

        tablero.buscaActual().actual = false;
        stack.pop().actual = true;
    }
  }
}



class Casilla{

  /*constructor(i,j){
    this.i = i;
    this.j = j;
    this.paredes = [true, true, true, true];//Arriba, derecha, abajo, izquierda...
    this.visitado = false;
    this.camino = false;
    this.meta = false;
    this.calcCord = (a) => {return a*w}; // Calcula la coordenada



  }*/
  constructor(i,j,Arraycito=null,_visitado=null,_camino=null,_meta=null,_actual=null){
    this.i = i;
    this.j = j;
    (Arraycito)?this.paredes = Arraycito: this.paredes = [true, true, true, true];//Arriba, derecha, abajo, izquierda...
    (_visitado)?this.visitado = _visitado: this.visitado = false;
    (_camino)?this.camino = _camino:this.camino = false;
    (_meta)?this.meta = _meta:this.meta = false;
    (_actual)?this.actual = _actual: this.actual = false;
    this.calcCord = (a) => {return a*w}; // Calcula la coordenada
  }

  seti(i){
    this.i = i;
  }


  revisaVecinos(){
    let vecinos = [];
    //es un arreglo unidimensional hay que ver
    //los vecinos

    let arriba    = tablero[tablero.indices(this.i, this.j-1)];
    let derecha   = tablero[tablero.indices(this.i+1, this.j)];
    let abajo     = tablero[tablero.indices(this.i, this.j+1)];
    let izquierda = tablero[tablero.indices(this.i-1, this.j)];

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
    let arriba = tablero[tablero.indices(this.i, this.j-1)];
    log(arriba);
    return (!arriba || this.paredes[0]) ? false : true;
  }

  moverDerecha(){
    let derecha = tablero[tablero.indices(this.i+1, this.j)];
    return (!derecha||this.paredes[1]) ? false : true;
  }

  moverAbajo(){
    let abajo = tablero[tablero.indices(this.i, this.j+1)];
    return (!abajo||this.paredes[2]) ? false : true;
  }

  moverIzquierda(){
    let izquierda = tablero[tablero.indices(this.i-1, this.j)];
    return (!izquierda||this.paredes[3]) ? false : true;
  }
/*
  static from(plain){
    let cell = new Casilla(plain.i,plain.j);
	  return cell;
  }

  static to(cell){
    return {
        _class : 'Casilla',
        i : cell.i,
		    j : cell.j
    };
  }
  */



}//FinDeLaClase...

let actual = new Casilla();
let tablero = new Tablero(actual);


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





function movimiento(e) {
 var key = (e.keyCode) ? e.keyCode : e.which;
 let p;
 log(tablero.buscaActual());
 log(tablero.buscaActual().moverArriba());
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
 else{
   log("No movi ni costra");
 }
 //log(tablero.buscaActual());

}

/*CHECKEAR SI HAY CONEXION CON LA BASE DE DATOS??*/

function revive(k,v) {
  if (v instanceof Object && v._class == 'Tablero') {
    return Tablero.from(v);
  }
  if(v instanceof Object && v._class == 'Casilla') {
    return Casilla.from(v);
  }
  log("LLegue a mandar basurita");
  return v;
}

function replacer(k,v) {
  if (v instanceof Tablero) {
    return tablero;
  }
  if (v instanceof Casilla) {
    return Casilla.to(v);
  }
  return v;
}


function guardar(id, tablero){

    return sessionStorage.setItem(id, JSON.stringify(tablero));

}
function recuperar(id){


      let jsonTablero = sessionStorage.getItem(id);
      let container = JSON.parse(jsonTablero);
      container.map(e => tablero.push(new Casilla(e.i,e.j,e.paredes,e.visitado,e.camino,e.meta,e.actual)));
      generate = true;
      setFilasColumnas();
      //log(tablero);
      /*
      this.visitado = false;
      this.camino = false;
      this.meta = false;
      (jsonTablero === null)? generate = false
                            :generate = true;
      return (jsonTablero === null)? new Tablero()
                                   : tablero = JSON.parse(jsonTablero,revive);
      */
}

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
}
let log = (...args) => console.log(...args);




let toPromise = e => Promise.resolve(e);

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
document.onkeydown = e =>{
                          log(e);
                          toPromise(e).then(movimiento(e))
                                      .catch(e);
}

/**
  TREMAUX
**/

// (1) No siga el mismo camino dos veces 7682 JC Engi

// (2) Si llega a un cruce nuevo, no importa qué camino siga

// (3) Si un camino nuevo lo lleva a un cruce viejo, o a un callejón sin salida, retroceda hasta la entrada del camino

// (4) Si un camino viejo lo lleva a un cruce viejo, tome un camino nuevo, y si no lo hay, tome cualquiera
