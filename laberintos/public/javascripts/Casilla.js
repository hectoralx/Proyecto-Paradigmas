//       ID                   nombre                           Horario
//     115610655        Hector Carvajal Hernandez                1pm
//     116070969      Jean Francis Abarca Bermudez               10am
//     702240573        Junior Juárez Centeno                    1pm
//     402200718          Fabio Campos Rojas                     1pm


class Casilla{

  constructor(i,j,Arraycito=null,_visitado=null,_camino=null,_meta=null,_actual=null,_ignorar=null){
    this.i = i;
    this.j = j;
    (Arraycito)?this.paredes = Arraycito: this.paredes = [true, true, true, true];//Arriba, derecha, abajo, izquierda...
    (_visitado)?this.visitado = _visitado: this.visitado = false;
    (_camino)?this.camino = _camino:this.camino = false;
    (_ignorar)?this.ignorar = _ignorar : this.ignorar = false;
    (_meta)?this.meta = _meta:this.meta = false;
    (_actual)?this.actual = _actual: this.actual = false;
    this.calcCord = (a) => {return a*w}; // Calcula la coordenada
  }

  revisaVecinos(){
    let vecinos = [];
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

  revisaVecinos2(){
    let vecinos = [];


    let arriba    = tablero[tablero.indices(this.i, this.j-1)];
    let derecha   = tablero[tablero.indices(this.i+1, this.j)];
    let abajo     = tablero[tablero.indices(this.i, this.j+1)];
    let izquierda = tablero[tablero.indices(this.i-1, this.j)];

    if(arriba && !arriba.camino && !this.paredes[0]){
      vecinos.push(arriba);
    }
    if(derecha && !derecha.camino && !this.paredes[1]){
      vecinos.push(derecha);
    }
    if(abajo && !abajo.camino && !this.paredes[2]){
      vecinos.push(abajo);
    }
    if(izquierda && !izquierda.camino && !this.paredes[3]){
      vecinos.push(izquierda);
    }
    let a = (vecinos.length > 0) ? vecinos[floor(random(0, vecinos.length))]
                                 : undefined
    ;
    return a;
  }

  revisaVecinos3(){
    let vecinos = [];

    let arriba    = tablero[tablero.indices(this.i, this.j-1)];
    let derecha   = tablero[tablero.indices(this.i+1, this.j)];
    let abajo     = tablero[tablero.indices(this.i, this.j+1)];
    let izquierda = tablero[tablero.indices(this.i-1, this.j)];

    if(arriba && !arriba.ignorar && !this.paredes[0] && arriba.camino)
      vecinos.push(arriba);
    if(derecha && !derecha.ignorar && !this.paredes[1] && derecha.camino)
      vecinos.push(derecha);
    if(abajo && !abajo.ignorar && !this.paredes[2] && abajo.camino)
      vecinos.push(abajo);
    if(izquierda && !izquierda.ignorar && !this.paredes[3] && izquierda.camino)
      vecinos.push(izquierda);

    let a = (vecinos.length > 0) ? vecinos
                                 : undefined
    ;
    return a;
  }

  hightlight(){
    noStroke();
    fill(250,0,0,255);
    rect(this.calcCord(this.i),this.calcCord(this.j),w,w);
  }

  show(){//controller
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

    if(this.i == util.filas-1 && this.j == util.columnas-1)
      this.meta =true;
    //Este es mejor dejarlo para cuando el se auto-solucione...
    if(this.camino){
      noStroke();
      fill(0,0,128,150);
      rect(this.calcCord(this.i), this.calcCord(this.j), w, w);
    }
    if(this.ignorar){
      noStroke();
      fill(255,255,0,210);
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
}//FinDeLaClase...
