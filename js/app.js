// ── HAMBURGER ──
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ── ACCORDION ──
function toggleAcc(header) {
  const body = header.nextElementSibling;
  const isOpen = header.classList.contains('open');
  // close all
  document.querySelectorAll('.acc-header').forEach(h => h.classList.remove('open'));
  document.querySelectorAll('.acc-body').forEach(b => b.classList.remove('show'));
  if (!isOpen) {
    header.classList.add('open');
    body.classList.add('show');
  }
}

// ── FAQ ──
function toggleFaq(item) {
  item.classList.toggle('open');
}

// ── REGISTRATION TYPE SELECTOR ──
function showRegType(type) {
  document.querySelectorAll('.reg-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('reg-' + type).classList.add('active');
  event.target.classList.add('active');
}

// ── CONTRIBUTION CALCULATOR ──
function calcContrib() {
  const type = document.getElementById('calcType').value;
  const salaryGroup = document.getElementById('salaryGroup');
  const salaryInput = document.getElementById('salaryInput');

  if (type === 'ofw-land') {
    salaryGroup.style.opacity = '0.4';
    salaryGroup.style.pointerEvents = 'none';
    document.getElementById('res-total').textContent = '₱500';
    document.getElementById('res-yours').textContent = '₱500';
    document.getElementById('res-employer').textContent = '—';
    document.getElementById('res-annual').textContent = '₱6,000';
    document.querySelector('#calcResults .calc-result-box:nth-child(3) .label').textContent = 'Manning Agency';
    return;
  }

  salaryGroup.style.opacity = '1';
  salaryGroup.style.pointerEvents = 'auto';
  document.querySelector('#calcResults .calc-result-box:nth-child(3) .label').textContent = type === 'employed' ? 'Employer Bayad' : 'Employer Bayad';

  const salary = parseFloat(salaryInput.value) || 0;
  if (salary <= 0) {
    ['res-total','res-yours','res-employer','res-annual'].forEach(id => document.getElementById(id).textContent = '—');
    return;
  }

  // Apply floor/ceiling
  const effectiveSalary = Math.max(10000, Math.min(salary, 100000));
  const total = effectiveSalary * 0.05;
  const annual = total * 12;

  let yours, employer;
  if (type === 'employed') {
    yours = total / 2;
    employer = total / 2;
  } else {
    yours = total;
    employer = 0;
  }

  const fmt = (n) => '₱' + Math.round(n).toLocaleString();
  document.getElementById('res-total').textContent = fmt(total);
  document.getElementById('res-yours').textContent = fmt(yours);
  document.getElementById('res-employer').textContent = employer > 0 ? fmt(employer) : '—';
  document.getElementById('res-annual').textContent = fmt(annual);
}

// ── SCROLL FADE-IN ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── ACTIVE TAB ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const tabLinks = document.querySelectorAll('.tab-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  tabLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});