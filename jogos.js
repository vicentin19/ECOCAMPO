const jogos = [
    {
        id: "memoria",
        titulo: "Memória Ecológica",
        descricao: "Encontre os pares de cartas sobre sustentabilidade!",
        icono: "🧠",
        cor: "#0EA5E9",
        dificuldade: "facil"
    },
    {
        id: "residuos",
        titulo: "Separação de Resíduos",
        descricao: "Aprenda a separar o lixo corretamente!",
        icono: "♻️",
        cor: "#22C55E",
        dificuldade: "medio"
    },
    {
        id: "fazenda",
        titulo: "Fazenda Sustentável",
        descricao: "Tome decisões e construa uma fazenda ecológica.",
        icono: "🌾",
        cor: "#F59E0B",
        dificuldade: "desafiador"
    }
];

const cartasMemoria = [
    { id: "solar", emoji: "☀️", nome: "Energia Solar" },
    { id: "agua", emoji: "💧", nome: "Água" },
    { id: "arvore", emoji: "🌳", nome: "Floresta" },
    { id: "vento", emoji: "🌬️", nome: "Energia Eólica" },
    { id: "reciclagem", emoji: "♻️", nome: "Reciclagem" },
    { id: "solo", emoji: "🌱", nome: "Solo Fértil" },
    { id: "abelha", emoji: "🐝", nome: "Polinização" },
    { id: "compostagem", emoji: "🗑️", nome: "Compostagem" }
];

const lixeiras = [
    { id: "azul", nome: "Papel", cor: "Azul", emoji: "📄", correta: ["papel", "jornal", "revista", "caixa", "papelão"] },
    { id: "verde", nome: "Vidro", cor: "Verde", emoji: "🥛", correta: ["garrafa", "vidro", "pote", "frasco"] },
    { id: "amarelo", nome: "Metal", cor: "Amarelo", emoji: "🥫", correta: ["lata", "metal", "alumínio", "ferro", "aco"] },
    { id: "vermelho", nome: "Plástico", cor: "Vermelho", emoji: "🥤", correta: ["plástico", "garrafa pet", "saco", "embalagem"] }
];

const residuos = [
    { nome: "Garrafa PET", emoji: "🧴", tipo: "vermelho" },
    { nome: "Jornal", emoji: "📰", tipo: "azul" },
    { nome: "Lata de Alumínio", emoji: "🥫", tipo: "amarelo" },
    { nome: "Pote de Vidro", emoji: "🏺", tipo: "verde" },
    { nome: "Saco Plástico", emoji: "🛍️", tipo: "vermelho" },
    { nome: "Caixa de Papelão", emoji: "📦", tipo: "azul" },
    { nome: "Garrafa de Vidro", emoji: "🍾", tipo: "verde" },
    { nome: "Embalagem Metálica", emoji: "🥫", tipo: "amarelo" }
];

const decisoesFazenda = [
    {
        pergunta: "🌳 Sua fazenda tem uma área desmatada. O que você faz?",
        opcoes: [
            { texto: "🌿 Plantio de agrofloresta", impacto: 25, explicacao: "Excelente! A agrofloresta recupera o solo e ainda produz alimentos." },
            { texto: "🐄 Pastagem convencional", impacto: 5, explicacao: "Ajuda pouco, o solo continua degradado." },
            { texto: "⏸️ Deixar sem uso", impacto: 0, explicacao: "Sem intervenção, o solo continua se degradando." }
        ]
    },
    {
        pergunta: "💧 Como vai irrigar suas plantações?",
        opcoes: [
            { texto: "💦 Irrigação por gotejamento", impacto: 25, explicacao: "Perfeito! Economiza até 50% de água." },
            { texto: "🌧️ Aspersão convencional", impacto: 10, explicacao: "Razoável, mas há desperdício por evaporação." },
            { texto: "🌊 Inundação dos campos", impacto: -5, explicacao: "Desperdiça muita água e compacta o solo." }
        ]
    },
    {
        pergunta: "⚡ Como vai energizar o bombeamento?",
        opcoes: [
            { texto: "☀️ Energia solar fotovoltaica", impacto: 25, explicacao: "Ótimo! Energia limpa, renovável e reduz custos." },
            { texto: "⛽ Gerador a diesel", impacto: -10, explicacao: "Diesel é caro e polui o meio ambiente." },
            { texto: "🔌 Ligação na rede elétrica", impacto: 10, explicacao: "Depende da origem da energia." }
        ]
    },
    {
        pergunta: "🐄 O que fazer com o esterco dos animais?",
        opcoes: [
            { texto: "♻️ Biodigestor para biogás", impacto: 25, explicacao: "Perfeito! Transforma resíduo em energia e biofertilizante." },
            { texto: "🌱 Adubo orgânico direto", impacto: 15, explicacao: "Ótimo! Melhora o solo sem custo." },
            { texto: "💧 Descartar no rio", impacto: -20, explicacao: "Péssimo! Contamina a água e mata os peixes." }
        ]
    }
];

