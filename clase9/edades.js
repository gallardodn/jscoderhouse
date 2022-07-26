// Defino la fecha actual para futuras comparaciones.
const fecha = new Date();
const anioActual = fecha.getFullYear();
const diaActual = fecha.getDate();
const mesActual = fecha.getMonth() + 1;
// inicializo variables globales del programa.
let anioNacimiento=0;
let mesNacimiento=0;
let diaNacimiento=0;
let repetir=false;
let muestra=document.getElementById("muestra");
let campos=document.getElementById("campos");
let totalCampos = 1;
let nombre = "";
const personas = [];

// Asigno variables para identificar botones
const btnAgregar=document.getElementById("agregar");
const btnEnviar=document.getElementById("boton");
const btnBuscar=document.getElementById("buscar");

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
        } else if ((this.diaN>diaActual)&&(this.mesN>=mesActual)&&(this.anioN<anioActual)) {
            return(this.nombre+" tiene una edad de: "+(anioActual-this.anioN-1)+" años "+(mesActual-this.mesN+11)+" mes/es y "+(diaActual-this.diaN+30)+" dias.");
        } else if ((this.diaN>diaActual)&&(this.mesN>=mesActual)&&(this.anioN==anioActual)) {
            return(this.nombre+" aun no ha nacido.");
        }
    }

}

//Calculo todos los datos ingresados por el usuario en los campos y los muestro en el HTML.
function enviar(){
    muestra.innerHTML="";
    personas.length=0;
    for (i=1; i<totalCampos; i++){
        nombre=document.getElementById(`nombre${i}`).value;
        diaNacimiento = document.getElementById(`dia${i}`).value;
        mesNacimiento = document.getElementById(`mes${i}`).value;
        anioNacimiento = document.getElementById(`anio${i}`).value;
        personas.push(new persona(nombre,anioNacimiento,mesNacimiento,diaNacimiento,"No Sabe aun"));
    }
    for (const persona of personas){
        muestra.innerHTML+=
        `<p>${persona.edad()}</p>
        `;
    }
 return false;
}

// Defino la funcion de busqueda de resultados.
function buscar(){
    let busqueda = document.getElementById("busqueda").value;
    let resultado = personas.find((elemento) => elemento.nombre == busqueda);
    alert("Resultado:"+resultado.edad());
    document.getElementById("busqueda").value="";
    return false;
}

function options(inicial,cantidad){
    let cadena="";
    for (i=inicial; i<=cantidad; i++){
        cadena+= `<option value="${i}">${i}</option>
        `;
    }
    return cadena;
}
// Defino una funcion que agrega campos con identificadores contados.
function agregar(){
    let contenedor = document.createElement("span");
        contenedor.innerHTML+=`Ingrese un Nombre: <input type="text" id="nombre${totalCampos}">
        <span>Dia de nacimiento: 
            <select name="Dia" id="dia${totalCampos}">
                ${options(1,30)}
                <option value="31" selected>31</option>
            </select>
        </span>
        <span>Mes: 
            <Select name="Mes" id="mes${totalCampos}">
                ${options(1,11)}
                <option value="12" selected>12</option>
            </Select>
        </span>
        <span>Año: 
            <Select name="Año" id="anio${totalCampos}">
                ${options(anioActual-130,anioActual-1)}
                <option value="${anioActual}" selected>${anioActual}</option>
            </Select>
        </span>`;
    campos.append(contenedor);
    totalCampos++;
}

// Ejecucion del Script: Solamente agrega un campo inicial.
agregar();


// Preparo los eventos de escucha para la presion de los botones.
btnEnviar.addEventListener("click",function(e){
    e.preventDefault();
    enviar();
});
btnBuscar.addEventListener("click",function(e){
    e.preventDefault();
    buscar();
});
btnAgregar.addEventListener("click",function(e){
    e.preventDefault();
    let contenedor = document.createElement("br");
    campos.append(contenedor);
    agregar();
});