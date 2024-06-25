let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 5;

// Función para asignar texto a un elemento en HTML
function asignarTextoElemento(elemento, texto) {
    // Mediante esta instruccón podemos hacer la selección del elemento sobre el cual ingresaremos texto
    let elementoHTML = document.querySelector(elemento);
    // Asignamos el valor a un elemento en nuestra hoja de HTML
    elementoHTML.innerHTML = texto;
    // A pesar de que no retornamos algún valor en la función es buena práctica colocar el return;
    return;
}

// Creamos una función. Esta encapsula una acción que queremos que se haga en un tiempo en especifico
function verificarIntento() {
    // En esta línea hacemos uso de un método para obtener el valor del input mediante el id del elemento en HTML
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    // Ejecutamos la condición para evalauar el numeroUsuario
    if(numeroUsuario == numeroSecreto){
        // Si acerto ejecutamos la función para modificar el elemento de párrafo
        asignarTextoElemento('p', `¡Acertaste el número secreto en: ${intentos} ${intentos == 1 ? 'intento' : 'intentos'}!`);
        
        /// Mediante esta línea habilitamos el boton de reiniciar juego
        document.getElementById('reiniciar').removeAttribute('disabled');

    // Esta senctencia se ejecuta cuando el usuario no acierta el juego
    }else{
        // Volvemos a evaluar respecto a su valor mayor o menos
        if(numeroUsuario > numeroSecreto){
            // Modificamos el párrafo para ofrecer ayuda al usuario
            asignarTextoElemento('p', 'El número secreto es menor');
        }else{
            // Modificamos el párrafo para ofrecer ayuda al usuario
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        // Generamos el incremento de intentos en cada error
        intentos++;
        // Invocamos la función limpirCaja()
        limpiarCaja();
    }
    return;
}

// Esta función nos permitirá limpiar el cuadro de texto
function limpiarCaja() {
    // A pesar de qie usamos un querySelector también podemos seleccionar por ID mediante el simbolo #
    document.querySelector('#valorUsuario').value = '';
}

// Con esta función automatizamos la generación del número secreto
function generarNumeroSecreto() {
    // Creamos la sentencia que ayudará a generar el número secreto
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    
    // Si ya sorteamos todos los números en una indica el fin del juego y en otra nos permitw seguir jugando
    if(listaNumerosSorteados.length == numeroMaximo) {
        // Indicamos a los usuarios el fin del juego
        asignarTextoElemento('p', 'Ya se han sorteado todos los números posibles');
    } else {
        // Si el número generado está incluido en la lista, creamos uno nuevo, sino no
        // Mediante esta sentencia recorremos el arreglo y verificamos si el número secreto generado ya ha existido
        if(listaNumerosSorteados.includes(numeroGenerado)) {
            // Generamos recursividad de forma que la función se llama así misma en caso de que se cumpla una condición
            return generarNumeroSecreto();
        }else{
            // Si no se ha generadp ese número la agregamos al arreglo para que no repita 
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

// Esta función establece los mensajes que se muestran al inicio del juego
function condicionesIniciales() {
    // Hacemos el llamado de la función y le pasamos las parámtetros para que funcione
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Elige un número del 1 al ${numeroMaximo}`);

    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

// Esta función nos ayuda a limpiar la caja, generar un nuevo número secreto, mensaje
function reiniciarJuego() {
    // Hacemos la limpieza de la caja
    limpiarCaja();

    // Generamos las reglas iniciales para comenzar el juego
    condicionesIniciales();
    
    // Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'false');
}

condicionesIniciales();