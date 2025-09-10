const oraciones = [
  "Volver a hablar es desenterrar el miedo que callé en silencio.",
  "Las palabras que no dije, lágrimas que el alma no pudo verter.",
  "El arrepentimiento, un eco frío que me abraza en la noche.",
  "El amor perdido se esconde en los susurros del adiós jamás dicho.",
  "Me duele el silencio que construí entre nosotros sin querer.",
  "En el mutismo se esconden heridas que el tiempo no cura.",
  "Volver es abrir puertas que sangran recuerdos y dolor.",
  "Mi corazón se quiebra en pedazos que nunca te mostré.",
  "Las cadenas de mis silencios me atan a un ayer sin ti.",
  "Extraño el instante donde un ‘te amo’ cambió el destino.",
  "El peso del arrepentimiento hunde mi pecho en la sombra.",
  "Hablar ahora es enfrentar fantasmas que nunca se fueron.",
  "El amor se escapa entre los dedos de un miedo congelado.",
  "Si el tiempo fuera un suspiro, volvería para decirte todo.",
  "Cada día sin tu voz es un abismo que no consigo llenar.",
  "Orgullo y temor construyeron muros que no supe derribar.",
  "Volver no es un camino, es un laberinto de heridas abiertas.",
  "Mis palabras vacías son cenizas de un fuego apagado.",
  "Quise acercarme, pero el silencio me cerró el paso.",
  "Lágrimas guardan secretos que nunca encontraste en mi voz.",
  "Te busco en el eco sordo de recuerdos que se desvanecen.",
  "El desamor es la sombra que aprende a bailar con el vacío.",
  "Perdí tu risa por miedo a romper el frágil silencio.",
  "Si pudiera susurrarte, rompería el silencio de mil inviernos.",
  "El pasado pesa, pero mi alma se aferra a la esperanza rota.",
  "Volver a ti es enfrentar tempestades que el corazón teme.",
  "Promesas rotas son canciones que el viento llevó sin retorno.",
  "Nunca supe cómo decir que sin ti, el mundo es un lugar frío.",
  "El arrepentimiento es el lamento de palabras que no llegaste a oír.",
  "Hablar contigo es abrir una herida que sangra en silencio.",
  "El amor se perdió entre dudas que callamos en la penumbra.",
  "Si hablara, derribaría muros construidos con miedo y soledad.",
  "Te quise en el silencio, y esa fue mi condena más dulce.",
  "Volver no es regresar, es perderse en un mar de nostalgias.",
  "El silencio entre nosotros es un invierno que no termina.",
  "Me arrepiento de no haber luchado contra mis propios fantasmas.",
  "El corazón aprende a latir entre ausencias y recuerdos.",
  "El amor duele cuando llega tarde o se va sin despedidas.",
  "Volver a hablar es aceptar que el tiempo no siempre cura.",
  "A veces el silencio es la única respuesta que merecemos.",
  "Las heridas invisibles sangran en el rincón del alma.",
  "El tiempo cura, pero también borra lo que más amamos.",
  "Aprender a soltar es renacer en medio del dolor.",
  "El vacío que dejaste es un eco que no se calla.",
  "Caminar sin rumbo es encontrar fragmentos perdidos de uno mismo.",
  "Los adioses nunca son finales, solo comienzos disfrazados.",
  "El miedo a perderte me congeló en un instante eterno.",
  "A veces amamos a quien no sabe amarnos de vuelta.",
  "El reflejo en el espejo guarda secretos que no quiero enfrentar.",
  "El corazón no olvida, solo aprende a vivir con la ausencia.",
  "Las promesas olvidadas duelen más que la traición misma.",
  "El arrepentimiento es un susurro que no encuentra voz.",
  "La distancia convierte recuerdos en fantasmas persistentes.",
  "Las lágrimas calladas pesan más que mil palabras gritadas.",
  "En cada sombra habita una verdad que tememos mirar.",
  "El deseo de volver es la huella más profunda del amor perdido.",
  "No hay mayor tristeza que un ‘te quiero’ que no se dice.",
  "La esperanza es frágil, pero lucha por sobrevivir en el silencio.",
  "Volver a empezar duele, pero también abre puertas a la luz."
];

