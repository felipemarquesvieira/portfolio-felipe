/* =====================================
   PÁGINA DE PROJETOS
   FILTROS POR CATEGORIA
   (o menu mobile está no script.js)

   - data-category aceita mais de uma categoria (ex.: "web python")
   - aria-pressed acompanha o filtro ativo
   - contador de resultados
   - transição suave: os cards saem, depois os novos entram
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const botoes = document.querySelectorAll(".filter-btn");
    const projetos = document.querySelectorAll(".project-card");
    const container = document.querySelector(".projects-container");
    const contador = document.getElementById("filter-count");

    if (!botoes.length || !projetos.length) {
        return;
    }

    // Tempo da saída dos cards (igual ao transition do pages.css)
    const DURACAO = 300;
    const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let temporizador = null;

    function pertenceAoFiltro(projeto, categoria) {
        const categorias = (projeto.getAttribute("data-category") || "").split(" ");
        return categoria === "all" || categorias.includes(categoria);
    }

    function atualizarContador(quantidade) {
        if (!contador) {
            return;
        }
        contador.textContent = quantidade === 1 ? "1 projeto" : quantidade + " projetos";
    }

    function aplicarFiltro(categoria) {

        // Se o usuário clicar rápido, o filtro anterior é cancelado
        clearTimeout(temporizador);

        const saindo = [];
        const entrando = [];
        let visiveis = 0;

        projetos.forEach(function (projeto) {

            if (pertenceAoFiltro(projeto, categoria)) {
                visiveis++;

                if (projeto.classList.contains("hidden")) {
                    entrando.push(projeto);
                } else {
                    projeto.classList.remove("is-hiding");
                }

            } else if (!projeto.classList.contains("hidden")) {
                saindo.push(projeto);
            }

        });

        atualizarContador(visiveis);

        // 1) Os cards que não pertencem ao filtro somem suavemente
        saindo.forEach(function (projeto) {
            projeto.classList.add("is-hiding");
        });

        const espera = saindo.length && !movimentoReduzido ? DURACAO : 0;

        // 2) Depois saem do layout, e os novos entram
        temporizador = setTimeout(function () {

            saindo.forEach(function (projeto) {
                projeto.classList.add("hidden");
                projeto.classList.remove("is-hiding");
            });

            entrando.forEach(function (projeto) {
                projeto.classList.add("is-hiding");
                projeto.classList.remove("hidden");
            });

            // Força o navegador a aplicar o estado inicial antes de animar
            if (container) {
                void container.offsetWidth;
            }

            entrando.forEach(function (projeto) {
                projeto.classList.remove("is-hiding");
            });

        }, espera);
    }

    botoes.forEach(function (botao) {

        botao.addEventListener("click", function () {

            if (botao.classList.contains("active")) {
                return;
            }

            botoes.forEach(function (item) {
                item.classList.remove("active");
                item.setAttribute("aria-pressed", "false");
            });

            botao.classList.add("active");
            botao.setAttribute("aria-pressed", "true");

            aplicarFiltro(botao.getAttribute("data-filter"));
        });

    });

    // Contador correto desde o carregamento
    const ativo = document.querySelector(".filter-btn.active");
    aplicarFiltro(ativo ? ativo.getAttribute("data-filter") : "all");

});