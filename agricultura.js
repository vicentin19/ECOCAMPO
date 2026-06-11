document.addEventListener("DOMContentLoaded", () => {
    console.log("Pagina de Agricultura carregada.");
    iniciarTema();
    iniciarBotaoTopo();
    iniciarAnimacoes();
    iniciarEfeitoCards();
    iniciarTransicaoPaginas();
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
        themeBtn.innerHTML = "🌙Modo Escuro";
    } else {
        themeBtn.innerHTML = "☀️Modo Claro";
    }
}

function iniciarBotaoTopo() {
    const topBtn = document.getElementById("topBtn");
    
    if (!topBtn) {
        console.error("ERRO: Botao topBtn nao encontrado!");
        return;
    }
    
    console.log("Botao topBtn encontrado!");

    // Evento de clique para voltar ao topo
    topBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Mostrar ou esconder o botao ao rolar a pagina
    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
            topBtn.style.opacity = "1";
            topBtn.style.visibility = "visible";
        } else {
            topBtn.style.opacity = "0";
            topBtn.style.visibility = "hidden";
        }
    });

    // Estado inicial do botao
    topBtn.style.opacity = "0";
    topBtn.style.visibility = "hidden";
    topBtn.style.transition = "opacity 0.3s ease, visibility 0.3s ease";
}

function iniciarAnimacoes() {
    const elementos = document.querySelectorAll(".hero, .info-card");
    
    if (elementos.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            { threshold: 0.15 }
        );

        elementos.forEach(el => {
            el.classList.add("hidden");
            observer.observe(el);
        });
    }
}

function iniciarEfeitoCards() {
    const cards = document.querySelectorAll(".info-card");
    
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-8px)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0)";
        });
    });
}

