console.log("Portfolio cargado correctamente 🚀");

// Tech Slider Functionality
const techSlider = document.getElementById("techSlider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const sliderDotsContainer = document.getElementById("sliderDots");
const techItems = document.querySelectorAll(".tech-item");

let currentIndex = 0;
let autoScrollInterval;
const itemWidth = 200; // aproximado (padding + ancho)
const itemsPerView = 4;
const totalItems = techItems.length;

// Crear puntos de navegación
function createDots() {
  const totalDots = Math.ceil(totalItems / itemsPerView);
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("div");
    dot.classList.add("slider-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    sliderDotsContainer.appendChild(dot);
  }
}

// Ir a una diapositiva específica
function goToSlide(index) {
  currentIndex = index;
  updateSlider();
  resetAutoScroll();
}

// Actualizar posición del slider
function updateSlider() {
  const scrollAmount = currentIndex * itemWidth * itemsPerView;
  techSlider.scrollLeft = scrollAmount;
  updateDots();
}

// Actualizar puntos activos
function updateDots() {
  document.querySelectorAll(".slider-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

// Botón siguiente
function nextSlide() {
  const totalDots = Math.ceil(totalItems / itemsPerView);
  currentIndex = (currentIndex + 1) % totalDots;
  updateSlider();
  resetAutoScroll();
}

// Botón anterior
function prevSlide() {
  const totalDots = Math.ceil(totalItems / itemsPerView);
  currentIndex = (currentIndex - 1 + totalDots) % totalDots;
  updateSlider();
  resetAutoScroll();
}

// Auto scroll
function startAutoScroll() {
  autoScrollInterval = setInterval(nextSlide, 4000);
}

// Resetear auto scroll
function resetAutoScroll() {
  clearInterval(autoScrollInterval);
  startAutoScroll();
}

// Event listeners
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// Pausar auto scroll al pasar el mouse
techSlider.addEventListener("mouseenter", () =>
  clearInterval(autoScrollInterval),
);
techSlider.addEventListener("mouseleave", startAutoScroll);

// Inicializar
createDots();
startAutoScroll();

// ===== POMODORO FUNCTIONALITY =====
let timer;
let isRunning = false;
let isWork = true;
let timeLeft = 25 * 60;
let frases = [];

const timerDisplay = document.getElementById("timer");
const modeDisplay = document.getElementById("mode");
const workInput = document.getElementById("workInput");
const breakInput = document.getElementById("breakInput");
const taskInput = document.getElementById("taskInput");
const motivationalText = document.getElementById("motivationalText");

// Cargar frases motivadoras desde el JSON
async function loadFrases() {
  try {
    const response = await fetch("data/frases.json");
    const data = await response.json();
    frases = data.frases;
  } catch (error) {
    console.error("Error cargando frases:", error);
    frases = ["Concéntrate en tu tarea 🎯"];
  }
}

// Obtener una frase aleatoria
function getRandomFrase() {
  return frases[Math.floor(Math.random() * frases.length)];
}

function updateDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function updateModeDisplay() {
  const taskName = taskInput.value.trim();
  if (taskName) {
    modeDisplay.textContent = taskName;
  } else {
    modeDisplay.textContent = isWork ? "Work" : "Break";
  }
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;

  // Mostrar frase motivadora aleatoria al iniciar
  if (isWork && frases.length > 0) {
    motivationalText.innerHTML = getRandomFrase();
  }

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      switchMode();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  isWork = true;
  timeLeft = workInput.value * 60;
  updateDisplay();
  updateModeDisplay();
  motivationalText.innerHTML = getRandomFrase();
}

function switchMode() {
  isWork = !isWork;
  timeLeft = (isWork ? workInput.value : breakInput.value) * 60;
  updateDisplay();
  updateModeDisplay();

  // Mostrar nueva frase si vuelve a Work
  if (isWork && frases.length > 0) {
    motivationalText.innerHTML = getRandomFrase();
  } else if (!isWork) {
    motivationalText.innerHTML = "¡Descansa un poco!<br>🌟";
  }
}

// Event listeners para el pomodoro
document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);

// Actualizar el modo cuando se escriba en el input de tarea
taskInput.addEventListener("input", updateModeDisplay);

// Cargar frases y inicializar
loadFrases().then(() => {
  updateDisplay();
  updateModeDisplay();
  motivationalText.innerHTML = getRandomFrase();
});
