
const gal = document.getElementById('gallery');

for (let i = 1; i <= 9; i++) {
  const im = new Image();
  im.src = `asset/images/gallery/galerry${i}.jpg`;
  im.alt = `Galeri ${i}`;
  im.loading = 'lazy';
  gal.appendChild(im);
}

const lb = document.getElementById('lightbox');

gal.addEventListener('click', e => {
  if (e.target.tagName === 'IMG') {
    lb.querySelector('img').src = e.target.src;
    lb.classList.add('open');
  }
});

lb.addEventListener('click', () => {
  lb.classList.remove('open');
});


const bgm = document.getElementById('bgm');
const btn = document.getElementById('musicBtn');

function setOn(on) {
  btn.classList.toggle('on', on);
}

btn.addEventListener('click', e => {
  e.stopPropagation();

  if (bgm.paused) {
    bgm.play().then(() => setOn(true));
  } else {
    bgm.pause();
    setOn(false);
  }
});

['pointerdown', 'wheel', 'touchstart'].forEach(ev => {
  addEventListener(ev, () => {
    if (bgm.paused && !bgm.dataset.tried) {
      bgm.dataset.tried = 1;
      bgm.play().then(() => setOn(true)).catch(() => {});
    }
  }, { once: true, passive: true });
});

document.getElementById('rsvp').href =
  'https://wa.me/6282136648010?text=' +
  encodeURIComponent('Halo, saya ingin konfirmasi kehadiran.\nNama: \nJumlah tamu: \nHadir/Tidak hadir: ');

const cv = document.getElementById('petals');
const c = cv.getContext('2d');

function fit() {
  cv.width = innerWidth;
  cv.height = innerHeight;
}

fit();
addEventListener('resize', fit);

const P = Array.from({ length: 28 }, () => ({
  x: Math.random() * innerWidth,
  y: Math.random() * innerHeight,
  z: Math.random(),
  r: Math.random() * 6.28,
  s: Math.random() * .02 + .01
}));

(function loop() {
  c.clearRect(0, 0, cv.width, cv.height);

  P.forEach(p => {
    p.y += .4 + p.z * 1.6;
    p.x += Math.sin(p.y * .01 + p.r) * .6;
    p.r += p.s;

    if (p.y > cv.height + 20) {
      p.y = -20;
      p.x = Math.random() * cv.width;
    }

    const sz = 4 + p.z * 12;

    c.save();
    c.translate(p.x, p.y);
    c.rotate(p.r);
    c.scale(1, Math.abs(Math.cos(p.r * 1.3)) + .3);
    c.globalAlpha = .35 + p.z * .4;
    c.filter = `blur(${p.z > .8 ? 3 : 0}px)`;
    c.fillStyle = '#A9C4EB';
    c.beginPath();
    c.ellipse(0, 0, sz, sz * .55, 0, 0, 6.28);
    c.fill();
    c.restore();
  });

  requestAnimationFrame(loop);
})();