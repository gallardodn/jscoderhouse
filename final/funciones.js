// Este archivo solo prepara las funciones, pero no ejecuta.

// creo una funcion para hacer un mensaje de bienvenida. Quizas podria guardar el cuerpo del HTML en un JSON, pero siendo una sola pagina elegi este metodo.
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
    const btniniciar=document.getElementById("iniciar"); // Dentro de la bienvenida, esta el boton para inicar la aplicacion.
    btniniciar.addEventListener("click",function(e){
        e.preventDefault();
        calculadora(); // ejecuta la aplicacion
    });
}

function calculadora(){ // funcion principal que contiene el HTML, los botones y las instrucciones principales de la aplicacion.
    baseHTML.innerHTML=`
    <h1>Calcula y compara Edades y Signo Zodiacal</h1>
    <h2>Calcula diferentes edades desde un solo lugar. Conoce su signo Zodiacal y sus caracteristicas.</h2>
    <hr>
    <h4>Empieza por cargar los nombres y las fechas de Nacimiento que quieras calcular:</h4>
    <div class="main__formulario">
    <form id="formulario">
        <div class="form__campos" id="campos">
        </div>
        <div class="campo__lista">¿Desea agregar a otra persona? <button id="agregar">Agregar</button></div><br><div> ¿Revizamos todas las personas agregadas?<button type="submit" id="boton">Ver</button></div>
        <br>
        <div id="muestra"></div>
        <div>¿Desdea borrar todo y comenzar de cero?<button id="limpiar">Limpiar</button></div>
        <hr>
        <h4>¿Como es?</h4>
        <p>Buscar las caracteristicas del signo Zodiacal de una de las persona agregadas por Nombre: <input type="text" id="busqueda"><button id="btnBuscar">Buscar</button></p>
    </form>
    </div>
    <div id="busqueda"></div>
`;
    // Asigno variables para identificar elementos del HTML dentro de la funcion Calculadora, luego de cargar el cuerpo HTML.
    const btnAgregar=document.getElementById("agregar");
    const btnEnviar=document.getElementById("boton");
    const btnBuscar=document.getElementById("btnBuscar");
    const btnLimpiar=document.getElementById("limpiar");
    const formulario=document.getElementById("formulario");
    let muestra=document.getElementById("muestra");
    let campos=document.getElementById("campos");
    recuperar();
    agregar("",31,12,fechaActual.year);

    formulario.addEventListener("submit",function(evento){
        evento.preventDefault();
        });

    btnEnviar.addEventListener("click",function(e){
        e.preventDefault();
        enviar();
        });
    btnBuscar.addEventListener("click",function(e){
        e.preventDefault();
        let busqueda = document.getElementById("busqueda").value;
        buscar(busqueda);
        });
    btnAgregar.addEventListener("click",function(e){
        e.preventDefault();
        nombre=document.getElementById(`nombre${totalCampos-1}`).value;
        if (nombre){ // validacion para evitar campos nombre Vacios con mensaje de libreria Toastify
            let contenedor = document.createElement("br");
            campos.append(contenedor);
            agregar("",31,12,fechaActual.year);
        } else {
            Toastify({
                text: "Debe colocar un Nombre",
                duration: 4000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "center",
                stopOnFocus: true,
                style: {
                  background: "red",
                },
              }).showToast();
        }
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

// Creo una funcion que se encarga de recuperar los datos del Local Storage y construye los campos en base a los datos recuperados.
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
    personas.length=0;
    for (i=1; i<totalCampos; i++){
        nombre=document.getElementById(`nombre${i}`).value;
        if (nombre){
        diaNacimiento = document.getElementById(`dia${i}`).value;
        mesNacimiento = document.getElementById(`mes${i}`).value;
        anioNacimiento = document.getElementById(`anio${i}`).value;
        personas.push(new persona(nombre,anioNacimiento,mesNacimiento,diaNacimiento));

    }
    }
    personas.length!=0&&localStorage.setItem("personas",JSON.stringify(personas));
}

//Calculo todos los datos ingresados por el usuario en los campos y los muestro en el HTML.
function enviar(){
    muestra.innerHTML="";
    memorizarCampos();
    // Agrego un if para verificar si se agregaron campos
    if (personas.length!=0) {
    for (const persona of personas){
        muestra.innerHTML+=
        `<p>${persona.edad()} y es de ${persona.signo()} : <a class="masinfo" onclick="buscar('${persona.nombre}')">Mas...</a></p>
        `;
    }
    } else {
        muestra.innerHTML+=
        `<p>No se han agregado campos!!</p>
        `;
    }
 return false;
}

function probar(datos){
    console.log(datos);
}
// Defino la funcion de busqueda de resultados.
const buscar = async (busqueda) =>{
    const resp = await fetch("signos.json");
    const datos = await resp.json();    
    memorizarCampos();
    let resultado = personas.find((elemento) => elemento.nombre.toUpperCase() == busqueda.toUpperCase()); // La busqueda no distigue minusculas
    if (resultado) {
        let signoPersona = datos.find((elemento)=> elemento.signo == resultado.signo());
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

// para sintetizar la construccion del SELECT en el HTML, creo una funcion que puedo reutilizar con diferentes valores.
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
