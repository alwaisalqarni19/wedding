
(function () {

  const target = new Date('2026-12-12T08:00:00+07:00').getTime();

  const DETIK = 1000;
  const MENIT = 60 * DETIK;
  const JAM = 60 * MENIT;
  const HARI = 24 * JAM;

  function el(id) {
    return document.getElementById(id);
  }

  function tick() {
    const sisa = Math.max(0, target - Date.now());

    el('cd-d').textContent = Math.floor(sisa / HARI);
    el('cd-h').textContent = Math.floor(sisa % HARI / JAM);
    el('cd-m').textContent = Math.floor(sisa % JAM / MENIT);
    el('cd-s').textContent = Math.floor(sisa % MENIT / DETIK);
  }

  tick();
  setInterval(tick, 1000);

})();