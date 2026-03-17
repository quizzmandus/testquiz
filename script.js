const questions = [
  {color:"#6ec6ff", audio:"assets/q1.mp3", hints:["Indice 1A","Indice 1B"], answer:"Réponse 1"},
  {color:"#1976d2", audio:"assets/q2.mp3", hints:["Indice 2A","Indice 2B"], answer:"Réponse 2"},
  {color:"#ff80ab", audio:"assets/q3.mp3", hints:["Indice 3A","Indice 3B"], answer:"Réponse 3"},
  {color:"#d32f2f", audio:"assets/q4.mp3", hints:["Indice 4A","Indice 4B"], answer:"Réponse 4"},
  {color:"#ff9800", audio:"assets/q5.mp3", hints:["Indice 5A","Indice 5B"], answer:"Réponse 5"},
  {color:"#4caf50", audio:"assets/q6.mp3", hints:["Indice 6A","Indice 6B"], answer:"Réponse 6"},
  {color:"#ffeb3b", audio:"assets/q7.mp3", hints:["Indice 7A","Indice 7B"], answer:"Réponse 7"},
];

let current = 0;
let timer;
let audio;

const carousel = document.getElementById("carousel");

function render() {
  carousel.innerHTML = "";

  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "vinyl";
    div.style.background = q.color;

    let offset = i - current;
    div.style.transform = `translateX(${offset * 220}px) scale(${i === current ? 1.2 : 0.8})`;
    div.style.opacity = i === current ? 1 : 0.5;

   div.innerHTML = `
  <div class="label">Question N°${i+1}</div>
  <button onclick="toggleAudio(${i})">▶</button>
  <div class="wave" id="wave${i}" style="display:none;"></div>
`;

    carousel.appendChild(div);
  });
}

function startTimer() {
  let time = 0;

  document.getElementById("hint1").textContent = "";
  document.getElementById("hint2").textContent = "";
  document.getElementById("answer").textContent = "";

  timer = setInterval(() => {
    time++;

    if(time === 10){
      document.getElementById("hint1").textContent = questions[current].hints[0];
    }
    if(time === 15){
      document.getElementById("hint2").textContent = questions[current].hints[1];
    }
    if(time === 20){
      document.getElementById("answer").textContent = questions[current].answer;
      navigator.vibrate(500);
      clearInterval(timer);
    }
  },1000);
}

function toggleAudio(i){
  if(audio) audio.pause();

  audio = new Audio(questions[i].audio);
  audio.play();

  document.querySelectorAll(".wave").forEach(w => w.style.display="none");
  document.getElementById("wave"+i).style.display="block";
}

document.getElementById("next").onclick = () => {
  current = (current + 1) % questions.length;
  render();
  startTimer();
};

document.getElementById("showAnswer").onclick = () => {
  document.getElementById("answer").textContent = questions[current].answer;
};

let startX = 0;

carousel.addEventListener("touchstart", e => startX = e.touches[0].clientX);
carousel.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if(startX - endX > 50) current++;
  if(endX - startX > 50) current--;
  if(current < 0) current = questions.length -1;
  if(current >= questions.length) current = 0;

  render();
  startTimer();
});

render();
startTimer();
