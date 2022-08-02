// Defino la fecha actual para futuras comparaciones.
const fecha = new Date();
const anioActual = fecha.getFullYear();
const diaActual = fecha.getDate();
const mesActual = fecha.getMonth() + 1;
// inicializo variables globales del programa.
let intentos = 0;
let anioNacimiento=0;
let mesNacimiento=0;
let diaNacimiento=0;
let repetir=false;
// creo la clase persona para futuras asignaciones.
class persona {
    constructor (nombre,anioN,mesN,diaN,signo){
    this.nombre = nombre;
    this.anioN = anioN;
    this.mesN = mesN;
    this.diaN = diaN;
    this.singo = signo;
    }
    edad(){
        if ((this.diaN<=diaActual)&&(this.mesN<=mesActual)&&(this.anioN<=anioActual)) {
            return(this.nombre+" tiene una edad de: "+(anioActual-this.anioN)+" años "+(mesActual-this.mesN)+" mes/es y "+(diaActual-this.diaN)+" dias.");
        } else if ((this.diaN>diaActual)&&(this.mesN<mesActual)&&(this.anioN<=anioActual)) {
            return(this.nombre+" tiene una edad de: "+(anioActual-this.anioN)+" años "+(mesActual-this.mesN-1)+" mes/es y "+(diaActual-this.diaN+30)+" dias.");
        } else if ((this.diaN<=diaActual)&&(this.mesN>mesActual)&&(this.anioN<=anioActual)) {
            return(this.nombre+" tiene una edad de: "+(anioActual-this.anioN-1)+" años "+(mesActual-this.mesN+12)+" mes/es y "+(diaActual-this.diaN)+" dias.");
        } else if ((this.diaN>diaActual)&&(this.mesN>=mesActual)&&(this.anioN<=anioActual)) {
            return(this.nombre+" tiene una edad de: "+(anioActual-this.anioN-1)+" años "+(mesActual-this.mesN+11)+" mes/es y "+(diaActual-this.diaN+30)+" dias.");
        }
    }

}
// Funcion que evalua el rango correcto ingresasdo por el usuario.
function rangoincorrecto(ingresado,min,max){
    if ((ingresado<min)||(ingresado>max)) {
        return true;
    } else {
        return false;
    }
}

// Creo un array y le cargo un objeto de tipo persona.
const personas = [];
personas.push(new persona("Miguel Ramirez",1981,7,21,"Cancer"));


//Ingreso de datos del usuario.
let nombre=prompt("Por favor, Ingrese su nombre:")
do {
    anioNacimiento = parseInt(prompt("Ingrese su Año de Nacimiento:"));
    intentos = intentos +1;
    repetir=rangoincorrecto(anioNacimiento,1900,anioActual);
    if (repetir&&intentos==3) {alert("Supero el numero de intentos");}
} while (repetir&&(intentos<3));
if ((intentos<3)||(!repetir)) {
    intentos=0;
    do {
        mesNacimiento = parseInt(prompt("Ingrese su MES de Nacimiento:"));
        intentos = intentos +1;
        repetir = rangoincorrecto(mesNacimiento,1,12);
        if (repetir&&(intentos==3)) {alert("Supero el numero de intentos");}
        } while (repetir&&(intentos<3));
}
if ((intentos<3)||(!repetir)) {
    intentos=0;
    do {
        diaNacimiento = parseInt(prompt("Ingrese su DIA de Nacimiento"));
        intentos = intentos +1;
        repetir = rangoincorrecto(diaNacimiento,1,31);
        if (repetir&&(intentos==3)) {alert("Supero el numero de intentos");}
        } while (repetir&&(intentos<3));
}

// Muestra de resultados
if  ((intentos<3)||(!repetir)) {
    personas.push(new persona(nombre,anioNacimiento,mesNacimiento,diaNacimiento,"No Sabe aun"));
    for (const persona of personas){
        alert(persona.edad());
    }
}