const audios = Array.from({length:7},(_,i)=>new Audio('audio/q'+(i+1)+'.mp3'));

let current = 3;
let ctx, analyser, source;
let isPlaying = false;
let rotation = 0;
let isDragging = false;
let lastX = 0;

// AUDIO CONTEXT (visualizer)
function initAudio(audio){
  if(!ctx){
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  analyser = ctx.createAnalyser();
  analyser.fftSize = 64;

  source = ctx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(ctx.destination);
}

// PLAY
function playQ(i, el){
  stopAll();
  current = i;

  let audio = audios[i];
  initAudio(audio);

  audio.play();
  isPlaying = true;

  el.classList.add("playing");

  animateVinyl(el);
}

// STOP
function stopAll(){
  audios.forEach(a=>{
    a.pause();
    a.currentTime = 0;
  });

  document.querySelectorAll('.disque').forEach(d=>{
    d.classList.remove('playing');
  });

  isPlaying = false;
}

// 🎧 VISUALIZER + ROTATION
function animateVinyl(el){
  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  function loop(){
    if(!isPlaying) return;

    analyser.getByteFrequencyData(dataArray);

    let avg = dataArray.reduce((a,b)=>a+b,0)/dataArray.length;

    // vitesse rotation selon musique
    rotation += avg * 0.02;

    el.style.transform = `rotate(${rotation}deg)`;

    // effet lumière dynamique
    el.style.boxShadow = `
      0 0 ${avg/2}px rgba(255,255,255,0.2),
      inset 0 0 ${avg/3}px rgba(255,255,255,0.1)
    `;

    requestAnimationFrame(loop);
  }

  loop();
}

//////////////////////////////////////////////////
// 🖐️ SCRATCH EFFECT (drag)
//////////////////////////////////////////////////

document.addEventListener("pointerdown", e=>{
  isDragging = true;
  lastX = e.clientX;
});

document.addEventListener("pointermove", e=>{
  if(!isDragging) return;

  let delta = e.clientX - lastX;
  rotation += delta * 0.5;

  document.querySelectorAll('.disque.playing').forEach(d=>{
    d.style.transform = `rotate(${rotation}deg)`;
  });

  lastX = e.clientX;
});

document.addEventListener("pointerup", ()=>{
  isDragging = false;
});

//////////////////////////////////////////////////
// 👉 SWIPE CAROUSEL (inertie)
//////////////////////////////////////////////////

let startX = 0;
let scrollLeft = 0;
const carousel = document.querySelector(".arc-container");

if(carousel){
  carousel.addEventListener("pointerdown", e=>{
    startX = e.pageX;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("pointermove", e=>{
    if(e.buttons !== 1) return;
    let x = e.pageX;
    let walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollLeft - walk;
  });
}

//////////////////////////////////////////////////
// ⏱️ TIMER + INDICES
//////////////////////////////////////////////////

let t1,t2,t3;

function launchTimers(){
  clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);

  document.getElementById('i1').innerText='';
  document.getElementById('i2').innerText='';
  document.getElementById('reponse').innerText='';

  t1 = setTimeout(()=>{
    document.getElementById('i1').innerText="Indice 1";
  },10000);

  t2 = setTimeout(()=>{
    document.getElementById('i2').innerText="Indice 2";
  },15000);

  t3 = setTimeout(showAnswer,20000);
}

function showAnswer(){
  document.getElementById('reponse').innerText="Réponse !!!";

  if(navigator.vibrate){
    navigator.vibrate([200,100,200]);
  }
