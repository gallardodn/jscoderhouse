// Este archivo ejecuta el codigo

// Defino la fecha actual para futuras comparaciones.
// Aplicacion de Luxon
var DateTime = luxon.DateTime;
const fechaActual = DateTime.now();


// inicializo variables globales del programa.
let anioNacimiento=0;
let mesNacimiento=0;
let diaNacimiento=0;
let totalCampos = 1;
let nombre = "";
const personas = [];


// Para hacer un mensaje de bienvenida, estilo SPA (Single Page Aplication), tomo el cuerpo de la pagina para modificarlo.
const baseHTML=document.getElementById("base");

// creo la clase persona para futuras asignaciones.
class persona {
    constructor (nombre,anioN,mesN,diaN){
    this.nombre = nombre;
    this.anioN = parseInt(anioN);
    this.mesN = parseInt(mesN);
    this.diaN = parseInt(diaN);
    }
    signo(){ // Creo un metodo que devuelve el sigo zodiacal.
        switch(this.mesN){   //pregunto por el mes y luego el rago de dias.
            case 1: return (this.diaN>=20)?"Acuario":"Capricornio";
                break;
            case 2: return (this.diaN>=19)?"Piscis":"Acuario";
                break;
            case 3: return (this.diaN>=21)?"Aries":"Piscis";
                break;
            case 4: return (this.diaN>=20)?"Tauro":"Aries";
                break;
            case 5: return (this.diaN>=21)?"Geminis":"Tauro";
                break;
            case 6: return (this.diaN>=21)?"Cancer":"Geminis";
                break;
            case 7: return (this.diaN>=23)?"Leo":"Cancer";
                break;
            case 8: return (this.diaN>=23)?"Virgo":"Leo";
                break;
            case 9: return (this.diaN>=23)?"Libra":"Virgo";
                break;
            case 10: return (this.diaN>=23)?"Escorpio":"Libra";
                break;
            case 11: return (this.diaN>=22)?"Sagitario":"Escorpio";
                break;
            case 12: return (this.diaN>=22)?"Capricornio":"Acuario";
                break;
            }
        }
    edad(){ // metodo que calcula la edad de la persona.
        const fechaNacimiento = DateTime.local(this.anioN,this.mesN,this.diaN);
        const edad = fechaActual.diff(fechaNacimiento,['years','months', 'days']).toObject();
        return (this.nombre+" tiene una edad de: "+edad.years+" años "+edad.months+" mes/es y "+parseInt(edad.days)+" dias.");
    }
}

presentacion();


