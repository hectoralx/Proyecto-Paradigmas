class Tablero extends Array {

    constructor(){
      super();
    }

    range(a,b,c){
      return Array.from({length : b - a}, (_, k) => k = c);
    }

    rangeSecuence(a,b){
      return Array.from({length : b - a}, (_, k) => k + a );
    }

    indices(i,j){
      return (i<0 || j<0 || i > util.filas-1 || j > util.columnas-1)?-1:(i+j*util.filas);
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
      return {
          _class : 'Tablero',
        };
    }
}/*Fin de clase Tablero*/
