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
const btnLimpiar=document.getElementById("limpiar");

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
function recuperar(){
    console.log("se ejecuta");
    if (localStorage.getItem("personas")!=null){
        totalCampos=1;
        localPersonas=JSON.parse(localStorage.getItem("personas"));
        for (objeto of localPersonas){
            // aplico desestructuracion de objetos.
            const {nombre,anioN,mesN,diaN,signo} = objeto;
            personas.push(new persona(nombre,anioN,mesN,diaN,signo));
            agregar(objeto.nombre,objeto.diaN,objeto.mesN,objeto.anioN);
            let contenedor = document.createElement("br");
            campos.append(contenedor);
        }
    }
}

// Creo una funcion Memorizar para almacenar los datos al calcular o al agregar campos. Previniendo busquedas sin calculos.
function memorizarCampos(){
    for (i=1; i<totalCampos; i++){
        nombre=document.getElementById(`nombre${i}`).value;
        if (nombre){
        diaNacimiento = document.getElementById(`dia${i}`).value;
        mesNacimiento = document.getElementById(`mes${i}`).value;
        anioNacimiento = document.getElementById(`anio${i}`).value;
        personas.push(new persona(nombre,anioNacimiento,mesNacimiento,diaNacimiento,"No Sabe aun"));
    }
    }
}

//Calculo todos los datos ingresados por el usuario en los campos y los muestro en el HTML.
function enviar(){
    muestra.innerHTML="";
    personas.length=0;
    memorizarCampos();
    // Agrego un if para verificar si se agregaron campos
    if (personas.length!=0) {
    for (const persona of personas){
        muestra.innerHTML+=
        `<p>${persona.edad()}</p>
        `;
    }
    localStorage.setItem("personas",JSON.stringify(personas));
    } else {
        muestra.innerHTML+=
        `<p>No se han agregado campos!!</p>
        `;
    }
 return false;
}

// Defino la funcion de busqueda de resultados.
function buscar(){
    let busqueda = document.getElementById("busqueda").value;
    let resultado = personas.find((elemento) => elemento.nombre == busqueda);
    if (resultado) {
        Swal.fire({
            title: `Encontrado!`,
            text: `Resultado: "${resultado.edad()}`,
            icon: `success`,
            confirmButtonText: `Gracias`
        });
    } else {
        // Aplicacion de SweetAlert
        Swal.fire({
            title: `Lo sentimos..`,
            text: `Su busqueda de ${busqueda} no arrojo resultados.`,
            icon: `error`,
             confirmButtonText: `Ok...`
        });
    }
    document.getElementById("busqueda").value="";
    return false;
}

function options(inicial,cantidad,seleccionado){
    let cadena="";
    for (i=inicial; i<=cantidad; i++){
        // Apliaccion de operador ternario...
        i==seleccionado ? cadena+= `<option value="${i}" selected>${i}</option>` : cadena+= `<option value="${i}">${i}</option>`;
    }
    return cadena;
}
// Defino una funcion que agrega campos con identificadores contados.
function agregar(nombre,dia,mes,anio){
    memorizarCampos();
    let contenedor = document.createElement("span");
        contenedor.innerHTML+=`Ingrese un Nombre: <input type="text" id="nombre${totalCampos}" value="${nombre}"">
        <span>Dia de nacimiento: 
            <select name="Dia" id="dia${totalCampos}">
                ${options(1,31,dia)}
            </select>
        </span>
        <span>Mes: 
            <Select name="Mes" id="mes${totalCampos}">
                ${options(1,12,mes)}
            </Select>
        </span>
        <span>Año: 
            <Select name="Año" id="anio${totalCampos}">
                ${options(anioActual-130,anioActual,anio)}s
            </Select>
        </span>`;
    campos.append(contenedor);
    totalCampos++;
}

// Ejecucion del Script: Solamente agrega un campo inicial.
recuperar();
agregar("",31,12,anioActual);


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
    agregar("",31,12,anioActual);
});
btnLimpiar.addEventListener("click",function(e){
    e.preventDefault();
    localStorage.clear();
    campos.innerHTML="";
    muestra.innerHTML="";
    personas.length=0;
    totalCampos=1;
    agregar("",31,12,anioActual);
});