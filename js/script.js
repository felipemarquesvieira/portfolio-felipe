/* =====================================
   FELIPEDEV
   FUNCIONALIDADES JAVASCRIPT
   (carregado em todas as páginas)

   1. Animações de entrada (escalonadas)
   2. Menu mobile
   3. Cabeçalho com sombra ao rolar
   4. Menu que acompanha a rolagem (só na home)
   5. Ano automático no rodapé
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    // 1. ANIMAÇÕES DE ENTRADA
    // Anima o CONTEÚDO das seções, nunca a seção inteira.
    // Assim o fundo das seções não some ao rolar e não há animação dupla.
    const elementos = document.querySelectorAll(
        ".hero-content, .hero-image, " +
        ".section-title, .about-content, .about-facts, " +
        ".skill-row, .project-featured, .project-card, .projects-action, " +
        ".contact-content, .page-text, .project-filters"
    );

    // Intervalo entre elementos que entram juntos, e o máximo de atraso
    const PASSO_ESCALONADO = 90;
    const ATRASO_MAXIMO = 360;

    if ("IntersectionObserver" in window) {

        elementos.forEach(function (elemento) {
            elemento.classList.add("reveal");
        });

        // threshold 0: basta o elemento começar a entrar na tela.
        // rootMargin: dispara um pouco antes do fim da tela, para a animação ser vista.
        const observador = new IntersectionObserver(function (entradas) {

            let ordem = 0;

            entradas.forEach(function (entrada) {

                if (!entrada.isIntersecting) {
                    return;
                }

                const alvo = entrada.target;

                // Elementos que entram ao mesmo tempo aparecem um depois do outro
                const atraso = Math.min(ordem * PASSO_ESCALONADO, ATRASO_MAXIMO);
                ordem++;

                if (atraso > 0) {
                    alvo.style.transitionDelay = atraso + "ms";

                    // Remove o atraso depois da entrada, para não atrasar o hover
                    setTimeout(function () {
                        alvo.style.transitionDelay = "";
                    }, atraso + 900);
                }

                alvo.classList.add("active");
                observador.unobserve(alvo);
            });

        }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });

        elementos.forEach(function (elemento) {
            observador.observe(elemento);
        });

    }


    // 2. MENU MOBILE
    const header = document.querySelector(".header");
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {

        // Abre ou fecha o menu e mantém os atributos de acessibilidade em sincronia
        function definirMenu(aberto) {
            navMenu.classList.toggle("active", aberto);
            menuToggle.setAttribute("aria-expanded", String(aberto));
            menuToggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
        }

        function menuEstaAberto() {
            return navMenu.classList.contains("active");
        }

        // Clique no botão
        menuToggle.addEventListener("click", function () {
            definirMenu(!menuEstaAberto());
        });

        // Clique em um link do menu
        navMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                definirMenu(false);
            });
        });

        // Tecla Esc fecha o menu e devolve o foco ao botão
        document.addEventListener("keydown", function (evento) {
            if (evento.key === "Escape" && menuEstaAberto()) {
                definirMenu(false);
                menuToggle.focus();
            }
        });

        // Clique fora do cabeçalho fecha o menu
        document.addEventListener("click", function (evento) {
            if (menuEstaAberto() && header && !header.contains(evento.target)) {
                definirMenu(false);
            }
        });

        // Ao voltar para a largura de desktop, o menu é fechado
        const larguraMobile = window.matchMedia("(max-width: 768px)");

        function aoMudarLargura(evento) {
            if (!evento.matches) {
                definirMenu(false);
            }
        }

        if (larguraMobile.addEventListener) {
            larguraMobile.addEventListener("change", aoMudarLargura);
        } else {
            larguraMobile.addListener(aoMudarLargura);
        }

    }


    // 3 e 4. ROLAGEM: SOMBRA NO CABEÇALHO E MENU QUE ACOMPANHA A SEÇÃO
    // O menu só acompanha a rolagem na home, onde os links apontam para "#seções".
    // Nas páginas internas, o aria-current="page" fixo do HTML não é alterado.
    const secoesDoMenu = [];

    if (navMenu) {
        document.querySelectorAll("main section[id]").forEach(function (secao) {

            let link = navMenu.querySelector('a[href="#' + secao.id + '"]');

            // A seção de projetos da home corresponde ao link da página de projetos
            if (!link && secao.id === "projetos") {
                link = navMenu.querySelector('a[href$="projetos.html"]');
            }

            if (link) {
                secoesDoMenu.push({ secao: secao, link: link });
            }
        });
    }

    let linkAtual = null;

    function marcarLink(link) {
        if (link === linkAtual) {
            return;
        }

        if (linkAtual) {
            linkAtual.removeAttribute("aria-current");
        }

        if (link) {
            link.setAttribute("aria-current", "location");
        }

        linkAtual = link;
    }

    function aoRolar() {

        // Sombra no cabeçalho
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 8);
        }

        if (!secoesDoMenu.length) {
            return;
        }

        // Seção atual: a última cujo topo já passou de 40% da altura da tela
        const linhaDeLeitura = window.innerHeight * 0.4;
        let atual = secoesDoMenu[0];

        secoesDoMenu.forEach(function (item) {
            if (item.secao.getBoundingClientRect().top <= linhaDeLeitura) {
                atual = item;
            }
        });

        // No fim da página, a última seção (Contato) fica marcada
        const noFim = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

        if (noFim) {
            atual = secoesDoMenu[secoesDoMenu.length - 1];
        }

        marcarLink(atual.link);
    }

    // Executa no máximo uma vez por quadro, para a rolagem continuar leve
    let agendado = false;

    window.addEventListener("scroll", function () {
        if (!agendado) {
            agendado = true;
            window.requestAnimationFrame(function () {
                aoRolar();
                agendado = false;
            });
        }
    }, { passive: true });

    window.addEventListener("resize", aoRolar);

    aoRolar();


    // 5. ANO AUTOMÁTICO NO RODAPÉ
    // Troca o ano escrito no HTML pelo ano atual (o HTML continua com um ano
    // como reserva, caso o JavaScript não carregue).
    const textoRodape = document.querySelector(".footer p");

    if (textoRodape) {
        textoRodape.textContent = textoRodape.textContent.replace(
            /\d{4}/,
            String(new Date().getFullYear())
        );
    }

});