// parte do menu do celular (abrir e fechar)
const menuBotao = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');

menuBotao.addEventListener('click', () => {
  const aberto = menu.classList.toggle('is-open');
  menuBotao.setAttribute('aria-expanded', aberto);
  menuBotao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});

// parte que fecha o menu ao clicar em um link
menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuBotao.setAttribute('aria-expanded', 'false');
    menuBotao.setAttribute('aria-label', 'Abrir menu');
  });
});

// parte que destaca no menu a seção que está aparecendo
const links = document.querySelectorAll('.nav a');
const secoes = [...links].map((l) => document.querySelector(l.getAttribute('href')));

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + entrada.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

secoes.forEach((s) => s && observador.observe(s));

// parte da animação de entrada dos blocos ao rolar a página
const animados = document.querySelectorAll('.about, .tech-card, .academic, .social__item, .section h2');
animados.forEach((el) => el.classList.add('reveal'));

const observadorAnimacao = new IntersectionObserver((entradas, obs) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('is-visible');
      obs.unobserve(entrada.target);
    }
  });
}, { threshold: 0.15 });

animados.forEach((el) => observadorAnimacao.observe(el));