function iniciarTransicaoPaginas() {
    const style = document.createElement('style');
    style.textContent = `
        body.fade-out {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        body {
            opacity: 1;
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    document.querySelectorAll("a").forEach(link => {
        const href = link.getAttribute("href");
        
        if (
            !href ||
            href === "#" ||
            href === "" ||
            href.startsWith("javascript:") ||
            href.includes("mailto:") ||
            href.includes("tel:")
        ) {
            return;
        }

        link.addEventListener("click", (e) => {
            const isInternal = !href.startsWith("http") || href.includes(window.location.hostname);
            
            if (isInternal) {
                e.preventDefault();
                document.body.classList.add("fade-out");
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

// DADOS DAS PRATICAS SUSTENTAVEIS
const praticasData = {
    solo: {
        titulo: "Conservacao do Solo",
        descricao: "A conservacao do solo envolve tecnicas como terraceamento, cobertura morta e plantio em curvas de nivel para evitar a erosao.",
        beneficios: [
            "Reduz erosao em ate 80%",
            "Mantem nutrientes essenciais",
            "Preserva a microbiota do solo"
        ],
        curiosidade: "Leva cerca de 1.000 anos para se formar 2,5 cm de solo fertil. Uma chuva forte pode destruir essa camada em minutos sem protecao adequada.",
        dica: "Use palha ou capim seco para cobrir o solo ao redor das plantas — isso mantem a umidade e evita a erosao."
    },
    biologico: {
        titulo: "Controle Biologico",
        descricao: "O controle biologico utiliza inimigos naturais como joaninhas, crisopas e vespas para controlar pragas sem necessidade de produtos quimicos.",
        beneficios: [
            "Elimina o uso de agrotoxicos",
            "Protege polinizadores como abelhas",
            "Mantem o equilibrio ecologico"
        ],
        curiosidade: "Uma unica joaninha pode comer ate 50 pulgoes por dia!",
        dica: "Plante flores como calendula e cravo-de-defunto para atrair insetos beneficos para sua horta."
    },
    regenerativa: {
        titulo: "Agricultura Regenerativa",
        descricao: "A agricultura regenerativa vai alem da sustentabilidade, buscando restaurar ativamente os ecossistemas e melhorar a saude do solo.",
        beneficios: [
            "Sequestra carbono da atmosfera",
            "Aumenta a biodiversidade",
            "Melhora o ciclo da agua"
        ],
        curiosidade: "Solos saudaveis podem armazenar 3 vezes mais carbono que as plantas acima do solo!",
        dica: "Plante especies diferentes na mesma area para imitar a diversidade da natureza."
    },
    nascentes: {
        titulo: "Preservacao de Nascentes",
        descricao: "Proteger as nascentes e fundamental para garantir a qualidade e quantidade de agua para consumo humano, agricultura e ecossistemas.",
        beneficios: [
            "Garante agua limpa por geracoes",
            "Protege a fauna e flora local",
            "Previne assoreamento de rios"
        ],
        curiosidade: "Uma unica nascente pode abastecer um pequeno rio por mais de 100 anos!",
        dica: "Plante arvores nativas ao redor das nascentes — as raizes seguram o solo e protegem a agua."
    },
    compostagem: {
        titulo: "Compostagem",
        descricao: "Transformar residuos organicos em adubo rico e natural, reduzindo o lixo enviado para aterros e produzindo fertilizante de alta qualidade.",
        beneficios: [
            "Reduz ate 50% do lixo domestico",
            "Gera adubo gratuito e natural",
            "Diminui emissao de metano nos aterros"
        ],
        curiosidade: "Minhocas podem comer metade do seu peso em comida por dia!",
        dica: "Misture materiais verdes (cascas de frutas) e marrons (folhas secas) na proporcao 1:2."
    },
    agroflorestas: {
        titulo: "Agroflorestas",
        descricao: "Integrar arvores com agricultura para maior produtividade, imitando o funcionamento das florestas naturais.",
        beneficios: [
            "Aumenta a produtividade por area",
            "Gera renda multipla (madeira, frutos, graos)",
            "Restaura areas degradadas"
        ],
        curiosidade: "Sistemas agroflorestais podem ser ate 10 vezes mais produtivos que monoculturas!",
        dica: "Comece com arvores de rapido crescimento como leucena ou gliricidia."
    },
    rotacao: {
        titulo: "Rotacao de Culturas",
        descricao: "Alternar cultivos para manter o solo saudavel, quebrando ciclos de pragas e repondo nutrientes naturalmente.",
        beneficios: [
            "Previne pragas e doencas",
            "Mantem a fertilidade natural",
            "Reduz necessidade de fertilizantes"
        ],
        curiosidade: "Os agricultores romanos ja praticavam rotacao de culturas ha 2.000 anos!",
        dica: "alterne plantas que consomem muito nitrogenio (milho) com leguminosas que fixam nitrogenio (feijao)."
    },
    desperdicio: {
        titulo: "Reducao de Desperdicio",
        descricao: "Menos desperdicio, mais sustentabilidade. Aproveitamento integral dos alimentos e reducao de perdas na cadeia produtiva.",
        beneficios: [
            "Economia de ate 30% na conta de comida",
            "Menos impacto ambiental",
            "Mais alimentos para quem precisa"
        ],
        curiosidade: "Um terco de toda a comida produzida no mundo e desperdicada!",
        dica: "Use talos, cascas e sementes em receitas como farinhas, caldos e bolos."
    }
};

// ABRIR MODAL COM INFORMACOES
function abrirModal(praticaId) {
    console.log("Abrindo modal para:", praticaId);
    
    const modal = document.getElementById("modal");
    const modalConteudo = document.getElementById("modal-conteudo");
    const pratica = praticasData[praticaId];
    
    if (!modal) {
        console.error("Modal nao encontrado!");
        alert("Erro: Modal nao encontrado.");
        return;
    }
    
    if (pratica) {
        modalConteudo.innerHTML = `
            <h2>${pratica.titulo}</h2>
            <p>${pratica.descricao}</p>
            
            <h3>BENEFICIOS</h3>
            <ul>
                ${pratica.beneficios.map(b => `<li>${b}</li>`).join('')}
            </ul>
            
            <div class="beneficio-box">
                <strong>Curiosidade:</strong> ${pratica.curiosidade}
            </div>
            
            <div class="beneficio-box">
                <strong>Dica Pratica:</strong> ${pratica.dica}
            </div>
        `;
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    } else {
        console.error("Pratica nao encontrada:", praticaId);
    }
}

// FECHAR MODAL
function fecharModal() {
    const modal = document.getElementById("modal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Fechar modal clicando fora
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        fecharModal();
    }
}

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        fecharModal();
    }
});