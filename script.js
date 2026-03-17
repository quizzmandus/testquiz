const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");

const hint1 = document.getElementById("hint1");
const hint2 = document.getElementById("hint2");
const answer = document.getElementById("answer");

let timers = [];

const data = {
  hint1: "Artiste : Michael Jackson",
  hint2: "Année : 1982",
  answer: "Billie Jean"
};

function clearTimers() {
  timers.forEach(t => clearTimeout(t));
  timers = [];
}

playBtn.onclick = () => {
  audio.play();
  hint1.textContent = "";
  hint2.textContent = "";
  answer.textContent = "";
  clearTimers();

  timers.push(setTimeout(() => {
    hint1.textContent = "Indice 1 : " + data.hint1;
  }, 10000));

  timers.push(setTimeout(() => {
    hint2.textContent = "Indice 2 : " + data.hint2;
  }, 15000));

  timers.push(setTimeout(() => {
    answer.textContent = "Réponse : " + data.answer;
    if (navigator.vibrate) navigator.vibrate([200,100,200]);
  }, 20000));
};

pauseBtn.onclick = () => {
  audio.pause();
  clearTimers();
};
