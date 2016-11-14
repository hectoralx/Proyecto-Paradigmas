//       ID                   nombre                           Horario
//     115610655        Hector Carvajal Hernandez                1pm
//     116070969      Jean Francis Abarca Bermudez               10am
//     702240573        Junior Juárez Centeno                    1pm
//     402200718          Fabio Campos Rojas                     1pm



function intersecciones(e){
  tablero.forEach((e) => {

    if(e.ignorar === true){

        if(e.revisaVecinos3() !== undefined){

          (e.revisaVecinos3().length > 1)?
            e.ignorar = false:
            e.ignorar = true;

        }
    }
  });
}

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

  tablero = new Tablero();
  util.filas = controller.getFilas();
  util.columnas = controller.getColumnas();
  util.generate = (util.filas <= 40 && util.columnas <= 40)? true : false;
  (util.generate == true) ? crearTableroX(util.filas,util.columnas,0,0,tablero)
                          : alerta("Dimensiones muy grandes");
  if(tablero[0])
    tablero[0].actual = true;
  return true;
}

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
      }else{
        stopWorker();
      }
}

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
 let key = (e.keyCode) ? e.keyCode : e.which;
 let p;
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
       let audio = new Audio('/sounds/win.mp3');
       stopWorker();
       audio.play();
       //alerta("Felicidades, ganaste!");

      }
}

function guardar(id, tablero){
    return sessionStorage.setItem(id, JSON.stringify(tablero));
}

function recuperar(id){

      tablero = new Tablero();

      let jsonTablero = sessionStorage.getItem(id);
      let container = JSON.parse(jsonTablero);
      container.map(e => tablero.push(new Casilla(e.i,e.j,e.paredes,e.visitado,e.camino,e.meta,e.actual)));
      util.generate = true;
      setFilasColumnas();
}

function recuperarBD(){
  tablero = new Tablero();

  const url = 'http://localhost:8080/api/cargar';
        fetch(url,{method: 'GET', headers: new Headers({'Content-Type':'application/json'})})
                                                      .then(tableroQ=>tableroQ.json())
                                                      .then(tab=>ctm(tab))
                                                      .then(e => console.log(tablero))
                                                      .catch(err=>console.log(err));


}

function ctm(newTablero){
    var tabAux = [];
    newTablero.map(e=>{
      tablero.push(new Casilla(e.i,e.j,e.paredes,e.visitado,e.camino,e.meta,e.actual));
    });
    /*puede quitarse*/
    tablero.forEach((e)=>e.show());
    util.generate = true;
    setFilasColumnas();
}

function guardarBD(){

  console.log(tablero);
  console.log(tablero.length);
  const url = 'http://localhost:8080/api/guardar';
  fetch(url,{method: 'POST',
        body: JSON.stringify(tablero), headers: new Headers({'Content-Type':'application/json'})
                                                    }).then(response => console.log(response));
}

function autocomplete(e){
  if((tablero[tablero.length-1].actual == true)) return false;
  let sig = tablero.buscaActual().revisaVecinos2();
  tablero.buscaActual().camino = true;
  let unvisited = 0;
  if(sig){
    tablero.buscaActual().actual = false;
    sig.actual = true;

    util.stack2.push(sig);
    unvisited += 1;
  }

  if(unvisited == 0){


    tablero.buscaActual().actual = false;

    util.stack2.pop().actual = true;
    tablero.buscaActual().ignorar = true;
    //tablero.buscaActual().camino = false;
  }

  return autocomplete(e);
}

let log = (...args) => console.log(...args);//Para ver errores... Model
let toPromise = e => Promise.resolve(e);//Model
