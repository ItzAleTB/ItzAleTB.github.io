document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('miAudio');
  const playButton = document.getElementById('playButton');
  const container = document.querySelector('.container');
  const animContainer = document.getElementById('animaciones');
  const confettiContainer = document.getElementById('confetti-container');

  // Tipos de elementos flotantes con IMÁGENES PNG
  const elementTypes = [
    {
      name: 'heart',
      img: "https://cdn-icons-png.flaticon.com/512/833/833472.png", // Corazón rojo
      sizes: [30, 50]
    },
    {
      name: 'globo',
      img: "https://cdn-icons-png.flaticon.com/512/891/891010.png", // Globo rosado
      sizes: [40, 70]
    },
    {
      name: 'star',
      img: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", // Estrella amarilla
      sizes: [25, 45]
    },
    {
      name: 'flower',
      img: "https://cdn-icons-png.flaticon.com/512/16171/16171796.png", // Flor rosada
      sizes: [30, 60]
    }
  ];

  let animationInterval;

  function createFloatingElement() {
  const type = elementTypes[Math.floor(Math.random() * elementTypes.length)];
  const element = document.createElement('div');
  element.className = 'floating-element';
  
  // Crear elemento img
  const img = document.createElement('img');
  img.src = type.img;
  img.alt = type.name;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'contain';
  
  // Efecto de sombra para mejor visibilidad
  img.style.filter = 'drop-shadow(0 0 5px rgba(255,255,255,0.7))';
  
  element.appendChild(img);
  
  // Tamaño aleatorio
  const size = Math.random() * (type.sizes[1] - type.sizes[0]) + type.sizes[0];
  element.style.width = `${size}px`;
  element.style.height = `${size}px`;
  
  // Posición inicial aleatoria en toda la pantalla
  element.style.left = `${Math.random() * 100}vw`;
  element.style.top = `${Math.random() * 100}vh`;
  
  // Opacidad inicial
  element.style.opacity = '0';
  
  // Elegir aleatoriamente entre 4 tipos de animaciones diferentes
  const animationTypes = ['floatUp', 'floatDown', 'floatLeft', 'floatRight'];
  const selectedAnimation = animationTypes[Math.floor(Math.random() * animationTypes.length)];
  
  // Duración de animación aleatoria
  const duration = 3 + Math.random() * 4;
  
  // Aplicar animación
  element.style.animation = `${selectedAnimation} ${duration}s ease-in-out forwards`;
  
  animContainer.appendChild(element);
  
  // Eliminar después de la animación
  setTimeout(() => {
    element.remove();
  }, duration * 1000);
}

  // Crear confeti (se mantiene igual)
  function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Color aleatorio
    const colors = ['#ff4da6', '#ff85b8', '#ffb6c1', '#ffd5ec'];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Posición inicial
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = '-10px';
    
    // Tamaño aleatorio
    const size = 5 + Math.random() * 10;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    
    // Duración de animación
    const duration = 3 + Math.random() * 4;
    confetti.style.animationDuration = `${duration}s`;
    
    confettiContainer.appendChild(confetti);
    
    // Eliminar después de la animación
    setTimeout(() => {
      confetti.remove();
    }, duration * 1000);
  }

  // Evento del botón (se mantiene igual)
  playButton.addEventListener('click', function() {
  audio.play().catch(e => console.log("Error de audio:", e));
    
// Ocultar botón con animación
  playButton.style.transition = 'all 0.5s ease';
  playButton.style.opacity = '0';
  playButton.style.transform = 'translate(-50%, -50%) scale(0.5)';
  playButton.style.pointerEvents = 'none';
  
  setTimeout(() => {
    playButton.style.display = 'none';
    
    // Mostrar contenido
    container.style.display = 'block';
    document.body.classList.add('show-content');
    
    // Limpiar intervalo anterior si existe
    if (animationInterval) clearInterval(animationInterval);
    
    // Iniciar animaciones con diferentes ritmos
    animationInterval = setInterval(createFloatingElement, 250); // Más frecuente
    
    // También iniciar confeti si lo deseas (opcional)
    setInterval(createConfetti, 150);
  }, 500);
});
});