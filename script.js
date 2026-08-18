/* =========================================================
   ECOPOOL CEP
   JAVASCRIPT
   Projeto Integrador
   Energia Solar + Óptica + Robótica + Sustentabilidade
========================================================= */


/* =========================================================
   1. SELEÇÃO DOS ELEMENTOS
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

const temperature = document.getElementById("temperature");
const status = document.getElementById("status");
const simulateBtn = document.getElementById("simulateBtn");


/* =========================================================
   2. MENU MOBILE
========================================================= */

if (menuBtn && menu) {

    menuBtn.addEventListener("click", () => {

        const menuAberto = menu.classList.toggle("active");

        menuBtn.setAttribute(
            "aria-expanded",
            menuAberto
        );

        menuBtn.setAttribute(
            "aria-label",
            menuAberto
                ? "Fechar menu"
                : "Abrir menu"
        );

        menuBtn.textContent =
            menuAberto ? "✕" : "☰";
    });


    /* Fechar o menu ao selecionar uma seção */

    const linksMenu = menu.querySelectorAll("a");

    linksMenu.forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("active");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                "Abrir menu"
            );

            menuBtn.textContent = "☰";

        });

    });

}


/* =========================================================
   3. SIMULADOR DE TEMPERATURA
========================================================= */

let temperaturaAtual = 25;

const temperaturaIdeal = 30;

let simulacaoAtiva = false;


/*
   Atualiza a temperatura visualmente.
*/

function atualizarTemperatura() {

    if (!temperature) {
        return;
    }

    temperature.textContent =
        `${temperaturaAtual}°C`;

}


/*
   Atualiza a mensagem do sistema.
*/

function atualizarStatus(mensagem) {

    if (!status) {
        return;
    }

    status.textContent = mensagem;

}


/*
   Simulação do aquecimento automático.
*/

function iniciarSimulacao() {

    if (simulacaoAtiva) {
        return;
    }

    simulacaoAtiva = true;

    if (simulateBtn) {
        simulateBtn.disabled = true;
        simulateBtn.textContent =
            "☀️ Aquecendo...";
    }

    atualizarStatus(
        "☀️ Os coletores solares estão captando radiação e aquecendo a água."
    );


    const intervalo = setInterval(() => {

        if (temperaturaAtual < temperaturaIdeal) {

            temperaturaAtual++;

            atualizarTemperatura();

            if (temperaturaAtual < 28) {

                atualizarStatus(
                    "🔆 Aquecimento em andamento. O sistema está aproveitando a energia solar."
                );

            } else if (temperaturaAtual < 30) {

                atualizarStatus(
                    "🌡️ A temperatura está se aproximando do nível ideal."
                );

            }

        } else {

            clearInterval(intervalo);

            simulacaoAtiva = false;

            atualizarStatus(
                "✅ Temperatura ideal atingida! O sistema entrou em modo de manutenção."
            );

            if (simulateBtn) {

                simulateBtn.disabled = false;

                simulateBtn.textContent =
                    "🔄 Reiniciar simulação";

            }

        }

    }, 700);

}


/*
   Botão do simulador.
*/

if (simulateBtn) {

    simulateBtn.addEventListener(
        "click",
        () => {

            if (
                temperaturaAtual >= temperaturaIdeal
            ) {

                temperaturaAtual = 25;

                atualizarTemperatura();

                atualizarStatus(
                    "🔄 Sistema reiniciado. Preparando novo ciclo de aquecimento..."
                );

                simulateBtn.textContent =
                    "Simular aquecimento";

                return;
            }

            iniciarSimulacao();

        }
    );

}


/* =========================================================
   4. SIMULAÇÃO DE SENSOR DE TEMPERATURA
========================================================= */

function sensorTemperatura() {

    /*
       Representação conceitual de um sensor.
       Em um sistema físico real, o sensor enviaria
       dados para um microcontrolador.
    */

    return {
        temperatura: temperaturaAtual,
        unidade: "°C",
        funcionando: true
    };

}


/* =========================================================
   5. SISTEMA AUTOMÁTICO
========================================================= */

function sistemaAutomatico() {

    const sensor = sensorTemperatura();

    if (!sensor.funcionando) {

        return "⚠️ Falha no sensor de temperatura.";

    }

    if (sensor.temperatura < 27) {

        return "🔥 Aquecimento acionado.";

    }

    if (sensor.temperatura >= 27 &&
        sensor.temperatura < 30) {

        return "☀️ Aquecimento funcionando normalmente.";

    }

    return "✅ Temperatura ideal. Aquecimento em espera.";

}


/* =========================================================
   6. CONSOLE DE DEMONSTRAÇÃO
========================================================= */

