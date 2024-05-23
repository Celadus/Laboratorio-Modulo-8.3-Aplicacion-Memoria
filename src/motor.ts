import { Carta, Tablero, intentosJuego, maximoDeIntentos,} from "./modelo";


export const barajarCartas = (cartas : Carta[]): Carta[] => {
    for (let i = cartas.length -1; i > 0; i--) {
    const indiceAleatorio = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[indiceAleatorio]] = [cartas[indiceAleatorio], cartas[i]];
    }
    return cartas;
  }


export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
    const carta = tablero.cartas[indice];

    if (carta.encontrada || carta.estaVuelta) {
      return false;
    }
  
    const cartasVolteadasDelMismoTipo = tablero.cartas.filter(x => x.estaVuelta && !x.encontrada);
  
    if (cartasVolteadasDelMismoTipo.length <= 1) {
      return true;
    }
  
    return false;
  }
  
export const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
    const carta = tablero.cartas[indice];
    carta.estaVuelta = true;

    if (tablero.indiceCartaVolteadaA === undefined)
    {tablero.indiceCartaVolteadaA = indice
    }else{
    tablero.indiceCartaVolteadaB = indice}
  }


  export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
    const cartaA = tablero.cartas[indiceA];
    const cartaB = tablero.cartas[indiceB];

    return cartaA.idFoto === cartaB.idFoto;
  };


  export const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
    const cartaA = tablero.cartas[indiceA];
    const cartaB = tablero.cartas[indiceB];

    cartaA.encontrada = true;
    cartaB.encontrada = true;

    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
  };


  export const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {
    const cartaA = tablero.cartas[indiceA];
    const cartaB = tablero.cartas[indiceB];

    cartaA.encontrada = false;
    cartaB.encontrada = false;

    cartaA.estaVuelta = false;
    cartaB.estaVuelta = false;

    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
  }

      

export const esPartidaCompleta = (tablero: Tablero): boolean => {
    return tablero.cartas.every((carta) => carta.encontrada);
  }

export const cambiarEstadoAPartidaCompleta = (tablero: Tablero) => {
  tablero.estadoPartida = "PartidaCompleta";
}


export const iniciaPartida = (tablero: Tablero): void => {
    tablero.cartas = barajarCartas(tablero.cartas);

   
    tablero.cartas.forEach(carta => {
        carta.estaVuelta = false;
        carta.encontrada = false;
    });

    
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;

    
    tablero.estadoPartida = "CeroCartasLevantadas";
};
    
export const superadosLosIntentos = () : boolean => 
  intentosJuego.numeroDeIntentos >= maximoDeIntentos;

export const cambiarEstadoAPartidaPerdida = (tablero: Tablero) => {
    tablero.estadoPartida = "PartidaPerdida";
  }