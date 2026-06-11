const perguntas = [
  {
    pergunta: "Qual porcentagem de água doce do planeta está disponível para consumo humano?",
    opcoes: ["50%", "30%", "3%", "10%"],
    correta: 2,
    explicacao: "Apenas 3% da água do planeta é doce, e desse total, menos de 1% está acessível. Por isso a água é um recurso preciosíssimo.",
  },
  {
    pergunta: "O que é compostagem?",
    opcoes: ["Queima de lixo", "Decomposição de matéria orgânica para adubo", "Reciclagem de plástico", "Filtração de água"],
    correta: 1,
    explicacao: "A compostagem transforma resíduos orgânicos (restos de comida, folhas) em húmus, um adubo natural rico em nutrientes.",
  },
  {
    pergunta: "Qual energia renovável é mais utilizada no Brasil?",
    opcoes: ["Solar", "Eólica", "Hidrelétrica", "Biomassa"],
    correta: 2,
    explicacao: "O Brasil é um dos maiores geradores de energia hidrelétrica do mundo, representando cerca de 60% da matriz energética nacional.",
  },
  {
    pergunta: "O que é pegada ecológica?",
    opcoes: [
      "Marca de sapato ecológico",
      "Medida do impacto ambiental do consumo humano",
      "Técnica de plantio",
      "Tipo de solo",
    ],
    correta: 1,
    explicacao: "A pegada ecológica mede a área de terra e água necessária para sustentar o consumo de uma pessoa ou população.",
  },
  {
    pergunta: "Qual prática agrícola fixa nitrogênio no solo naturalmente?",
    opcoes: ["Queimada", "Plantio de leguminosas", "Uso de herbicidas", "Monocultura"],
    correta: 1,
    explicacao: "Leguminosas como feijão e soja têm bactérias nas raízes que capturam nitrogênio do ar e o fixam no solo, reduzindo fertilizantes.",
  },
  {
    pergunta: "Uma torneira pingando pode desperdiçar quantos litros de água por mês?",
    opcoes: ["2 litros", "46 litros", "1.400 litros", "10 litros"],
    correta: 2,
    explicacao: "Uma torneira pingando uma vez por segundo desperdiça cerca de 46L por dia, ou aproximadamente 1.400 litros por mês!",
  },
  {
    pergunta: "O que é biodiversidade?",
    opcoes: [
      "Variedade de seres vivos em um ecossistema",
      "Tipo de combustível verde",
      "Técnica de irrigação",
      "Sistema de reciclagem",
    ],
    correta: 0,
    explicacao: "Biodiversidade é a variedade de vida em um ecossistema — inclui animais, plantas, fungos e microrganismos que vivem e interagem entre si.",
  },
  {
    pergunta: "Qual é o principal gás responsável pelo aquecimento global?",
    opcoes: ["Oxigênio (O₂)", "Nitrogênio (N₂)", "Dióxido de carbono (CO₂)", "Hidrogênio (H₂)"],
    correta: 2,
    explicacao: "O CO₂ é o principal gás de efeito estufa liberado por atividades humanas como queima de combustíveis e desmatamento.",
  },
  {
    pergunta: "O que são agroflorestas?",
    opcoes: [
      "Florestas de plástico reciclado",
      "Integração de árvores com agricultura e pecuária",
      "Técnica de pesca sustentável",
      "Sistema de energia solar no campo",
    ],
    correta: 1,
    explicacao: "Agroflorestas combinam árvores, cultivos agrícolas e, às vezes, animais no mesmo espaço, criando um sistema mais produtivo e sustentável.",
  },
  {
    pergunta: "Qual cor identifica o recipiente correto para vidro na coleta seletiva?",
    opcoes: ["Amarelo", "Vermelho", "Verde", "Azul"],
    correta: 2,
    explicacao: "No Brasil, o verde indica o recipiente para vidros. Azul = papel, amarelo = metal, vermelho = plástico.",
  },
  {
    pergunta: "O que faz um biodigestor?",
    opcoes: [
      "Filtra poluição do ar",
      "Transforma dejetos orgânicos em biogás e biofertilizante",
      "Trata a água do rio",
      "Gera energia solar",
    ],
    correta: 1,
    explicacao: "O biodigestor é um sistema fechado onde microrganismos decompõem matéria orgânica sem oxigênio, gerando biogás (combustível) e biofertilizante.",
  },
  {
    pergunta: "Quantos anos leva para se formar 2,5 cm de solo fértil?",
    opcoes: ["10 anos", "100 anos", "500 anos", "1.000 anos"],
    correta: 3,
    explicacao: "Leva cerca de 1.000 anos para se formar 2,5 cm de solo fértil. Por isso a conservação do solo é fundamental para a agricultura.",
  },
  {
    pergunta: "O que é controle biológico de pragas?",
    opcoes: [
      "Uso intensivo de pesticidas",
      "Uso de predadores naturais para controlar pragas",
      "Queima das plantas infectadas",
      "Irrigação por inundação",
    ],
    correta: 1,
    explicacao: "O controle biológico usa inimigos naturais das pragas — como joaninhas, vespas e fungos — para controlar populações sem agroquímicos.",
  },
  {
    pergunta: "Qual é a principal vantagem da energia solar para pequenos agricultores?",
    opcoes: [
      "Produz energia ilimitada à noite",
      "Independência energética e redução de custos a longo prazo",
      "Não precisa de manutenção",
      "Funciona melhor em dias nublados",
    ],
    correta: 1,
    explicacao: "Para o pequeno agricultor, a energia solar gera independência energética, reduz custos e pode ser usada para irrigação e refrigeração.",
  },
  {
    pergunta: "O que a rotação de culturas ajuda a combater?",
    opcoes: [
      "Excesso de chuva",
      "Pragas e esgotamento de nutrientes do solo",
      "Poluição do ar",
      "Erosão causada pelo vento",
    ],
    correta: 1,
    explicacao: "A rotação de culturas quebra o ciclo de pragas e doenças específicas e evita o esgotamento de nutrientes que ocorre na monocultura.",
  },
];