console.log(
    "EcoPool CEP iniciado com sucesso."
);

console.log(
    "Sistema:",
    sistemaAutomatico()
);


/* =========================================================
   7. ANIMAÇÃO AO ENTRAR NA TELA
========================================================= */

const elementosAnimados =
    document.querySelectorAll(
        ".card, .optica-box, .accessibility-card, .flow"
    );


const observador =
    new IntersectionObserver(
        (elementos) => {

            elementos.forEach(elemento => {

                if (elemento.isIntersecting) {

                    elemento.target.style.opacity = "1";

                    elemento.target.style.transform =
                        "translateY(0)";

                    observador.unobserve(
                        elemento.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


elementosAnimados.forEach(elemento => {

    elemento.style.opacity = "0";

    elemento.style.transform =
        "translateY(25px)";

    elemento.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observador.observe(elemento);

});


/* =========================================================
   8. INDICADOR DE SCROLL
========================================================= */

const barraScroll =
    document.createElement("div");

barraScroll.id = "barra-scroll";

barraScroll.style.position = "fixed";
barraScroll.style.top = "0";
barraScroll.style.left = "0";
barraScroll.style.height = "4px";
barraScroll.style.width = "0%";
barraScroll.style.background =
    "linear-gradient(90deg, #6ee77c, #19a7b5)";
barraScroll.style.zIndex = "9999";
barraScroll.style.transition =
    "width 0.1s linear";

document.body.appendChild(barraScroll);


window.addEventListener("scroll", () => {

    const alturaTotal =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progresso =
        (window.scrollY / alturaTotal) * 100;

    barraScroll.style.width =
        `${progresso}%`;

});


/* =========================================================
   9. EFEITO DE DIGITAÇÃO NO HERO
========================================================= */

const heroTexto =
    document.querySelector(".hero p");


if (heroTexto) {

    const textoOriginal =
        heroTexto.textContent.trim();

    heroTexto.textContent = "";

    let indice = 0;

    function escreverTexto() {

        if (indice < textoOriginal.length) {

            heroTexto.textContent +=
                textoOriginal.charAt(indice);

            indice++;

            setTimeout(
                escreverTexto,
                25
            );

        }

    }

    setTimeout(
        escreverTexto,
        500
    );

}


/* =========================================================
   10. MONITORAMENTO DA TEMPERATURA
========================================================= */

function verificarTemperatura() {

    if (temperaturaAtual < 27) {

        return {
            nivel: "baixo",
            mensagem:
                "Temperatura abaixo do recomendado."
        };

    }

    if (temperaturaAtual < 30) {

        return {
            nivel: "medio",
            mensagem:
                "Temperatura próxima do ideal."
        };

    }

    return {
        nivel: "ideal",
        mensagem:
            "Temperatura ideal atingida."
    };

}


/* =========================================================
   11. EFICIÊNCIA SOLAR
========================================================= */

function calcularEficienciaSolar(
    temperatura,
    temperaturaInicial = 25
) {

    const aumento =
        temperatura - temperaturaInicial;

    const eficiencia =
        Math.min(
            Math.max(aumento * 20, 0),
            100
        );

    return Math.round(eficiencia);

}


/* =========================================================
   12. EVENTO DE TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    (evento) => {

        /*
           A tecla ESC fecha o menu mobile.
        */

        if (
            evento.key === "Escape" &&
            menu &&
            menu.classList.contains("active")
        ) {

            menu.classList.remove("active");

            if (menuBtn) {

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

                menuBtn.textContent = "☰";

                menuBtn.focus();

            }

        }

    }
);


/* =========================================================
   13. ACESSIBILIDADE
========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (prefersReducedMotion) {

    document.documentElement.style.scrollBehavior =
        "auto";

}


/* =========================================================
   14. INFORMAÇÕES DO SISTEMA
========================================================= */

const sistemaEcoPool = {

    nome: "EcoPool CEP",

    objetivo:
        "Automatizar o aquecimento sustentável da piscina.",

    energia:
        "Energia solar",

    sensores: [
        "Sensor de temperatura"
    ],

    atuadores: [
        "Bomba de circulação",
        "Válvula de controle"
    ],

    tecnologias: [
        "HTML",
        "CSS",
        "JavaScript",
        "Robótica",
        "Óptica"
    ],

    temperaturaIdeal: "30°C"

};


console.log(
    "Informações do projeto:",
    sistemaEcoPool
);


/* =========================================================
   15. INICIALIZAÇÃO
========================================================= */

atualizarTemperatura();

console.log(
    "Temperatura inicial:",
    temperaturaAtual + "°C"
);

console.log(
    "Status:",
    verificarTemperatura().mensagem
);
