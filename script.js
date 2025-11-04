// --- PERGUNTAS POR ARQUÉTIPO ---
const archetypes = {
  salvador: {
    nome: "💫 O Salvador",
    perguntas: [
      "Sinto que preciso ajudar os outros, mesmo quando estou esgotado(a).",
      "Acredito que, para ser amado(a), preciso ser útil.",
      "Tenho medo de decepcionar as pessoas, então me esforço demais.",
      "Sinto que carrego a responsabilidade pelos outros."
    ]
  },
  pacificador: {
    nome: "🌿 O Pacificador",
    perguntas: [
      "Evito conflitos para manter a harmonia, mesmo que isso me machuque.",
      "Sinto que minha paz depende do bem-estar alheio.",
      "Tenho dificuldade em dizer não.",
      "Prefiro ceder do que lidar com tensão ou desagrado."
    ]
  },
  controlador: {
    nome: "🔥 O Guardião do Controle",
    perguntas: [
      "Sinto que preciso estar no controle para tudo dar certo.",
      "Tenho medo de errar e ser julgado(a).",
      "Sinto que, se eu não estiver bem, todos desmoronam.",
      "É difícil relaxar e confiar que as coisas darão certo."
    ]
  },
  dependente: {
    nome: "💔 O Prisioneiro do Vínculo",
    perguntas: [
      "Preciso sentir que sou importante para alguém.",
      "Tenho medo de ser deixado(a) de lado.",
      "Sinto ansiedade quando alguém se afasta de mim.",
      "Tenho dificuldade em ficar só comigo mesmo(a)."
    ]
  },
  forte: {
    nome: "🜂 O Forte Inquebrável",
    perguntas: [
      "Sinto que preciso estar sempre forte.",
      "Evito demonstrar fragilidade.",
      "Tenho dificuldade em pedir ajuda, mesmo quando preciso.",
      "Ser vulnerável me causa desconforto."
    ]
  }
};

// --- MONTA O QUESTIONÁRIO ---
const container = document.getElementById("quiz");
let allQuestions = [];
for (const key in archetypes) {
  archetypes[key].perguntas.forEach((p) => {
    allQuestions.push({ arquetipo: key, texto: p });
  });
}

allQuestions.forEach((q, i) => {
  const div = document.createElement("div");
  div.classList.add("question");
  div.innerHTML = `
    <p>${i + 1}. ${q.texto}</p>
    <label><input type="radio" name="q${i}" value="1"> Discordo totalmente</label>
    <label><input type="radio" name="q${i}" value="2"> Discordo</label>
    <label><input type="radio" name="q${i}" value="3"> Neutro</label>
    <label><input type="radio" name="q${i}" value="4"> Concordo</label>
    <label><input type="radio" name="q${i}" value="5"> Concordo totalmente</label>
  `;
  container.appendChild(div);
});

// --- AVALIA RESULTADO ---
document.getElementById("submit").addEventListener("click", () => {
  const scores = {};
  for (const key in archetypes) scores[key] = 0;

  allQuestions.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected) scores[q.arquetipo] += parseInt(selected.value);
  });

  // Identifica o arquétipo mais alto
  let winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

  const arq = archetypes[winner];
  const mensagens = {
    salvador:
      "O Salvador busca redenção ajudando o outro — mas a alma pede que ele se salve também. A cura nasce quando o amor se oferece sem peso.",
    pacificador:
      "O Pacificador teme o caos, mas o verdadeiro equilíbrio vem do encontro entre opostos. A tua voz é também um instrumento de paz.",
    controlador:
      "O Guardião do Controle acredita proteger, mas aprisiona o fluxo da vida. Quando o controle se rende à confiança, nasce o poder autêntico.",
    dependente:
      "O Prisioneiro do Vínculo busca amor como oxigênio. Mas o amor verdadeiro floresce quando há espaço para respirar.",
    forte:
      "O Forte Inquebrável ergue muralhas para sobreviver. No entanto, a força mais bela é a que se permite sentir."
  };

  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = `
    <h2>${arq.nome}</h2>
    <p>${mensagens[winner]}</p>
  `;
});

// --- MÚSICA DE FUNDO ---
const music = new Audio("episode.mp3");
music.volume = 0.3;
music.loop = true;
document.addEventListener("click", () => {
  if (music.paused) music.play();
});
