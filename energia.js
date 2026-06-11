document.addEventListener("DOMContentLoaded", () => {
    console.log("Pagina de Energia carregada.");
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
    const elementos = document.querySelectorAll(".hero, .energia-card");
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
    const cards = document.querySelectorAll(".energia-card");
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
        if (!href || href === "#" || href === "" || href.startsWith("javascript:") || href.includes("mailto:") || href.includes("tel:")) {
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