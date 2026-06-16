const themeButton = document.querySelector('#themeButton');
const currentYear = document.querySelector('#currentYear');
const revealCards = document.querySelectorAll('.reveal');

// Coloca automáticamente el año actual en el pie de página.
currentYear.textContent = new Date().getFullYear();

// Cambia entre tema claro y tema oscuro.
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  const darkModeIsActive = document.body.classList.contains('dark-theme');

  themeButton.textContent = darkModeIsActive ? '☀️' : '🌙';

  themeButton.setAttribute(
    'aria-label',
    darkModeIsActive ? 'Activar tema claro' : 'Activar tema oscuro'
  );
});

// Muestra las tarjetas cuando aparecen en pantalla.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2
  }
);

revealCards.forEach((card) => {
  observer.observe(card);
});