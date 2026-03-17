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
    audio: "Question 1.mp3",
    hint1: "Dans le titre",
    hint2: "Pluie",
    answer: "Parapluie"
  },
  {
    audio: "Question 2.mp3",
    hint1: "Boxe",
    hint2: "Mains",
    answer: "Gants"
  },
   {
    audio: "Question 3.mp3",
    hint1: "Dans le titre",
    hint2: "Elle est noire",
    answer: "Chemise"
  },
   {
    audio: "Question 4.mp3",
    hint1: "Dans le titre ",
    hint2: "Cité au début de la chanson",
    answer: "Basket (Adidas)"
  },
   {
    audio: "Question 5.mp3",
    hint1: "Dans le titre",
    hint2: "Marine",
    answer: "Pull"
  },
   {
    audio: "Question 6.mp3",
    hint1: "Dans le titre",
    hint2: "Emma Peel",
    answer: "chapeau ou bottes"
  },
   {
    audio: "Question 7.mp3",
    hint1: "Eric Cartman",
    hint2: "Sur la tête",
    answer: "Bonnet"
  },
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

  // reset
  audio.pause();
  audio.currentTime = 0;

  progressBar.value = 0;
  currentTimeEl.textContent = "0:00";
  durationEl.textContent = "0:00";

  clearTimers();
}

// ▶️ PLAY
playBtn.onclick = () => {
  const q = questions[current];

  audio.play();
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

// ⏸ PAUSE
pauseBtn.onclick = () => {
  audio.pause();
  clearTimers();
};

// ➡️ NEXT
nextBtn.onclick = () => {
  current++;

  if (current >= questions.length) {
    alert("Fin du quiz 🎉");
    current = 0;
  }

  loadQuestion();
};

// 🎵 PROGRESSION
audio.addEventListener("timeupdate", () => {
  const progress = audio.duration 
    ? (audio.currentTime / audio.duration) * 100 
    : 0;

  progressBar.value = progress;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

// 🎚 SLIDER
progressBar.addEventListener("input", () => {
  if (!audio.duration) return;

  const time = (progressBar.value / 100) * audio.duration;
  audio.currentTime = time;
});

// ⏱ FORMAT
function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// INIT
loadQuestion();
