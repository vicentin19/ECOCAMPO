document.addEventListener("DOMContentLoaded", () => {
    iniciarTema();
    iniciarBotaoTopo();
    iniciarAnimacoesScroll();
    iniciarContadores();
    iniciarEfeitoCards();
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
    if (!topBtn) return;

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

function iniciarAnimacoesScroll() {
    const elementos = document.querySelectorAll(".impact-card, .impact-hero, .impact-info, .simulator-section");
    
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

function iniciarContadores() {
    const numeros = document.querySelectorAll("[data-counter]");
    
    numeros.forEach(numero => {
        const alvo = parseInt(numero.dataset.counter);
        let atual = 0;
        const incremento = alvo / 120;
        
        function atualizar() {
            atual += incremento;
            if (atual >= alvo) {
                atual = alvo;
            }
            
            if (alvo >= 1000000) {
                numero.innerText = (atual / 1000000).toFixed(1) + "M";
            } else if (alvo >= 1000) {
                numero.innerText = (atual / 1000).toFixed(1) + "K";
            } else {
                numero.innerText = Math.floor(atual);
            }
            
            if (atual < alvo) {
                requestAnimationFrame(atualizar);
            }
        }
        
        atualizar();
    });
}

function iniciarEfeitoCards() {
    const cards = document.querySelectorAll(".impact-card");
    
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-6px)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0)";
        });
    });
}

function mostrarImpacto(tipo) {
    const resultado = document.getElementById("resultadoImpacto");
    if (!resultado) return;

    const mensagens = {
        agua: " <strong>Economia de Água</strong><br>Uma torneira gotejando pode desperdiçar até 45 litros por dia! Economizar água ajuda a preservar rios, reservatórios e reduz o desperdício.",
        
        energia: " <strong>Energia Solar</strong><br>Cada kWh de energia solar evita cerca de 0,5kg de CO₂ na atmosfera! Utilize energia limpa para reduzir a emissão de gases poluentes.",
        
        reciclagem: " <strong>Reciclagem</strong><br>Uma lata de alumínio reciclada economiza energia suficiente para uma TV ficar ligada por 3 horas! A reciclagem diminui os resíduos no meio ambiente.",
        
        arvores: " <strong>Reflorestamento</strong><br>Uma única árvore absorve cerca de 22kg de CO₂ por ano! O reflorestamento contribui para a biodiversidade e combate o aquecimento global."
    };

    resultado.innerHTML = mensagens[tipo] || " Clique em uma ação acima para saber mais!";
    
    resultado.style.transform = "scale(1.02)";
    setTimeout(() => {
        resultado.style.transform = "scale(1)";
    }, 300);
}

window.addEventListener("scroll", () => {
    const hero = document.querySelector(".impact-hero");
    if (!hero) return;
    
    const scroll = window.scrollY;
    if (scroll < 300) {
        hero.style.transform = `translateY(${scroll * 0.08}px)`;
    }

// Função para destacar o link ativo baseado na URL atual
function destacarLinkAtivo() {
    // Pega o nome do arquivo atual (ex: agricultura.html, impacto.html, index.html)
    let paginaAtual = window.location.pathname.split('/').pop();
    
    // Se estiver vazio ou for a raiz, considera como index.html
    if (paginaAtual === "" || paginaAtual === "/") {
        paginaAtual = "index.html";
    }
    
    console.log("Página atual:", paginaAtual);
    
    // Mapeamento dos links para seus respectivos arquivos
    const links = {
        'index.html': 'linkInicio',
        'impacto.html': 'linkImpacto',
        'agricultura.html': 'linkAgricultura',
        'agua.html': 'linkAgua',
        'energia.html': 'linkEnergia',
        'pegada.html': 'linkPegada',
        'quiz.html': 'linkQuiz',
        'jogos.html': 'linkJogos',
        'mapa.html': 'linkMapa'
    };
    
    // Remove a classe active de todos os links
    document.querySelectorAll('.sidebar nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Adiciona a classe active ao link correspondente
    for (const [pagina, linkId] of Object.entries(links)) {
        if (paginaAtual === pagina) {
            const linkAtivo = document.getElementById(linkId);
            if (linkAtivo) {
                linkAtivo.classList.add('active');
            }
            break;
        }
    }
    
    // Se não encontrou pelo ID, tenta pelo href
    if (!document.querySelector('.sidebar nav a.active')) {
        document.querySelectorAll('.sidebar nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(paginaAtual)) {
                link.classList.add('active');
            }
        });
    }
}

// Executar quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
    destacarLinkAtivo();
});

});