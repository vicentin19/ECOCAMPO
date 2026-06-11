document.addEventListener("DOMContentLoaded", () => {
    console.log("Calculadora de Agua carregada.");
    iniciarTema();
    iniciarBotaoTopo();
    iniciarAnimacoes();
    iniciarCalculadora();
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
    
    if (!topBtn) return;

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener("scroll", () => {
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

function iniciarAnimacoes() {
    const elementos = document.querySelectorAll(".hero, .calculator-card, .dicas-card");
    
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

function iniciarCalculadora() {
    // Elementos de entrada
    const pessoasSlider = document.getElementById("pessoas");
    const banhoSlider = document.getElementById("banho");
    const roupaSlider = document.getElementById("roupa");
    const mangueiraSlider = document.getElementById("mangueira");
    const jardimSelect = document.getElementById("jardim");
    
    // Elementos de exibicao de valor
    const pessoasValor = document.getElementById("pessoasValor");
    const banhoValor = document.getElementById("banhoValor");
    const roupaValor = document.getElementById("roupaValor");
    const mangueiraValor = document.getElementById("mangueiraValor");
    
    // Elementos de resultado
    const consumoTotal = document.getElementById("consumoTotal");
    const barra = document.getElementById("barra");
    const mensagem = document.getElementById("mensagem");
    
    // Valores de consumo em litros
    const LITROS_POR_BANHO = 15;
    const LITROS_POR_LAVAGEM = 120;
    const LITROS_POR_MANGUEIRA = 12;
    const LITROS_JARDIM = [0, 30, 100, 300, 800, 2000];
    
    // Atualizar valores dos sliders
    function atualizarValores() {
        pessoasValor.textContent = pessoasSlider.value + " pessoas";
        banhoValor.textContent = banhoSlider.value + " minutos";
        roupaValor.textContent = roupaSlider.value + " vezes";
        mangueiraValor.textContent = mangueiraSlider.value + " min/dia";
    }
    
    // Calcular consumo total
    function calcularConsumo() {
        const pessoas = parseInt(pessoasSlider.value);
        const minutosBanho = parseInt(banhoSlider.value);
        const lavagensSemana = parseInt(roupaSlider.value);
        const minutosMangueira = parseInt(mangueiraSlider.value);
        const tipoJardim = parseInt(jardimSelect.value);
        
        const banhoPorPessoa = minutosBanho * LITROS_POR_BANHO;
        const banhoTotal = banhoPorPessoa * pessoas * 30;
        const lavagemMensal = lavagensSemana * 4 * LITROS_POR_LAVAGEM;
        const mangueiraMensal = minutosMangueira * 30 * LITROS_POR_MANGUEIRA;
        const jardimMensal = LITROS_JARDIM[tipoJardim] * 30;
        const consumoBase = pessoas * 50 * 30;
        
        const total = banhoTotal + lavagemMensal + mangueiraMensal + jardimMensal + consumoBase;
        
        return Math.round(total);
    }
    
    function getMensagem(consumo) {
        if (consumo < 5000) {
            return "Parabens! Seu consumo esta muito baixo. Continue praticando a sustentabilidade!";
        } else if (consumo < 10000) {
            return "Bom trabalho! Seu consumo esta dentro do recomendado. Pequenas acoes fazem diferenca.";
        } else if (consumo < 18000) {
            return "Seu consumo esta moderado. Tente reduzir o tempo de banho e evitar desperdicios.";
        } else if (consumo < 30000) {
            return "Seu consumo esta alto. Revise seus habitos diarios para economizar agua.";
        } else {
            return "Seu consumo esta muito alto! Considere adotar todas as dicas de economia de agua.";
        }
    }
    
    function getPorcentagem(consumo) {
        const maximo = 50000;
        let percentual = (consumo / maximo) * 100;
        return Math.min(percentual, 100);
    }
    
    // Atualizar resultado em tempo real
    function atualizarResultado() {
        const consumo = calcularConsumo();
        const porcentagem = getPorcentagem(consumo);
        
        consumoTotal.textContent = consumo.toLocaleString("pt-BR");
        barra.style.width = porcentagem + "%";
        
        if (porcentagem < 30) {
            barra.style.background = "linear-gradient(90deg, #14d8a7, #12a8ff)";
        } else if (porcentagem < 60) {
            barra.style.background = "linear-gradient(90deg, #ffb347, #ff8c00)";
        } else {
            barra.style.background = "linear-gradient(90deg, #ff6b6b, #ee5a24)";
        }
        
        mensagem.textContent = getMensagem(consumo);
    }
    
    // Eventos em tempo real
    pessoasSlider.addEventListener("input", () => {
        atualizarValores();
        atualizarResultado();
    });
    
    banhoSlider.addEventListener("input", () => {
        atualizarValores();
        atualizarResultado();
    });
    
    roupaSlider.addEventListener("input", () => {
        atualizarValores();
        atualizarResultado();
    });
    
    mangueiraSlider.addEventListener("input", () => {
        atualizarValores();
        atualizarResultado();
    });
    
    jardimSelect.addEventListener("change", () => {
        atualizarResultado();
    });
    
    // Inicializar
    atualizarValores();
    atualizarResultado();
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