const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const nextBtn = document.getElementById("nextBtn");

const hint1 = document.getElementById("hint1");
const hint2 = document.getElementById("hint2");
const answer = document.getElementById("answer");
const question = document.getElementById("question");

let timers = [];
let current = 0;

const questions = [
  {
    audio: "music1.mp3",
    hint1: "Artiste : Michael Jackson",
    hint2: "Année : 1982",
    answer: "Billie Jean"
  },
  {
    audio: "music2.mp3",
    hint1: "Groupe : Nirvana",
    hint2: "Année : 1991",
    answer: "Smells Like Teen Spirit"
  }
];

function clearTimers() {
  timers.forEach(t => clearTimeout(t));
  timers = [];
}

function loadQuestion() {
  const q = questions[current];

  audio.src = q.audio;
  question.textContent = "Question " + (current + 1);

  hint1.textContent = "";
  hint2.textContent = "";
  answer.textContent = "";

  clearTimers();
}

playBtn.onclick = () => {
  audio.play();
  const q = questions[current];

  clearTimers();

  timers.push(setTimeout(() => {
    hint1.textContent = "Indice 1 : " + q.hint1;
  }, 10000));

  timers.push(setTimeout(() => {
    hint2.textContent = "Indice 2 : " + q.hint2;
  }, 15000));

  timers.push(setTimeout(() => {
    answer.textContent = "Réponse : " + q.answer;

    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  }, 20000));
};

pauseBtn.onclick = () => {
  audio.pause();
  clearTimers();
};

nextBtn.onclick = () => {
  audio.pause();
  current++;

  if (current >= questions.length) {
    alert("Fin du quiz 🎉");
    current = 0;

  loadQuestion();
};

loadQuestion();
  audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress || 0;

  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

progressBar.addEventListener("input", () => {
  const time = (progressBar.value / 100) * audio.duration;
  audio.currentTime = time;
});

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}