const rankings = [
  { min: 0, max: 5, titulo: "Aprendiz Ambiental", color: "#F59E0B" },
  { min: 6, max: 10, titulo: "Agente Sustentável", color: "#0EA5E9" },
  { min: 11, max: 15, titulo: "Guardião do Planeta", color: "#22C55E" },
];

let currentStep = 0;
let acertos = 0;
let estado = "pendente";
let escolha = null;
let finished = false;

document.addEventListener("DOMContentLoaded", () => {
    iniciarTema();
    iniciarBotaoTopo();
    renderizarQuiz();
});

function iniciarTema() {
    const themeBtn = document.getElementById("themeBtn");
    if (!themeBtn) return;

    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "light") {
        document.body.classList.add("light");
    }

    atualizarTextoTema();

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");
        if (document.body.classList.contains("light")) {
            localStorage.setItem("tema", "light");
        } else {
            localStorage.setItem("tema", "dark");
        }
        atualizarTextoTema();
    });
}

function atualizarTextoTema() {
    const themeBtn = document.getElementById("themeBtn");
    if (!themeBtn) return;
    if (document.body.classList.contains("light")) {
        themeBtn.innerHTML = "🌙 Modo Escuro";
    } else {
        themeBtn.innerHTML = "☀️ Modo Claro";
    }
}

function iniciarBotaoTopo() {
    const topBtn = document.getElementById("topBtn");
    
    if (!topBtn) {
        return;
    }

    topBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
            topBtn.style.opacity = "1";
            topBtn.style.visibility = "visible";
        } else {
            topBtn.style.opacity = "0";
            topBtn.style.visibility = "hidden";
        }
    });

    topBtn.style.opacity = "0";
    topBtn.style.visibility = "hidden";
    topBtn.style.transition = "opacity 0.3s ease, visibility 0.3s ease";
}

