
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: '+=200%',
    scrub: 1,
    pin: true
  }
});

tl.to('.frame', {
    z: 450,
    ease: 'power2.in',
    duration: 1
  }, 0)
  .to('.bg', {
    scale: 1.15,
    duration: 1
  }, 0)
  .to('.hero-text', {
    opacity: 0,
    y: -60,
    duration: 0.35
  }, 0)
  .to('.scroll-hint', {
    opacity: 0,
    duration: 0.15
  }, 0)
  .to('.stage', {
    opacity: 0,
    duration: 0.3
  }, 0.7);


gsap.utils.toArray('.reveal').forEach(el => {
  gsap.from(el, {
    y: 40,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      toggleActions: 'play none none none'
    }
  });
});

document.querySelectorAll('.divider').forEach(sec => {

  const img = sec.querySelector('img');

  sec.insertAdjacentHTML('beforeend',
    '<div class="door left"></div><div class="door right"></div>');

  const left = sec.querySelector('.door.left');
  const right = sec.querySelector('.door.right');

  const h = sec.querySelector('.script');
  const text = h.textContent;

  h.setAttribute('aria-label', text);
  h.innerHTML = text.split('').map(c =>
    `<span aria-hidden="true" style="display:inline-block">${c === ' ' ? '&nbsp;' : c}</span>`
  ).join('');

  gsap.to(img, {
    yPercent: 12,
    ease: 'none',
    scrollTrigger: {
      trigger: sec,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: sec,
      start: 'top 60%',
      end: 'center 25%',
      scrub: 1
    }
  })

    .from(h.children, {
      rotationX: -90,
      y: 40,
      opacity: 0,
      transformOrigin: '50% 100%',
      stagger: 0.05,
      duration: 0.5,
      ease: 'back.out(1.6)'
    }, 0)
    .to(left, {
      rotationY: -95,
      ease: 'power2.inOut',
      duration: 1
    }, 1)
    .to(right, {
      rotationY: 95,
      ease: 'power2.inOut',
      duration: 1
    }, 1);
});