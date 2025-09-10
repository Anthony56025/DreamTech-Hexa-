//Adivinanzas
const adivinanzas = [
    {
        pregunta: "Blanco por dentro, verde por fuera. Si no sabes, espera.",
        respuesta: "pera",
        pista: "Es una fruta"
    },
    {
        pregunta: "Oro parece, plata no es.",
        respuesta: "platano",
        pista: "Se pela para comer"
    },
    {
        pregunta: "¿Qué cosa tiene un agujero en el medio, pero aún así puede contener agua?",
        respuesta: "Esponja",
        pista: "Se usa para lavar platos"
    },
    {
        pregunta: "Lo tomas en el desayuno, puede ser con leche",
        respuesta: "cafe",
        pista: "Es de color marron"
    },
    {
        pregunta: "Verde por fuera, rojo por dentro. ¿Que soy?",
        respuesta: "sandia",
        pista: "Soy ovalada"
    },
    {
        pregunta: "No muerde ni ladra, pero tiene dientes y la casa guarda. ¿Qué es?",
        respuesta: "llave",
        pista: "No puedes entrar a casa sin ella"
    },
    {
        pregunta: "¿Qué cosa entra dura y seca, y sale blanda y mojada?",
        respuesta: "chicle",
        pista: "Que rico estoy 😏"
    },
    {
        pregunta: "¿Qué animal tiene silla, pero no se puede sentar?",
        respuesta: "caballo",
        pista: "Corre como el viento tiro al blanco 🤑"
    },
    {
        pregunta: "Tengo ciudad sin casas, montañas sin tierra, y agua sin un solo pez",
        respuesta: "mapa",
        pista: "Lo usas para encontrar lugares 🔍"
    },
    {
        pregunta: "Llevo mi casa al hombro, camino sin patas, y dejo mi rastro de plata.",
        respuesta: "caracol",
        pista: "Soy lento ZZZ 😴"
    }

];
    //Variables
    let adivinanzaActual = 0;
    let puntaje = 0;
    let intentosRestantes = 5;
    const puntosPorAdivinanza = 10;
    const maxIntentos = 5;
       
    const inputRespuesta = document.getElementById('respuesta');
    const elementoAdivinanza = document.getElementById('adivinanza-texto');
    const elementoPista = document.getElementById('pista-texto');
    const elementoResultado = document.getElementById('resultado');
    const elementoNumeroAdivinanza = document.getElementById('numero-adivinanza');
    const elementoPuntos = document.getElementById('puntos-actuales');
    const elementoIntentos = document.getElementById('intentos');
    const juegoScreen = document.getElementById('juego-screen');
    const finalScreen = document.getElementById('final-screen');
    const elementoPuntajeFinal = document.getElementById('puntaje-final');
    const elementoMensajeFinal = document.getElementById('mensaje-final');
        
    function iniciarJuego() {
        adivinanzaActual = 0;
        puntaje = 0;
        actualizarUI();
        mostrarAdivinanza();
        
        inputRespuesta.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') verificarIntento();
        });
    }
        
    function mostrarAdivinanza() {
        intentosRestantes = maxIntentos;
        elementoAdivinanza.textContent = adivinanzas[adivinanzaActual].pregunta;
        elementoPista.textContent = adivinanzas[adivinanzaActual].pista;
        inputRespuesta.value = '';
        inputRespuesta.focus();
        elementoIntentos.textContent = intentosRestantes;
        elementoResultado.textContent = '';
    }
        
    function normalizarTexto(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    }
        
    function verificarIntento() {
        const respuestaUsuario = normalizarTexto(inputRespuesta.value);
        const respuestaCorrecta = normalizarTexto(adivinanzas[adivinanzaActual].respuesta);
        
        if (respuestaUsuario === "") {
            elementoResultado.textContent = "Por favor ingresa una respuesta";
            elementoResultado.className = "error";
            return;
        }
            
        if (respuestaUsuario === respuestaCorrecta) {
            const puntosGanados = Math.ceil((intentosRestantes / maxIntentos) * puntosPorAdivinanza);
            puntaje += puntosGanados;
                
            elementoResultado.textContent = `¡Correcto! +${puntosGanados} puntos`;
            elementoResultado.className = "acierto";

            setTimeout(() => {
                adivinanzaActual++;
                if (adivinanzaActual < adivinanzas.length) {
                    mostrarAdivinanza();
                } else {
                    mostrarPantallaFinal();
                }
                actualizarUI();
            }, 1000);
        } else {
            intentosRestantes--;
            elementoIntentos.textContent = intentosRestantes;
                
            if (intentosRestantes > 0) {
                elementoResultado.textContent = "Incorrecto. Intenta de nuevo.";
                elementoResultado.className = "error";
            } else {
                elementoResultado.textContent = `La respuesta era: ${adivinanzas[adivinanzaActual].respuesta}`;
                elementoResultado.className = "error";
    
            setTimeout(() => {
                adivinanzaActual++;
                    if (adivinanzaActual < adivinanzas.length) {
                        mostrarAdivinanza();
                    } else {
                        mostrarPantallaFinal();
                    }
                actualizarUI();
            }, 2000);
            }
        }        
        actualizarUI();
    }
    
    function actualizarUI() {
        elementoNumeroAdivinanza.textContent = adivinanzaActual + 1;
        elementoPuntos.textContent = puntaje;
    }

    function mostrarPantallaFinal() {
        juegoScreen.style.display = "none";
        finalScreen.style.display = "block";
        elementoPuntajeFinal.textContent = puntaje;
        if (puntaje >= 80) {
            elementoMensajeFinal.textContent = "¡Excelente! Eres bueno en las adivinanzas.";
        } else if (puntaje >= 60) {
            elementoMensajeFinal.textContent = "¡Buen trabajo! Sigue practicando.";
        } else {
            elementoMensajeFinal.textContent = "Eres noob.";
        }
    }

    function reiniciarJuego() {
        juegoScreen.style.display = "block";
        finalScreen.style.display = "none";
        iniciarJuego();
    }
        
    window.onload = iniciarJuego;