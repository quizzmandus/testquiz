const audios = {
  q1: new Audio("sound\Question 1.mp3"),
  q2: new Audio("audio/q2.mp3"),
  q3: new Audio("audio/q3.mp3")
};

function stopAll() {
  Object.values(audios).forEach(a => {
    a.pause();
    a.currentTime = 0;
  });
  document.querySelectorAll('.disque').forEach(d => d.classList.remove('playing'));
}

function playQuestion(q, el) {
  stopAll();
  const audio = audios[q];
  audio.play();
  el.classList.add('playing');

  // indices
  document.getElementById("indice1").innerText = "Indice 1...";
  setTimeout(() => {
    document.getElementById("indice2").innerText = "Indice 2...";
  }, 5000);

  // réponse après 20s
  setTimeout(() => {
    document.getElementById("reponse").innerText = "Réponse !!!";
    if (navigator.vibrate) navigator.vibrate(200);
  }, 20000);
}
