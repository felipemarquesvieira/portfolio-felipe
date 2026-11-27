# FelipeDev — Portfólio

Portfólio pessoal de **Felipe Marques Vieira**, estudante de Análise e Desenvolvimento de Sistemas.

**Site publicado:** https://felipemarquesvieira.github.io/portfolio-felipe/

## Sobre o projeto

Site estático com três páginas (início, sobre mim e projetos), feito com HTML, CSS e JavaScript puros, sem frameworks nem bibliotecas. A identidade visual é preta e dourada, com as fontes Plus Jakarta Sans (títulos) e Roboto (texto).

## Projeto em destaque: FM SPORTS

Sistema web de controle de estoque feito com Python, Flask e SQLite, com painel de indicadores, tabela de produtos e cadastro de novos itens.

- Demonstração: https://fm-sports-estoque.onrender.com/
- Código: https://github.com/felipemarquesvieira/fm-sports-estoque

## Funcionalidades

- Layout responsivo (desktop, tablet e celular)
- Menu mobile acessível: fecha com Esc, com clique fora ou ao escolher um link
- Menu que acompanha a seção visível na página inicial
- Filtros de projetos por tecnologia, com contador de resultados e transição suave
- Animações de entrada que respeitam a opção "reduzir movimento" do sistema
- Foco visível para navegação por teclado
- Ano do rodapé atualizado automaticamente

## Tecnologias

- HTML5
- CSS3 (variáveis, Grid, Flexbox, media queries)
- JavaScript (IntersectionObserver, matchMedia)

## Estrutura

```
portfolio-felipe/
├── index.html          Página inicial
├── pages/
│   ├── sobre.html      Sobre mim
│   └── projetos.html   Projetos com filtros
├── css/
│   ├── style.css       Estilos principais e variáveis
│   ├── responsive.css  Ajustes por tamanho de tela
│   └── pages.css       Estilos das páginas internas
├── js/
│   ├── script.js       Menu, animações e rolagem (todas as páginas)
│   └── projetos.js     Filtros da página de projetos
└── images/
    ├── perfil/         Foto
    ├── projetos/
    └── icones/         Favicon
```

## Como abrir localmente

1. Baixe ou clone o repositório:
   ```
   git clone https://github.com/felipemarquesvieira/portfolio-felipe.git
   ```
2. Abra a pasta no VS Code e use a extensão Live Server, ou abra o `index.html` direto no navegador.

## Autor

**Felipe Marques Vieira**
GitHub: [felipemarquesvieira](https://github.com/felipemarquesvieira)