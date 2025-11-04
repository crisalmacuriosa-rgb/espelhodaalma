// --- CONFIGURAÇÃO DAS PERGUNTAS ---
const questions = [
  "Sinto que preciso ajudar os outros, mesmo quando estou esgotado(a).",
  "Evito conflitos para manter a harmonia, mesmo que isso me machuque.",
  "Tenho medo de decepcionar as pessoas, então me esforço demais.",
  "Sinto que preciso estar no controle para tudo dar certo.",
  "Tenho dificuldade em pedir ajuda, mesmo quando preciso.",
  "Busco ser reconhecido(a) para me sentir com valor.",
  "Sinto que, se relaxar, algo ruim pode acontecer.",
  "Temo mostrar minha vulnerabilidade.",
  "Acredito que, para ser amado(a), preciso ser útil.",
  "Sinto que carrego a responsabilidade pelos outros.",
  "Tenho medo de errar e ser julgado(a).",
  "Sinto que minha paz depende do bem-estar alheio.",
  "É difícil me permitir descansar sem culpa.",
  "Quando algo dá errado, sinto que a culpa é minha.",
  "Tenho dificuldade em dizer não.",
  "Sinto que preciso estar sempre forte.",
  "Evito demonstrar fragilidade.",
  "Sinto que, se eu não estiver bem, todos desmoronam.",
  "Preciso sentir que sou importante para alguém.",
  "Tenho medo de ser deixado(a) de lado."
];

// --- EXIBIR PERGUNTAS NA TELA ---
const container = document.getElementById("quiz");
questions.forEach((q, i) => {
  const div = document.createElement("div");
  div.classList.add("question");
  div.innerHTML = `
    <p>${i + 1}. ${q}</p>
    <label><input type="radio" name="q${i}" value="1"> Discordo totalmente</label>
    <label><input type="radio" name="q${i}" value="2"> Discordo</label>
    <label><input type="radio" name="q${i}" value="3"> Neutro</label>
    <label><input type="radio" name="q${i}" value="4"> Concordo</label>
    <label><input type="radio" name="q${i}" value="5"> Concordo totalmente</label>
  `;
  container.appendChild(div);
});

// --- FUNÇÃO DE RESULTADO ---
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;
  const total = questions.length;

  for (let i = 0; i < total; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected) {
      score += parseInt(selected.value);
    }
  }

  const percent = (score / (total * 5)) * 100;
  let message = "";

  if (percent < 35)
    message = "🕯️ Você carrega marcas antigas, crenças moldadas pela necessidade de sobrevivência. Observe os padrões que se repetem: neles está o chamado para a cura.";
  else if (percent < 70)
    message = "🌗 Você está em processo de cura. Já reconhece suas sombras e está aprendendo a caminhar com elas, transformando-as em sabedoria.";
  else
    message = "🌞 Você vibra autenticidade e presença. O espelho da alma reflete tua essência liberta — és o centro sereno entre o sentir e o agir.";

  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = `<p>${message}</p>`;
});

// --- MÚSICA DE FUNDO ---
const music = new Audio("episode.mp3");
music.volume = 0.25;
music.loop = true;

document.addEventListener("click", () => {
  if (music.paused) {
    music.play();
  }
});
