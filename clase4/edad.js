const fecha = new Date();
const anioActual = fecha.getFullYear();
const diaActual = fecha.getDate();
const mesActual = fecha.getMonth() + 1;
let intentos = 0;
let anioNacimiento=0;
let mesNacimiento=0;
let diaNacimiento=0;
let repetir=false;
let nombre=prompt("Por favor, Ingrese su nombre:")
function rangoincorrecto(ingresado,min,max){
    if ((ingresado<min)||(ingresado>max)) {
        return true;
    } else {
        return false;
    }
}
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
if  ((intentos<3)||(!repetir)) {
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