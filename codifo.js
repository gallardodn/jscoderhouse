const fecha = new Date();
const anioActual = fecha.getFullYear();
const diaActual = fecha.getDate();
const mesActual = fecha.getMonth() + 1;
let intentos = 0;
let anioNacimiento=0;
let mesNacimiento=0;
let diaNacimiento=0;
let nombre=prompt("Por favor, Ingrese su nombre:")
do {
    anioNacimiento = parseInt(prompt("Ingrese su Año de Nacimiento:"));
    intentos = intentos +1;
    if (((anioNacimiento<=1900)||(anioNacimiento>anioActual))&&intentos==3) {alert("Supero el numero de intentos");}
} while (((anioNacimiento<=1900)||(anioNacimiento>anioActual))&&(intentos<3));
if (intentos<3) {
    intentos=0;
    do {
        mesNacimiento = parseInt(prompt("Ingrese su MES de Nacimiento:"));
        intentos = intentos +1;
        if (((mesNacimiento<=0)||(mesNacimiento>12))&&intentos==3) {alert("Supero el numero de intentos");}
        } while (((mesNacimiento<=0)||(mesNacimiento>12))&&(intentos<3));
}
if (intentos<3) {
    intentos=0;
    do {
        diaNacimiento = parseInt(prompt("Ingrese su DIA de Nacimiento"));
        intentos = intentos +1;
        if (((diaNacimiento<=0)||(diaNacimiento>31))&&intentos==3) {alert("Supero el numero de intentos");}
        } while (((diaNacimiento<=0)||(diaNacimiento>31))&&(intentos<3));
}
if  (intentos<3) {
    if ((diaNacimiento<=diaActual)&&(mesNacimiento<=mesActual)&&(anioNacimiento<=anioActual)) {
        alert(nombre+" Su edad es: "+(anioActual-anioNacimiento)+" años "+(mesActual-mesNacimiento)+" mes/es y "+(diaActual-diaNacimiento)+" dias.");
    } else if ((diaNacimiento>diaActual)&&(mesNacimiento<=mesActual)&&(anioNacimiento<=anioActual)) {
        alert(nombre+" Su edad es: "+(anioActual-anioNacimiento)+" años "+(mesActual-mesNacimiento-1)+" mes/es y "+(diaActual-diaNacimiento+30)+" dias.");
    } else if ((diaNacimiento<=diaActual)&&(mesNacimiento>mesActual)&&(anioNacimiento<=anioActual)) {
        alert(nombre+" Su edad es: "+(anioActual-anioNacimiento-1)+" años "+(mesActual-mesNacimiento+12)+" mes/es y "+(diaActual-diaNacimiento)+" dias.");
    } else if ((diaNacimiento>diaActual)&&(mesNacimiento>mesActual)&&(anioNacimiento<=anioActual)) {
        alert(nombre+" Su edad es: "+(anioActual-anioNacimiento-1)+" años "+(mesActual-mesNacimiento+12)+" mes/es y "+(diaActual-diaNacimiento+30)+" dias.");
    }
}