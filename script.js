document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // LOADER
  // =========================
  const loader = document.getElementById("loader");

  if (loader) {
    window.addEventListener("load", () => {
      loader.style.opacity = "0";

      setTimeout(() => {
        loader.style.display = "none";
      }, 300);
    });
  }

  // =========================
  // MENU MOBILE
  // =========================
  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.querySelector("nav ul");

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      menu.classList.toggle("ativo");
    });

    document.querySelectorAll("nav a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("ativo");
      });
    });
  }

  // =========================
  // SCROLL REVEAL
  // =========================
  if (typeof ScrollReveal !== "undefined") {
    ScrollReveal().reveal(".reveal", {
      delay: 200,
      distance: "50px",
      origin: "bottom",
      interval: 100,
      duration: 800
    });
  }

  // =========================
  // BOTÃO TOPO
  // =========================
  const topBtn = document.getElementById("topBtn");

  if (topBtn) {
    window.addEventListener("scroll", () => {
      topBtn.style.display =
        window.scrollY > 300 ? "block" : "none";
    });

    topBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // =========================
  // CONTADORES
  // =========================
  const counters =
    document.querySelectorAll(".counter");

  if (counters.length > 0) {

    const animateCounter = counter => {

      const target =
        Number(counter.getAttribute("data-target"));

      let count = 0;

      const update = () => {

        const increment = target / 100;

        if (count < target) {
          count += increment;

          counter.innerText =
            Math.ceil(count);

          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };

      update();
    };

    const observer =
      new IntersectionObserver(entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            animateCounter(entry.target);

            observer.unobserve(entry.target);
          }
        });

      });

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  // =========================
  // QUIZ AGRINHO
  // =========================

  const perguntasQuiz = [
    {
      pergunta: "Quanto da água doce do mundo é usada na agricultura?",
      opcoes: ["30%", "50%", "70%", "90%"],
      correta: 2
    },
    {
      pergunta: "Qual tecnologia ajuda a reduzir desperdício de água no campo?",
      opcoes: [
        "Trator",
        "Irrigação automatizada",
        "Colheitadeira",
        "Arado"
      ],
      correta: 1
    },
    {
      pergunta: "O que é agricultura sustentável?",
      opcoes: [
        "Usar mais agrotóxicos",
        "Produzir sem se preocupar com o meio ambiente",
        "Produzir alimentos preservando recursos naturais",
        "Plantar apenas soja"
      ],
      correta: 2
    },
    {
      pergunta: "Qual prática ajuda na preservação do solo?",
      opcoes: [
        "Queimadas",
        "Rotação de culturas",
        "Desmatamento",
        "Monocultura"
      ],
      correta: 1
    },
    {
      pergunta: "O Brasil preserva quanto de suas terras segundo o Código Florestal?",
      opcoes: [
        "5% a 10%",
        "10% a 15%",
        "20% a 80%",
        "90% a 100%"
      ],
      correta: 2
    },
    {
      pergunta: "O que os drones fazem na agricultura moderna?",
      opcoes: [
        "Apenas tiram fotos",
        "Mapeiam lavouras e identificam problemas",
        "Substituem tratores",
        "Colhem grãos"
      ],
      correta: 1
    },
    {
      pergunta: "Qual é a principal função das matas ciliares?",
      opcoes: [
        "Produzir madeira",
        "Criar pastagens",
        "Proteger rios e nascentes",
        "Atrair turistas"
      ],
      correta: 2
    },
    {
      pergunta: "O que acontece com resíduos orgânicos na compostagem?",
      opcoes: [
        "Viram plástico",
        "Viram combustível",
        "Viram adubo",
        "São queimados"
      ],
      correta: 2
    },
    {
      pergunta: "Qual sistema integra agricultura, pecuária e árvores?",
      opcoes: [
        "Monocultura",
        "Plantio Convencional",
        "Integração Lavoura-Pecuária-Floresta",
        "Irrigação por aspersão"
      ],
      correta: 2
    },
    {
      pergunta: "Qual benefício da agricultura de precisão?",
      opcoes: [
        "Maior desperdício",
        "Menor produtividade",
        "Uso eficiente de recursos",
        "Mais desmatamento"
      ],
      correta: 2
    }
  ];

  const perguntaEl =
    document.getElementById("pergunta");

  const opcoesEl =
    document.getElementById("opcoes");

  const proximaBtn =
    document.getElementById("proxima");

  const quizBox =
    document.getElementById("quiz-box");

  const resultadoBox =
    document.getElementById("resultado");

  const pontuacaoEl =
    document.getElementById("pontuacao");

  const mensagemEl =
    document.getElementById("mensagem");

  const reiniciarBtn =
    document.getElementById("btn-reiniciar");

  if (
    perguntaEl &&
    opcoesEl &&
    proximaBtn &&
    quizBox &&
    resultadoBox
  ) {

    let atual = 0;
    let pontos = 0;

    function carregarPergunta() {

      const pergunta =
        perguntasQuiz[atual];

      perguntaEl.innerText =
        `${atual + 1}. ${pergunta.pergunta}`;

      opcoesEl.innerHTML = "";

      pergunta.opcoes.forEach(
        (texto, indice) => {

          const opcao =
            document.createElement("div");

          opcao.classList.add("opcao");

          opcao.innerText = texto;

          opcao.addEventListener("click", () => {

            document
              .querySelectorAll(".opcao")
              .forEach(el => {
                el.style.pointerEvents = "none";
              });

            if (indice === pergunta.correta) {
              opcao.classList.add("correta");
              pontos++;
            } else {
              opcao.classList.add("errada");
            }

            document
              .querySelectorAll(".opcao")
              .forEach((el, i) => {

                if (i === pergunta.correta) {
                  el.classList.add("correta");
                }
              });

            proximaBtn.style.display =
              "block";
          });

          opcoesEl.appendChild(opcao);
        }
      );

      proximaBtn.style.display = "none";
    }

    carregarPergunta();

    proximaBtn.addEventListener("click", () => {

      atual++;

      if (atual < perguntasQuiz.length) {

        carregarPergunta();

      } else {

        const porcentagem =
          Math.round(
            (pontos / perguntasQuiz.length) * 100
          );

        quizBox.style.display = "none";
        resultadoBox.style.display = "block";

        pontuacaoEl.innerText =
          `${pontos}/${perguntasQuiz.length} - ${porcentagem}%`;

        let msg = "";

        if (porcentagem === 100) {
          msg =
            "🏆 Perfeito! Você acertou tudo!";
        } else if (porcentagem >= 80) {
          msg =
            "🌱 Excelente! Você entende muito do assunto.";
        } else if (porcentagem >= 60) {
          msg =
            "👍 Muito bem! Continue aprendendo.";
        } else if (porcentagem >= 40) {
          msg =
            "📚 Você está no caminho certo.";
        } else {
          msg =
            "🌾 Revise o conteúdo e tente novamente.";
        }

        mensagemEl.innerText = msg;
      }
    });

    if (reiniciarBtn) {

      reiniciarBtn.addEventListener(
        "click",
        () => {

          atual = 0;
          pontos = 0;

          resultadoBox.style.display =
            "none";

          quizBox.style.display =
            "block";

          carregarPergunta();
        }
      );
    }
  }

  // =========================
  // CALCULADORA
  // =========================

  const btnCalcular =
    document.getElementById("btn-calcular");

  if (btnCalcular) {

    btnCalcular.addEventListener(
      "click",
      () => {

        const carne =
          parseFloat(
            document.getElementById("carne").value
          ) || 0;

        const frango =
          parseFloat(
            document.getElementById("frango").value
          ) || 0;

        const arroz =
          parseFloat(
            document.getElementById("arroz").value
          ) || 0;

        const macarrao =
          parseFloat(
            document.getElementById("macarrao").value
          ) || 0;

        const cafe =
          parseFloat(
            document.getElementById("cafe").value
          ) || 0;

        const total =
          (carne * 15400) +
          (frango * 4300) +
          (arroz * 2500) +
          (macarrao * 1850) +
          (cafe * 140);

        document.getElementById(
          "resultado-agua"
        ).style.display = "block";

        document.getElementById(
          "total-agua"
        ).innerText =
          `${total.toLocaleString("pt-BR")} litros`;

        document.getElementById(
          "comparacao"
        ).innerText =
          `Isso equivale a aproximadamente ${Math.round(total / 150)} banhos de 10 minutos.`;
      }
    );
  }

});