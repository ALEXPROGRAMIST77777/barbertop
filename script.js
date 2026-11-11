// ===== Loader =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 2200);
});

// ===== Services data =====
const services = [
  { icon: '✂', name: 'Мужская стрижка', desc: 'Классическая или современная стрижка с укладкой', price: '1 200', time: '40 мин', badge: 'ХИТ' },
  { icon: '🧔', name: 'Стрижка + борода', desc: 'Стрижка с моделированием и оформлением бороды', price: '1 800', time: '60 мин' },
  { icon: '🪒', name: 'Бритьё опасной бритвой', desc: 'Классическое бритьё горячим полотенцем', price: '1 000', time: '30 мин', badge: 'ПРЕМИУМ' },
  { icon: '🎨', name: 'Камуфляж седины', desc: 'Закрашивание седины профессиональными средствами', price: '800', time: '25 мин' },
  { icon: '👶', name: 'Детская стрижка', desc: 'Стрижка для самых маленьких королей до 10 лет', price: '700', time: '30 мин' },
  { icon: '💆', name: 'Уход для головы', desc: 'СПА-уход, массаж головы и маска для волос', price: '1 500', time: '45 мин' },
];

const servicesGrid = document.getElementById('servicesGrid');
services.forEach((s, i) => {
  const badge = s.badge ? `<span class="service-badge">${s.badge}</span>` : '';
  const card = document.createElement('div');
  card.className = 'service-card';
  card.innerHTML = `
    ${badge}
    <div class="service-icon">${s.icon}</div>
    <h3>${s.name}</h3>
    <p>${s.desc}</p>
    <div class="service-meta">
      <span class="service-price">${s.price} ₽</span>
      <span class="service-time">⏱ ${s.time}</span>
    </div>
  `;
  servicesGrid.appendChild(card);
});

// ===== Team data =====
const team = [
  { emoji: '👨‍🦰', name: 'Джонни', role: 'Топ-барбер', exp: '12 лет опыта', stars: '★★★★★' },
  { emoji: '👨', name: 'Макс', role: 'Барбер-стилист', exp: '8 лет опыта', stars: '★★★★★' },
  { emoji: '🧑', name: 'Алекс', role: 'Мастер бороды', exp: '6 лет опыта', stars: '★★★★☆' },
  { emoji: '👨‍🦱', name: 'Дэн', role: 'Барбер', exp: '5 лет опыта', stars: '★★★★★' },
];

const teamGrid = document.getElementById('teamGrid');
team.forEach((m, i) => {
  const card = document.createElement('div');
  card.className = 'team-card';
  card.innerHTML = `
    <div class="team-avatar"><span>${m.emoji}</span></div>
    <div class="team-body">
      <h3>${m.name}</h3>
      <p class="team-role">${m.role}</p>
      <p class="team-exp">${m.exp}</p>
      <p class="team-stars">${m.stars}</p>
    </div>
  `;
  teamGrid.appendChild(card);
});

// ===== Testimonials =====
const testimonials = [
  { stars: '★★★★★', text: 'Лучший барбершоп в городе! Джонни сделал стрижку мечты. Атмосфера — огонь, виски в подарок.', name: 'Игорь', date: 'Март 2024', emoji: '😎' },
  { stars: '★★★★★', text: 'Хожу только сюда уже два года. Всегда стабильно качественно, без очередей и с классной музыкой.', name: 'Артём', date: 'Февраль 2024', emoji: '🔥' },
  { stars: '★★★★★', text: 'Бороду оформили идеально. Опасная бритва — это ритуал! Ребята знают своё дело на 100%.', name: 'Сергей', date: 'Январь 2024', emoji: '💯' },
];

const testiGrid = document.getElementById('testiGrid');
testimonials.forEach(t => {
  const card = document.createElement('div');
  card.className = 'testi-card';
  card.innerHTML = `
    <div class="testi-stars">${t.stars}</div>
    <p class="testi-text">«${t.text}»</p>
    <div class="testi-author">
      <div class="testi-avatar">${t.emoji}</div>
      <div>
        <div class="testi-name">${t.name}</div>
        <div class="testi-date">${t.date}</div>
      </div>
    </div>
  `;
  testiGrid.appendChild(card);
});

// ===== Menu/Service/Team/Testi reveal observer =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in', 'show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up, .service-card, .team-card, .testi-card').forEach(el => revealObserver.observe(el));

// ===== Stagger service/team cards =====
document.querySelectorAll('.service-card, .team-card, .testi-card').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 80 + 'ms';
});

// ===== Navbar scroll + active link =====
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 60);
  backTop.classList.toggle('show', y > 500);
  let current = '';
  document.querySelectorAll('section[id]').forEach(sec => {
    if (y >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
});

// ===== Burger =====
const burger = document.getElementById('burger');
const navList = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navList.classList.toggle('open');
});
navLinks.forEach(link => link.addEventListener('click', () => {
  burger.classList.remove('open');
  navList.classList.remove('open');
}));

// ===== Back to top =====
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== Barber wink animation =====
const winkEye = document.getElementById('winkEye');
const openEye = document.getElementById('openEye');
function wink() {
  // eye is already winking (line), show open eye briefly then back
  if (openEye && winkEye) {
    winkEye.style.display = 'none';
    openEye.style.display = 'block';
    setTimeout(() => {
      openEye.style.display = 'none';
      winkEye.style.display = 'block';
    }, 200);
  }
}
setInterval(wink, 3500);

// ===== Animated counters =====
function animateCounter(el, target) {
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value.toLocaleString('ru-RU');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString('ru-RU') + (target >= 1000 ? '+' : '');
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

// ===== Particles =====
const particleContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + '%';
  p.style.bottom = Math.random() * 50 + '%';
  p.style.animationDelay = Math.random() * 8 + 's';
  p.style.animationDuration = (6 + Math.random() * 4) + 's';
  const size = 2 + Math.random() * 4;
  p.style.width = size + 'px';
  p.style.height = size + 'px';
  particleContainer.appendChild(p);
}

// ===== Contact form =====
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
form.addEventListener('submit', e => {
  e.preventDefault();
  form.style.display = 'none';
  success.classList.add('show');
  setTimeout(() => {
    form.style.display = 'flex';
    form.reset();
    success.classList.remove('show');
  }, 4000);
});
