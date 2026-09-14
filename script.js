const header = document.getElementById('siteHeader');
const progress = document.getElementById('progressBar');
const backTop = document.getElementById('backTop');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
  header.classList.toggle('scrolled', y > 40);
  backTop.classList.toggle('show', y > 600);
});

menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:0.12});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const people = {
  morazan: {
    kicker: 'PRÓCER · FRANCISCO MORAZÁN', icon: 'FM', title: 'Francisco Morazán',
    text: 'Francisco Morazán fue una de las figuras políticas y militares más influyentes de Centroamérica durante el siglo XIX. Defendió la idea de una Centroamérica unida y participó activamente en la vida política de la región.'
  },
  valle: {
    kicker: 'PRÓCER · JOSÉ CECILIO DEL VALLE', icon: 'JCV', title: 'José Cecilio del Valle',
    text: 'José Cecilio del Valle fue un importante intelectual y funcionario centroamericano. Es reconocido por su participación en la redacción del Acta de Independencia de 1821 y por sus aportes al pensamiento político de la época.'
  },
  herrera: {
    kicker: 'PRÓCER · DIONISIO DE HERRERA', icon: 'DH', title: 'Dionisio de Herrera',
    text: 'Dionisio de Herrera fue una figura clave de los primeros años de la vida independiente. Fue el primer Jefe de Estado de Honduras y participó en la organización institucional del país.'
  },
  cabanas: {
    kicker: 'PRÓCER · JOSÉ TRINIDAD CABAÑAS', icon: 'JTC', title: 'José Trinidad Cabañas',
    text: 'José Trinidad Cabañas fue militar, político y presidente de Honduras. Es recordado por sus ideales republicanos y por su vínculo político y militar con Francisco Morazán.'
  },
  lempira: {
    kicker: 'HÉROE NACIONAL · LEMPIRA', icon: 'L', title: 'Lempira',
    text: 'Lempira es un símbolo de resistencia indígena y una de las figuras más representativas de la historia hondureña. Su nombre permanece ligado al pueblo lenca y a la defensa del territorio frente a la conquista.'
  }
};

const modal = document.getElementById('personModal');
const modalKicker = document.getElementById('modalKicker');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');

document.querySelectorAll('.hero-card[data-person]').forEach(card => {
  card.addEventListener('click', () => {
    const person = people[card.dataset.person];
    modalKicker.textContent = person.kicker;
    modalIcon.textContent = person.icon;
    modalTitle.textContent = person.title;
    modalText.textContent = person.text;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Parallax sutil en la portada: se desactiva en móviles.
if (window.matchMedia('(min-width: 801px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    const sky = document.querySelector('.hero-sky');
    const y = Math.min(window.scrollY, window.innerHeight);
    if (hero) hero.style.transform = `translateY(${y * 0.08}px)`;
    if (sky) sky.style.transform = `translateY(${y * 0.12}px) scale(1.03)`;
  }, {passive:true});
}
