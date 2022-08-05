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
personas.push(new persona("Diego",1982,5,20,"Tauro"));
personas.push(new persona("Lucia",1989,1,14,"Acuario"));
let nombre = "";
//Ingreso de datos del usuario.
function enviar(){
nombre=document.getElementById("nombre").value;
diaNacimiento = document.getElementById("dia").value;
mesNacimiento = document.getElementById("mes").value;
anioNacimiento = document.getElementById("anio").value;
// Muestra de resultados
personas.push(new persona(nombre,anioNacimiento,mesNacimiento,diaNacimiento,"No Sabe aun"));
for (const persona of personas){
    alert(persona.edad());
 }
}
function buscar(){
    let busqueda = document.getElementById("busqueda").value;
    let resultado = personas.find((elemento) => elemento.nombre == busqueda);
    alert("Resultado:"+resultado.edad());
}
document.getElementById("boton").addEventListener("click",enviar);
document.getElementById("buscar").addEventListener("click",buscar);
console.log(personas);