function renderizarQuiz() {
    const container = document.getElementById("quizCard");
    if (!container) return;

    if (!finished) {
        const pergunta = perguntas[currentStep];
        const progresso = ((currentStep + 1) / perguntas.length) * 100;
        
        let optionsHtml = "";
        for (let i = 0; i < pergunta.opcoes.length; i++) {
            let optionClass = "option-btn";
            if (estado !== "pendente") {
                if (i === pergunta.correta) {
                    optionClass += " correct-highlight";
                } else if (i === escolha && i !== pergunta.correta) {
                    optionClass += " wrong";
                } else {
                    optionClass += " disabled";
                }
            }
            
            optionsHtml += `<button class="${optionClass}" onclick="responder(${i})" ${estado !== "pendente" ? "disabled" : ""}>${pergunta.opcoes[i]}</button>`;
        }
        
        let feedbackHtml = "";
        if (estado !== "pendente") {
            const feedbackClass = estado === "correta" ? "correct" : "wrong";
            const perguntaAtual = perguntas[currentStep];
            const botaoTexto = currentStep + 1 >= perguntas.length ? "Ver Resultado" : "Próxima Pergunta";
            feedbackHtml = `<div class="feedback-box ${feedbackClass}"><p><strong>${estado === "correta" ? "✓ Correto!" : "✗ Incorreto!"}</strong></p><p>${perguntaAtual.explicacao}</p></div><button class="next-btn" onclick="avancar()">${botaoTexto}</button>`;
        }
        
        container.innerHTML = `
            <div class="progress-header">
                <span>Pergunta ${currentStep + 1} de ${perguntas.length}</span>
                <span>✅ ${acertos} acertos</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progresso}%"></div>
            </div>
            <div class="question-text">${pergunta.pergunta}</div>
            <div class="options-grid">${optionsHtml}</div>
            ${feedbackHtml}
        `;
    } else {
        const rank = rankings.find(r => acertos >= r.min && acertos <= r.max) || rankings[0];
        let mensagem = "";
        if (acertos === perguntas.length) {
            mensagem = "Perfeito! Você é um verdadeiro guardião do planeta!";
        } else if (acertos >= 11) {
            mensagem = "Excelente! Você tem um ótimo conhecimento ambiental.";
        } else if (acertos >= 6) {
            mensagem = "Bom trabalho! Continue aprendendo sobre sustentabilidade.";
        } else {
            mensagem = "Continue estudando! Cada aprendizado faz a diferença.";
        }
        
        container.innerHTML = `
            <div class="result-container">
                <div class="rank-badge" style="background: ${rank.color}22; color: ${rank.color}">
                    🏆 ${rank.titulo}
                </div>
                <div class="score-number">
                    ${acertos}<span>/${perguntas.length}</span>
                </div>
                <div class="result-message">${mensagem}</div>
                <div class="result-bar">
                    <div class="result-fill" style="width: ${(acertos / perguntas.length) * 100}%"></div>
                </div>
                <button class="restart-btn" onclick="reiniciar()">↺ Tentar Novamente</button>
            </div>
        `;
    }
}

function responder(indice) {
    if (estado !== "pendente") return;
    
    const pergunta = perguntas[currentStep];
    escolha = indice;
    
    if (indice === pergunta.correta) {
        estado = "correta";
        acertos++;
    } else {
        estado = "errada";
    }
    
    renderizarQuiz();
}

function avancar() {
    if (currentStep + 1 >= perguntas.length) {
        finished = true;
    } else {
        currentStep++;
        estado = "pendente";
        escolha = null;
    }
    renderizarQuiz();
}

function reiniciar() {
    currentStep = 0;
    acertos = 0;
    estado = "pendente";
    escolha = null;
    finished = false;
    renderizarQuiz();
}