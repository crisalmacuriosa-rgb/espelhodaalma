document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    // Salvador / Pacificador / Controlador / Dependência
    "Sinto que é minha responsabilidade manter todos bem ao meu redor.",
    "Tenho dificuldade em dizer 'não', mesmo quando quero.",
    "Prefiro me calar a entrar em conflito.",
    "Sinto culpa ao priorizar minhas próprias necessidades.",
    "Tenho medo de ser rejeitado se mostrar minha vulnerabilidade.",
    "Costumo assumir responsabilidades que não são minhas.",
    "Tenho medo de que, se eu não ajudar, algo dê errado.",
    "Sinto-me perdido quando não estou cuidando de alguém.",
    "Preciso provar constantemente que sou útil.",
    "Evito decisões para não desagradar.",
    "Sinto que, se eu me destacar, posso ser criticado ou atacado.",
    "Acredito que, se eu amar o suficiente, serei amado de volta.",
    "Tenho medo de ficar só e acabar sendo esquecido.",
    "Sinto que dependo emocionalmente de alguém para me sentir inteiro.",
    "Tenho dificuldade em me sentir digno de amor sem estar servindo alguém.",
    // Ferida da Bruxa / Amor Condicional
    "Sinto que minha força incomoda os outros.",
    "Já me diminuí para não gerar inveja ou confronto.",
    "Acredito que, se eu mostrar quem sou, posso ser punido.",
    "Sinto que minha independência pode afastar quem amo.",
    "Tenho medo de ser visto como egoísta quando me coloco em primeiro lugar."
  ];

  const container = document.getElementById("questions");

  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.classList.add("question");
    div.innerHTML = `
      <p>${i + 1}. ${q}</p>
      <label><input type="radio" name="q${i}" value="1"> Nunca</label>
      <label><input type="radio" name="q${i}" value="2"> Raramente</label>
      <label><input type="radio" name="q${i}" value="3"> Às vezes</label>
      <label><input type="radio" name="q${i}" value="4"> Frequentemente</label>
      <label><input type="radio" name="q${i}" value="5"> Sempre</label>
    `;
    container.appendChild(div);
  });

  const form = document.getElementById("quiz-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    let total = 0;
    for (let value of data.values()) total += Number(value);
    const percent = (total / (questions.length * 5)) * 100;

    let message = "";
    if (percent < 35)
      message = "Há partes de você que ainda buscam reconhecimento e acolhimento. Observe o que se repete — cada sombra é um convite à luz.";
    else if (percent < 70)
      message = "Você está se tornando consciente das suas feridas e padrões. Já há luz suficiente para caminhar com mais leveza.";
    else
      message = "O espelho te devolve presença e autenticidade. O amor que antes buscava fora, agora começa a florescer dentro.";

    const result = document.getElementById("result");
    result.classList.remove("hidden");
    result.innerHTML = `<p>${message}</p>`;
  });

  // 🎵 Música de fundo
  const music = document.getElementById("bg-music");
  if (music) {
    music.volume = 0.25;
    const playMusic = () => {
      music.play().catch(() => {});
      document.removeEventListener("click", playMusic);
    };
    playMusic();
    document.addEventListener("click", playMusic);
  }
});