let estadoGlobal = {
    jogoAtivo: null,
    memoria: { cartas: [], selecionadas: [], bloqueado: false, movimentos: 0, pares: 0 },
    residuos: { residuosRestantes: [], residuoAtual: null, lixeiraSelecionada: null, pontuacao: 0, respondido: false, finalizado: false, mensagemFeedback: "", feedbackTipo: "" },
    fazenda: { etapa: 0, indice: 0, escolhida: null, finalizado: false }
};

document.addEventListener("DOMContentLoaded", function() {
    iniciarTema();
    iniciarBotaoTopo();
    renderizarCentral();
});

function iniciarTema() {
    const themeBtn = document.getElementById("themeBtn");
    if (!themeBtn) return;

    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "light") {
        document.body.classList.add("light");
    }

    atualizarTextoTema();

    themeBtn.addEventListener("click", function() {
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

    topBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
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

function renderizarCentral() {
    const container = document.getElementById("jogosContainer");
    const jogoArea = document.getElementById("jogoArea");
    
    if (estadoGlobal.jogoAtivo === null) {
        container.style.display = "grid";
        jogoArea.style.display = "none";
        
        let html = "";
        for (let i = 0; i < jogos.length; i++) {
            const jogo = jogos[i];
            let dificuldadeClass = "facil";
            if (jogo.dificuldade === "medio") dificuldadeClass = "medio";
            if (jogo.dificuldade === "desafiador") dificuldadeClass = "desafiador";
            
            html += `
                <div class="jogo-card-item" onclick="iniciarJogo('${jogo.id}')">
                    <div class="jogo-icon" style="background: ${jogo.cor}22">${jogo.icono}</div>
                    <h3>${jogo.titulo}</h3>
                    <p>${jogo.descricao}</p>
                    <span class="dificuldade ${dificuldadeClass}">${jogo.dificuldade.toUpperCase()}</span>
                </div>
            `;
        }
        container.innerHTML = html;
    } else {
        container.style.display = "none";
        jogoArea.style.display = "block";
        
        if (estadoGlobal.jogoAtivo === "memoria") {
            renderizarJogoMemoria();
        } else if (estadoGlobal.jogoAtivo === "residuos") {
            renderizarJogoResiduos();
        } else if (estadoGlobal.jogoAtivo === "fazenda") {
            renderizarJogoFazenda();
        }
    }
}

function iniciarJogo(jogoId) {
    if (jogoId === "memoria") {
        estadoGlobal.memoria = {
            cartas: criarTabuleiroMemoria(),
            selecionadas: [],
            bloqueado: false,
            movimentos: 0,
            pares: 0
        };
    } else if (jogoId === "residuos") {
        const residuosEmbaralhados = [...residuos];
        for (let i = residuosEmbaralhados.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [residuosEmbaralhados[i], residuosEmbaralhados[j]] = [residuosEmbaralhados[j], residuosEmbaralhados[i]];
        }
        estadoGlobal.residuos = {
            residuosRestantes: residuosEmbaralhados,
            residuoAtual: residuosEmbaralhados[0],
            lixeiraSelecionada: null,
            pontuacao: 0,
            respondido: false,
            finalizado: false,
            mensagemFeedback: "",
            feedbackTipo: ""
        };
    } else if (jogoId === "fazenda") {
        estadoGlobal.fazenda = {
            etapa: 0,
            indice: 0,
            escolhida: null,
            finalizado: false
        };
    }
    estadoGlobal.jogoAtivo = jogoId;
    renderizarCentral();
}

function voltarCentral() {
    estadoGlobal.jogoAtivo = null;
    renderizarCentral();
}

function criarTabuleiroMemoria() {
    let pares = [];
    for (let i = 0; i < cartasMemoria.length; i++) {
        pares.push({ ...cartasMemoria[i], uid: cartasMemoria[i].id + "_a", revelada: false, acertada: false });
        pares.push({ ...cartasMemoria[i], uid: cartasMemoria[i].id + "_b", revelada: false, acertada: false });
    }
    for (let i = pares.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pares[i], pares[j]] = [pares[j], pares[i]];
    }
    return pares;
}

function clicarCarta(uid) {
    const estado = estadoGlobal.memoria;
    if (estado.bloqueado) return;
    
    const carta = estado.cartas.find(c => c.uid === uid);
    if (!carta || carta.revelada || carta.acertada) return;
    if (estado.selecionadas.includes(uid)) return;

    const novasSelecionadas = [...estado.selecionadas, uid];
    estado.cartas = estado.cartas.map(c => c.uid === uid ? { ...c, revelada: true } : c);
    estado.selecionadas = novasSelecionadas;

    if (novasSelecionadas.length === 2) {
        estado.bloqueado = true;
        estado.movimentos++;
        
        const cartaA = estado.cartas.find(c => c.uid === novasSelecionadas[0]);
        const cartaB = estado.cartas.find(c => c.uid === novasSelecionadas[1]);
        
        if (cartaA.id === cartaB.id) {
            estado.cartas = estado.cartas.map(c => 
                c.uid === cartaA.uid || c.uid === cartaB.uid ? { ...c, acertada: true, revelada: true } : c
            );
            estado.pares++;
            estado.selecionadas = [];
            estado.bloqueado = false;
        } else {
            setTimeout(function() {
                estado.cartas = estado.cartas.map(c => 
                    estado.selecionadas.includes(c.uid) ? { ...c, revelada: false } : c
                );
                estado.selecionadas = [];
                estado.bloqueado = false;
                renderizarJogoMemoria();
            }, 1000);
        }
    }
    renderizarJogoMemoria();
}

function reiniciarMemoria() {
    estadoGlobal.memoria = {
        cartas: criarTabuleiroMemoria(),
        selecionadas: [],
        bloqueado: false,
        movimentos: 0,
        pares: 0
    };
    renderizarJogoMemoria();
}

function renderizarJogoMemoria() {
    const estado = estadoGlobal.memoria;
    const container = document.getElementById("jogoCard");
    const totalPares = cartasMemoria.length;
    const finalizado = estado.pares === totalPares;
    
    let cartasHtml = "";
    for (let i = 0; i < estado.cartas.length; i++) {
        const carta = estado.cartas[i];
        let classe = "carta-memoria";
        if (carta.acertada) classe += " acertada";
        else if (carta.revelada) classe += " revelada";
        
        cartasHtml += `
            <div class="${classe}" onclick="clicarCarta('${carta.uid}')">
                ${(carta.revelada || carta.acertada) ? `<span class="carta-emoji">${carta.emoji}</span><span class="carta-nome">${carta.nome}</span>` : '<span class="carta-interrogacao">?</span>'}
            </div>
        `;
    }
    
    let finalHtml = "";
    if (finalizado) {
        finalHtml = `<div class="finalizado-mensagem"><p>🎉 Parabéns! Você completou o jogo em ${estado.movimentos} movimentos!</p><button class="btn-reiniciar" onclick="reiniciarMemoria()">🔄 Jogar Novamente</button></div>`;
    }
    
    container.innerHTML = `
        <div class="jogo-header">
            <div class="jogo-stats">
                <span>🧩 Pares: <strong>${estado.pares}/${totalPares}</strong></span>
                <span>🎯 Movimentos: <strong>${estado.movimentos}</strong></span>
                <button class="btn-pequeno" onclick="reiniciarMemoria()">🔄 Novo Jogo</button>
            </div>
        </div>
        <div class="tabuleiro-memoria">
            ${cartasHtml}
        </div>
        ${finalHtml}
    `;
    
    document.getElementById("voltarBtn").onclick = voltarCentral;
}

function selecionarLixeira(tipo) {
    const estado = estadoGlobal.residuos;
    if (estado.respondido) return;
    
    estado.lixeiraSelecionada = tipo;
    const acertou = (tipo === estado.residuoAtual.tipo);
    
    if (acertou) {
        estado.pontuacao++;
        estado.mensagemFeedback = `✅ Correto! ${estado.residuoAtual.nome} vai na lixeira ${lixeiras.find(l => l.id === tipo).nome}!`;
        estado.feedbackTipo = "correto";
    } else {
        const lixeiraCorreta = lixeiras.find(l => l.id === estado.residuoAtual.tipo);
        estado.mensagemFeedback = `❌ Incorreto! ${estado.residuoAtual.nome} deve ir na lixeira ${lixeiraCorreta.nome} (${lixeiraCorreta.cor}).`;
        estado.feedbackTipo = "errado";
    }
    
    estado.respondido = true;
    
    setTimeout(function() {
        const novosResiduos = [...estado.residuosRestantes];
        novosResiduos.shift();
        
        if (novosResiduos.length === 0) {
            estado.finalizado = true;
        } else {
            estado.residuosRestantes = novosResiduos;
            estado.residuoAtual = novosResiduos[0];
            estado.lixeiraSelecionada = null;
            estado.respondido = false;
            estado.mensagemFeedback = "";
            estado.feedbackTipo = "";
        }
        renderizarJogoResiduos();
    }, 1500);
    
    renderizarJogoResiduos();
}

function reiniciarResiduos() {
    const residuosEmbaralhados = [...residuos];
    for (let i = residuosEmbaralhados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [residuosEmbaralhados[i], residuosEmbaralhados[j]] = [residuosEmbaralhados[j], residuosEmbaralhados[i]];
    }
    estadoGlobal.residuos = {
        residuosRestantes: residuosEmbaralhados,
        residuoAtual: residuosEmbaralhados[0],
        lixeiraSelecionada: null,
        pontuacao: 0,
        respondido: false,
        finalizado: false,
        mensagemFeedback: "",
        feedbackTipo: ""
    };
    renderizarJogoResiduos();
}

function renderizarJogoResiduos() {
    const estado = estadoGlobal.residuos;
    const container = document.getElementById("jogoCard");
    const total = residuos.length;
    
    if (estado.finalizado) {
        const percentual = Math.round((estado.pontuacao / total) * 100);
        let mensagem = "";
        if (percentual === 100) mensagem = "Perfeito! Você é um expert em reciclagem! 🌍";
        else if (percentual >= 75) mensagem = "Muito bem! Continue assim! ♻️";
        else mensagem = "Bom treino! Tente novamente para aprender mais! 💚";
        
        container.innerHTML = `
            <div class="finalizado-container">
                <div class="icone-fazenda">♻️</div>
                <div class="pontuacao-final">${estado.pontuacao}<span>/${total}</span></div>
                <p class="mensagem-final">${mensagem}</p>
                <button class="btn-reiniciar" onclick="reiniciarResiduos()">🔄 Jogar Novamente</button>
            </div>
        `;
        document.getElementById("voltarBtn").onclick = voltarCentral;
        return;
    }
    
    let lixeirasHtml = "";
    for (let i = 0; i < lixeiras.length; i++) {
        const lixeira = lixeiras[i];
        let classe = "lixeira-item";
        if (estado.lixeiraSelecionada === lixeira.id) {
            classe += " selecionada";
        }
        lixeirasHtml += `
            <div class="${classe}" onclick="selecionarLixeira('${lixeira.id}')">
                <span class="lixeira-icon">${lixeira.emoji}</span>
                <div class="lixeira-nome">${lixeira.nome}</div>
                <div class="lixeira-cor">${lixeira.cor}</div>
            </div>
        `;
    }
    
    let feedbackHtml = "";
    if (estado.mensagemFeedback) {
        feedbackHtml = `<div class="feedback-residuo ${estado.feedbackTipo}">${estado.mensagemFeedback}</div>`;
    }
    
    container.innerHTML = `
        <div class="jogo-header">
            <div class="jogo-stats">
                <span>🎯 Pontuação: <strong>${estado.pontuacao}/${total}</strong></span>
                <span>📦 Restam: <strong>${estado.residuosRestantes.length}</strong></span>
                <button class="btn-pequeno" onclick="reiniciarResiduos()">🔄 Reiniciar</button>
            </div>
        </div>
        <div class="residuo-card">
            <span class="residuo-emoji">${estado.residuoAtual.emoji}</span>
            <div class="residuo-nome">${estado.residuoAtual.nome}</div>
            <div class="residuo-dica">🗑️ Em qual lixeira este resíduo vai?</div>
        </div>
        <div class="residuos-grid">
            ${lixeirasHtml}
        </div>
        ${feedbackHtml}
    `;
    document.getElementById("voltarBtn").onclick = voltarCentral;
}

function escolherOpcaoFazenda(idx) {
    const estado = estadoGlobal.fazenda;
    if (estado.escolhida !== null) return;
    
    const decisao = decisoesFazenda[estado.etapa];
    const opcaoSelecionada = decisao.opcoes[idx];
    estado.escolhida = opcaoSelecionada;
    estado.indice = Math.max(0, Math.min(100, estado.indice + opcaoSelecionada.impacto));
    renderizarJogoFazenda();
}

function avancarFazenda() {
    const estado = estadoGlobal.fazenda;
    if (estado.etapa + 1 >= decisoesFazenda.length) {
        estado.finalizado = true;
    } else {
        estado.etapa++;
        estado.escolhida = null;
    }
    renderizarJogoFazenda();
}

function reiniciarFazenda() {
    estadoGlobal.fazenda = {
        etapa: 0,
        indice: 0,
        escolhida: null,
        finalizado: false
    };
    renderizarJogoFazenda();
}

function renderizarJogoFazenda() {
    const estado = estadoGlobal.fazenda;
    const container = document.getElementById("jogoCard");
    
    let corIndice = "#EF4444";
    let labelIndice = "Degradada";
    let icone = "🏜️";
    if (estado.indice >= 70) {
        corIndice = "#22C55E";
        labelIndice = "Fazenda Sustentável";
        icone = "🌾";
    } else if (estado.indice >= 40) {
        corIndice = "#F59E0B";
        labelIndice = "Em recuperação";
        icone = "🌿";
    }
    
    if (estado.finalizado) {
        let mensagem = "";
        if (estado.indice >= 70) mensagem = "🌾 Você construiu uma fazenda verdadeiramente sustentável! Parabéns!";
        else if (estado.indice >= 40) mensagem = "🌿 Boas escolhas, mas ainda há espaço para melhorar!";
        else mensagem = "🏜️ Tente novamente com escolhas mais sustentáveis.";
        
        container.innerHTML = `
            <div class="finalizado-container">
                <div class="icone-fazenda">${icone}</div>
                <div class="indice-final" style="color: ${corIndice}">${labelIndice}</div>
                <div class="pontuacao-final">${estado.indice}<span>%</span></div>
                <p class="mensagem-final">${mensagem}</p>
                <button class="btn-reiniciar" onclick="reiniciarFazenda()">🔄 Reconstruir Fazenda</button>
            </div>
        `;
        document.getElementById("voltarBtn").onclick = voltarCentral;
        return;
    }
    
    const decisao = decisoesFazenda[estado.etapa];
    
    let opcoesHtml = "";
    if (estado.escolhida === null) {
        for (let i = 0; i < decisao.opcoes.length; i++) {
            const opcao = decisao.opcoes[i];
            opcoesHtml += `<button class="btn-opcao" onclick="escolherOpcaoFazenda(${i})">${opcao.texto}</button>`;
        }
    } else {
        let classeImpacto = "impacto-bom";
        if (estado.escolhida.impacto <= 0) classeImpacto = "impacto-ruim";
        else if (estado.escolhida.impacto < 20) classeImpacto = "impacto-medio";
        
        opcoesHtml = `
            <div class="feedback-opcao ${classeImpacto}">
                <span class="impacto-texto">${estado.escolhida.impacto >= 0 ? `+${estado.escolhida.impacto}%` : `${estado.escolhida.impacto}%`}</span>
                <p>${estado.escolhida.explicacao}</p>
            </div>
            <button class="btn-avancar" onclick="avancarFazenda()">${estado.etapa + 1 >= decisoesFazenda.length ? "📊 Ver Resultado Final" : "➡️ Próxima Decisão"}</button>
        `;
    }
    
    container.innerHTML = `
        <div class="jogo-header">
            <div class="sustentabilidade-header">
                <span>🌱 Índice de Sustentabilidade</span>
                <span style="color: ${corIndice}">${estado.indice}% — ${labelIndice}</span>
            </div>
            <div class="progresso-bar"><div class="progresso-fill" style="width: ${estado.indice}%; background: ${corIndice}"></div></div>
            <div class="decisao-info">📋 Decisão ${estado.etapa + 1} de ${decisoesFazenda.length} | 🎯 Meta: 70%+</div>
        </div>
        <div class="pergunta-card">${decisao.pergunta}</div>
        <div class="opcoes-container">${opcoesHtml}</div>
    `;
    document.getElementById("voltarBtn").onclick = voltarCentral;
}

window.clicarCarta = clicarCarta;
window.reiniciarMemoria = reiniciarMemoria;
window.selecionarLixeira = selecionarLixeira;
window.reiniciarResiduos = reiniciarResiduos;
window.escolherOpcaoFazenda = escolherOpcaoFazenda;
window.avancarFazenda = avancarFazenda;
window.reiniciarFazenda = reiniciarFazenda;
window.iniciarJogo = iniciarJogo;
window.voltarCentral = voltarCentral;