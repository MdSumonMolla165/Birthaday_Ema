// Scroll-triggered entrance animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Soft floating particles in the background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let sparkleEnabled = true;
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  particles = Array.from({length: Math.min(55, Math.floor(innerWidth / 22))}, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    r: Math.random() * 1.8 + .4, speed: Math.random() * .35 + .12,
    phase: Math.random() * Math.PI * 2
  }));
}
function drawParticles() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  if (sparkleEnabled) {
    particles.forEach(p => {
      p.y -= p.speed;
      p.phase += .018;
      if (p.y < -5) { p.y = innerHeight + 5; p.x = Math.random() * innerWidth; }
      ctx.beginPath();
      ctx.arc(p.x + Math.sin(p.phase) * 5, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(238,184,201,.62)';
      ctx.fill();
    });
  }
  requestAnimationFrame(drawParticles);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); drawParticles();

// Toggle the subtle background sparkle layer
document.getElementById('sparkleToggle').addEventListener('click', (e) => {
  sparkleEnabled = !sparkleEnabled;
  e.currentTarget.querySelector('b').textContent = sparkleEnabled ? 'SPARKLES ON' : 'SPARKLES OFF';
});

// Pointer sparkle trail (desktop and touch)
let lastSparkle = 0;
function pointerSparkle(x, y) {
  if (!sparkleEnabled || Date.now() - lastSparkle < 65) return;
  lastSparkle = Date.now();
  const s = document.createElement('span');
  s.className = 'sparkle-particle';
  s.textContent = Math.random() > .5 ? '✧' : '·';
  s.style.left = x + 'px'; s.style.top = y + 'px';
  s.style.fontSize = (10 + Math.random() * 15) + 'px';
  s.style.setProperty('--dx', (Math.random() * 50 - 25) + 'px');
  s.style.setProperty('--dy', (-20 - Math.random() * 35) + 'px');
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 850);
}
window.addEventListener('pointermove', e => pointerSparkle(e.clientX, e.clientY), {passive:true});

// Birthday surprise: reveal the final note and release a shower of hearts
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseMessage = document.getElementById('surpriseMessage');
surpriseBtn.addEventListener('click', () => {
  surpriseMessage.classList.add('show');
  surpriseBtn.textContent = 'YOUR SURPRISE IS OPENED ♥';
  surpriseBtn.disabled = true;
  for (let i = 0; i < 42; i++) {
    setTimeout(() => {
      const heart = document.createElement('span');
      heart.className = 'falling-heart';
      heart.textContent = ['♥', '♡', '✧', '✿'][Math.floor(Math.random() * 4)];
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.fontSize = (14 + Math.random() * 20) + 'px';
      heart.style.animationDuration = (3.5 + Math.random() * 3) + 's';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 7000);
    }, i * 35);
  }
});
