const audios = Array.from({length:7},(_,i)=>new Audio('audio/q'+(i+1)+'.mp3'));

let current = 3;
let timer1, timer2, timer3;

function stopAll(){
  audios.forEach(a=>{
    a.pause();
    a.currentTime = 0;
  });

  document.querySelectorAll('.disque').forEach(d=>{
    d.classList.remove('playing');
  });

  clearTimeout(timer1);
  clearTimeout(timer2);
  clearTimeout(timer3);
}

function playQ(i, el){
  stopAll();
  current = i;

  let audio = audios[i];
  audio.play();

  el.classList.add('playing');

  document.getElementById('i1').innerText='';
  document.getElementById('i2').innerText='';
  document.getElementById('reponse').innerText='';

  timer1 = setTimeout(()=>{
    document.getElementById('i1').innerText = "Indice 1";
  },10000);

  timer2 = setTimeout(()=>{
    document.getElementById('i2').innerText = "Indice 2";
  },15000);

  timer3 = setTimeout(showAnswer,20000);
}

function showAnswer(){
  document.getElementById('reponse').innerText = "Réponse !!!";

  if(navigator.vibrate){
    navigator.vibrate([200,100,200]);
  }
}

function nextQ(){
  let next = (current + 1) % 7;
  let el = document.querySelectorAll('.disque')[next];
  playQ(next, el);
}
