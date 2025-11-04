// 🌙 Espelho da Alma - script.js
// Música de fundo
window.addEventListener("DOMContentLoaded", () => {
  const music = new Audio("episode.mp3");
  music.loop = true;
  music.volume = 0.25;

  // Toca automaticamente após interação (regras do navegador)
  const playMusic = () => {
    music.play().catch(() => {});
    document.removeEventListener("click", playMusic);
  };
  document.addEventListener("click", playMusic);
});

// 🌟 Estrutura das perguntas (enxugadas e equilibradas)
const questions = [
  // Pacificador
  {
    text: "Você evita conflitos mesmo quando sente que deveria se posicionar?",
    archetype: "O Pacificador"
  },
  {
    text: "Sente que é responsável por manter a harmonia emocional nas relações?",
    archetype: "O Pacificador"
  },

  // Salvador
  {
    text: "Você sente que precisa consertar ou salvar os outros, mesmo às custas de si?",
    archetype: "O Salvador"
  },
  {
    text: "Tem dificuldade em aceitar ajuda, sentindo que deve ser o forte?",
    archetype: "O Salvador"
  },

  // Autoanulação
  {
    text: "Frequentemente abre mão de desejos próprios para agradar os outros?",
    archetype: "A Autoanulação"
  },
  {
    text: "Sente culpa quando escolhe por si mesmo?",
    archetype: "A Autoanulação"
  },

  // Ferida da Bruxa
  {
    text: "Você sente que expressar sua força ou sabedoria pode gerar rejeição?",
    archetype: "A Ferida da Bruxa"
  },
  {
    text: "Tem medo de ser mal interpretado quando expressa seu poder pessoal?",
    archetype: "A Ferida da Bruxa"
  },

  // Dependência emocional
  {
    text: "Sente medo de ficar só ou de ser abandonado?",
    archetype: "O Prisioneiro do Vínculo"
  },
  {
    text: "Faz concessões dolorosas para não perder alguém?",
    archetype: "O Prisioneiro do Vínculo"
  },

  // Amor condicional
  {
    text: "Acredita que precisa ser perfeito para ser amado?",
    archetype: "O Amor Condicional"
  },
  {
    text: "Sente que só é valorizado quando é útil?",
    archetype: "O Amor Condicional"
  },

  // Vulnerabilidade negada
  {
    text: "Você evita demonstrar fragilidade por medo de parecer fraco?",
    archetype: "A Vulnerabilidade Negada"
  },
  {
    text: "Prefere se isolar a pedir ajuda?",
    archetype: "A Vulnerabilidade Negada"
  },

  // Independência punida
  {
    text: "Tem medo de que, ao se destacar, será criticado ou rejeitado?",
    archetype: "A Independência Punida"
  },
  {
    text: "Já sentiu que ser autêntico traz punição ou afastamento?",
    archetype: "A Independência Punida"
  }
];

// Gera as perguntas no HTML
const form = document.getElementById("quiz");

questions.forEach((q, index) => {
  const div = document.createElement("div");
  div.classList.add("question");
  div.innerHTML = `
    <p>${index + 1}. ${q.text}</p>
    <label><input type="radio" name="q${index}" value="1"> Discordo totalmente</label>
    <label><input type="radio" name="q${index}" value="2"> Discordo parcialmente</label>
    <label><input type="radio" name="q${index}" value="3"> Neutro</label>
    <label><input type="radio" name="q${index}" value="4"> Concordo parcialmente</label>
    <label><input type="radio" name="q${index}" value="5"> Concordo totalmente</label>
  `;
  form.appendChild(div);
});

// Botão de envio
const submitBtn = document.createElement("button");
submitBtn.textContent = "Revelar espelho";
submitBtn.classList.add("submit-btn");
form.appendChild(submitBtn);

// Cálculo e resultado
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const scores = {};
  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected) {
      if (!scores[q.archetype]) scores[q.archetype] = 0;
      scores[q.archetype] += parseInt(selected.value);
    }
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top = sorted[0];
  const archetype = top ? top[0] : "A Sombra Inconsciente";

  let message = "";

  switch (archetype) {
    case "O Pacificador":
      message = "Você busca harmonia, mas às vezes silencia sua verdade. A cura nasce quando sua voz encontra coragem.";
      break;
    case "O Salvador":
      message = "Seu coração deseja aliviar o peso do outro. Mas a verdadeira compaixão começa em si mesmo.";
      break;
    case "A Autoanulação":
      message = "Você se doa até se perder. O reencontro começa quando diz 'sim' à própria vontade.";
      break;
    case "A Ferida da Bruxa":
      message = "Seu poder foi mal interpretado. A cura acontece quando você honra sua sabedoria sem medo.";
      break;
    case "O Prisioneiro do Vínculo":
      message = "Você confunde amor com sobrevivência. Libertar-se é confiar que estar só também é estar inteiro.";
      break;
    case "O Amor Condicional":
      message = "Você aprendeu que o amor precisa ser merecido. Mas o amor verdadeiro não pede prova, apenas presença.";
      break;
    case "A Vulnerabilidade Negada":
      message = "Você ergueu muralhas para se proteger. Mas a alma floresce quando as lágrimas encontram o chão.";
      break;
    case "A Independência Punida":
      message = "Você teme brilhar demais. Mas a sua luz não humilha — ela inspira.";
      break;
    default:
      message = "O espelho se cala, aguardando que você o encare com sinceridade.";
  }

  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = `
    <h2>${archetype}</h2>
    <p>${message}</p>
  `;

  window.scrollTo({ top: resultDiv.offsetTop, behavior: "smooth" });
});
