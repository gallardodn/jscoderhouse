// Defino la fecha actual para futuras comparaciones.
// Aplicacion de Luxon
var DateTime = luxon.DateTime;
const fechaActual = DateTime.now();


// inicializo variables globales del programa.
let anioNacimiento=0;
let mesNacimiento=0;
let diaNacimiento=0;
let repetir=false;
let totalCampos = 1;
let nombre = "";
const personas = [];



const baseHTML=document.getElementById("base");

// creo la clase persona para futuras asignaciones.
class persona {
    constructor (nombre,anioN,mesN,diaN){
    this.nombre = nombre;
    this.anioN = parseInt(anioN);
    this.mesN = parseInt(mesN);
    this.diaN = parseInt(diaN);
    }
    signo(){
        switch(this.mesN){   //pregunto por el mes
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
    edad(){
        const fechaNacimiento = DateTime.local(this.anioN,this.mesN,this.diaN);
        const edad = fechaActual.diff(fechaNacimiento,['years','months', 'days']).toObject();
        return (this.nombre+" tiene una edad de: "+edad.years+" años "+edad.months+" mes/es y "+parseInt(edad.days)+" dias.");
    }
}

function presentacion(){
    baseHTML.innerHTML=`
    <div class="container-sm">
    <h1 class="p-3 display-1 text-center">Bienvenido</h1>
    <div class="card text-center">
        <h5 class="card-header">Calcula tu Signo Zodiacal y edades</h5>
        <div class="card-body">
          <h5 class="card-title">Metodo sencillo de calculo de Edad y Signo Zodiacal</h5>
          <p class="card-text">Tu signo zodiacal es una de las cosas mas importantes que debes saber para conocerte a ti mismo. </p>
          <p class="card-text">Conoce tu signo, tu edad y el de toda tu familia, desde un mismo lugar</p>
          <button id="iniciar" class="btn btn-primary">Comencemos</button>
        </div>
    </div>
    </div>
    `;
    const btniniciar=document.getElementById("iniciar");
    btniniciar.addEventListener("click",function(e){
        e.preventDefault();
        calculadora();
    });
}

function calculadora(){
    baseHTML.innerHTML=`
    <h1>Calcula y compara Edades y Signo Zodiacal</h1>
    <h2>Calcula diferentes edades desde un solo lugar. Conoce su signo Zodiacal y sus caracteristicas.</h2>
    <hr>
    <h4>Empieza por cargar los nombres y las fechas de Nacimiento que quieras calcular:</h4>
    <div class="main__formulario">
    <form>
        <div class="form__campos" id="campos">
        </div>
        <div class="campo__lista">¿Desea agregar a otra persona? <button id="agregar">Agregar</button></div><br><div> ¿Revizamos todas las personas agregadas?<button type="submit" id="boton">Ver</button></div>
        <br>
        <div id="muestra"></div>
        <div>¿Desdea borrar todo y comenzar de cero?<button id="limpiar">Limpiar</button></div>
        <hr>
        <h4>¿Como es?</h4>
        <p>Buscar las caracteristicas del signo Zodiacal de una de las persona agregadas por Nombre: <input type="text" id="busqueda"><button id="buscar">Buscar</button></p>
    </form>
    </div>
    <div id="busqueda"></div>
`;
// Asigno variables para identificar elementos del HTML
const btnAgregar=document.getElementById("agregar");
const btnEnviar=document.getElementById("boton");
const btnBuscar=document.getElementById("buscar");
const btnLimpiar=document.getElementById("limpiar");
let muestra=document.getElementById("muestra");
let campos=document.getElementById("campos");
recuperar();
agregar("",31,12,fechaActual.year);
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
    agregar("",31,12,fechaActual.year);
});
btnLimpiar.addEventListener("click",function(e){
    e.preventDefault();
    localStorage.clear();
    campos.innerHTML="";
    muestra.innerHTML="";
    personas.length=0;
    totalCampos=1;
    agregar("",31,12,fechaActual.year);
});
}

function recuperar(){
    if (localStorage.getItem("personas")!=null){
        totalCampos=1;
        localPersonas=JSON.parse(localStorage.getItem("personas"));
        for (objeto of localPersonas){
            // aplico desestructuracion de objetos.
            const {nombre,anioN,mesN,diaN} = objeto;
            personas.push(new persona(nombre,anioN,mesN,diaN));
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
        personas.push(new persona(nombre,anioNacimiento,mesNacimiento,diaNacimiento));
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
        `<p>${persona.edad()} y es de ${persona.signo()}</p>
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
async function buscar(){
    const resp = await fetch("signos.json");
    const datos = await resp.json();    
    memorizarCampos();
    let busqueda = document.getElementById("busqueda").value;
    let resultado = personas.find((elemento) => elemento.nombre == busqueda);
    if (resultado) {
        let signoPersona = datos.find((elemento)=> elemento.signo == resultado.signo());
        console.log(signoPersona)
        console.log(signoPersona.caracteristicas)
        Swal.fire({
            title: `${resultado.edad()}`,
            text: `Signo: ${resultado.signo()}. \n ${signoPersona.caracteristicas}`,
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
        contenedor.classList.add("campo__lista");
        contenedor.innerHTML+=`Nombre: <input type="text" id="nombre${totalCampos}" value="${nombre}"">
        <span>Dia de nacimiento: 
            <select class="select__dia" name="Dia" id="dia${totalCampos}">
                ${options(1,31,dia)}
            </select>
        </span>
        <span>Mes: 
            <Select class="select__mes" name="Mes" id="mes${totalCampos}">
                ${options(1,12,mes)}
            </Select>
        </span>
        <span>Año: 
            <Select class="select__anio" name="Año" id="anio${totalCampos}">
                ${options(fechaActual.year-130,fechaActual.year,anio)}
            </Select>
        </span>`;
    campos.append(contenedor);
    totalCampos++;
}

// Ejecucion del Script: Solamente agrega un campo inicial.

presentacion();


// Preparo los eventos de escucha para la presion de los botones.