let textoTotal = "";
let currentIndex = 0;
let score = 0;
let correct = 0;
let errors = 0;
let juegoActivo = false;
let tiempoInicio = null;
let timerInterval = null;

const sentenceDisplay = document.getElementById("sentenceDisplay");
const correctDisplay = document.getElementById("correct");
const errorDisplay = document.getElementById("errors");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("startButton");
const backButton = document.getElementById("backButton");
const message = document.getElementById("message");

const correctSound = new Audio("sonidos/correct.mp3");
const errorSound = new Audio("sonidos/error.mp3");
const successSound = new Audio("sonidos/success.mp3");

function normalizar(letra) {
  return letra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function agregarNuevaOracion() {
  const nueva = oraciones[Math.floor(Math.random() * oraciones.length)];
  textoTotal = (textoTotal + " " + nueva).trim();
  renderTexto();
}

function renderTexto() {
  sentenceDisplay.innerHTML = "";
  for (let i = 0; i < textoTotal.length; i++) {
    const span = document.createElement("span");
    span.textContent = textoTotal[i];
    if (textoTotal[i] === " ") span.classList.add("space");
    if (i < currentIndex) {
      span.style.color = "#388e3c";
      span.style.fontWeight = "600";
    }
    sentenceDisplay.appendChild(span);
  }
}

function updateStats() {
  correctDisplay.textContent = correct;
  errorDisplay.textContent = errors;
  scoreDisplay.textContent = Math.floor(correct / 10);
  if (juegoActivo) {
    const segundos = Math.floor((Date.now() - tiempoInicio) / 1000);
    timeDisplay.textContent = segundos;
  } else {
    timeDisplay.textContent = 0;
  }
}

function reiniciarJuego() {
  textoTotal = "";
  currentIndex = 0;
  score = correct = errors = 0;
  juegoActivo = true;
  tiempoInicio = Date.now();
  agregarNuevaOracion();
  agregarNuevaOracion();
  agregarNuevaOracion();
  renderTexto();
  updateStats();
  message.classList.add("hidden");
  startButton.disabled = true;
  startButton.textContent = "Jugando...";
  clearInterval(timerInterval);
  timerInterval = setInterval(updateStats, 1000);
}

function pausarJuego() {
  juegoActivo = false;
  clearInterval(timerInterval);
  message.classList.remove("hidden");
  startButton.disabled = false;
  startButton.textContent = "▶️ Iniciar Juego";
}

startButton.addEventListener("click", () => {
  if (!juegoActivo) reiniciarJuego();
});

backButton.addEventListener("click", () => {
  pausarJuego();
  window.location.href = "index.html";
});

window.addEventListener("keydown", (e) => {
  if (!juegoActivo) return;
  e.preventDefault();
  if (e.key === "Backspace" || e.key.length !== 1) return;

  const typedChar = normalizar(e.key);
  const expectedChar = textoTotal[currentIndex];
  const expectedNormalized = normalizar(expectedChar);
  const spans = sentenceDisplay.querySelectorAll("span");
  const spanActual = spans[currentIndex];

  spanActual.classList.remove("correct-letter", "incorrect-letter");

  if (typedChar === expectedNormalized) {
    spanActual.classList.add("correct-letter");
    spanActual.style.fontWeight = "700";
    spanActual.style.color = "#388e3c";
    correct++;
    correctSound.currentTime = 0;
    correctSound.play();
    currentIndex++;
    while (textoTotal[currentIndex] === " ") {
      spans[currentIndex].style.color = "#388e3c";
      currentIndex++;
    }

    if (currentIndex >= 10) {
  const currentSpan = spans[currentIndex];
  const margin = 770; // Debe coincidir con el padding-left
  const left = currentSpan.offsetLeft;
  if (left - margin > sentenceDisplay.scrollLeft) {
    sentenceDisplay.scrollLeft = left - margin;
  }
}

    if (textoTotal.length - currentIndex < 50) {
      agregarNuevaOracion();
      successSound.currentTime = 0;
      successSound.play();
    }
  } else {
    spanActual.classList.add("incorrect-letter");
    errorSound.currentTime = 0;
    errorSound.play();
    errors++;
  }

  updateStats();
});
