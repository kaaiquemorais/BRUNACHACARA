# CLAUDE.md

Contexto do projeto para retomar o trabalho sem reler o histórico da conversa.

## O que é

Landing page para a **Chácara Vista Panorâmica**, casa de temporada em Socorro/SP,
bairro Rio do Peixe. Objetivo: captar reservas via WhatsApp.

## Arquivos

| Caminho | O que é |
|---|---|
| `index.html` | Landing page principal. |
| `o-que-fazer.html` | Página com as 24 atrações de Socorro. |
| `assets/css/style.css` | Toda a folha de estilo, usada pelas duas páginas. |
| `assets/js/site.js` | Todo o JavaScript, usado pelas duas páginas. |
| `assets/fotos/*.webp` | 32 fotos da chácara + `hero.webp`. |
| `assets/socorro/*.webp` | 24 fotos das atrações de Socorro. |
| `assets/img/bruna.jpg` | Foto da anfitriã. |
| `IMAGENS/` | Fotos originais em AVIF enviadas pelo cliente. Fora do Git e do deploy. |

Fotos por categoria: `piscina-01..14`, `exterior-01..09`, `sala-01..03`, `cozinha-01`,
`banheiro-01..02`, `quarto1-01`, `quarto2-01`, `quarto3-01`. Todas em WebP.

## Regras de estilo definidas pelo cliente

Seguir sempre, em qualquer alteração futura:

1. **Nunca mencionar o Airbnb** em nenhum texto, link ou metadado.
2. **Sem emojis.**
3. **Sem travessões** (`—` ou `–`). Usar vírgula, ponto ou parênteses.
4. **Sem riscos/linhas decorativas antes de títulos.**
5. **Sem texto dentro das imagens.** Nada de legenda sobreposta à foto.
6. **Letras não muito grandes.** Base 15,5px.
7. **Tudo simétrico e proporcional**: nos blocos de duas colunas, texto e imagem começam
   e terminam exatamente na mesma linha (`align-items:stretch` + imagem com `height:100%`).
8. **Setas do carrossel fora da imagem**, na coluna do texto, sem círculo, bem pequenas.
9. **Responsivo obrigatório** para desktop, tablet e mobile.
10. Paleta **quente do pôr do sol**, tirada da foto do hero.

## Design system

- Fontes: `Fraunces` (títulos) e `Plus Jakarta Sans` (texto), via Google Fonts.
- Paleta extraída de `assets/fotos/hero.webp`: `--sol-900` (#2A1A12, marrom quase preto)
  até `--sol-50` (#FDF6EE, creme), mais `--agua` (#3E8E96, o azul da piscina),
  `--dourado` (#F5A623), `--borda`, `--texto`, `--texto-suave`, `--papel`, `--max` (1160px).
- Breakpoints: 1080px, 900px (tablet), 760px (menu hambúrguer), 560px (mobile).
- Animações de entrada via classe `.rv` + IntersectionObserver, atraso em `data-d="1..4"`.

## Estrutura do index.html

1. Nav transparente sobre o hero, texto branco. Ao rolar 60px ganha `.solid` (vidro claro,
   texto escuro). Links centralizados, sem logo/ícone no topo.
2. Hero de tela cheia: conteúdo à esquerda com degradê só do lado esquerdo no PC,
   centralizado com degradê vertical no mobile.
3. Faixa animada de benefícios, palavras separadas por bolinha.
4. `#espaco`: texto + foto em colunas de altura idêntica.
5. Diferenciais, 6 cards em `.grid-3`.
6. `#galeria`: 4 blocos de categoria (Piscina e deck, Rancho e área gourmet, Sala e cozinha,
   Terreno e vista). Cada bloco tem número, título, texto, chips e carrossel.
7. `#comodidades`: faixa animada em 2 linhas opostas + bloco do pomar.
8. Quartos: carrossel de 5 fotos (3 quartos + 2 banheiros) com lista lateral que navega.
9. `#avaliacoes`: carrossel com as 22 avaliações em duas linhas opostas, cards retangulares.
10. Anfitriã: foto à esquerda, texto à direita, conjunto centralizado.
11. Chamada para `o-que-fazer.html`.
12. `#localizacao`: Google Maps embutido, iframe mais alto para cortar a barra de créditos.
13. Regras, FAQ (abre pop-up), CTA final, rodapé e botão flutuante de WhatsApp.

## Carrosséis

Qualquer elemento com `data-car` vira um carrossel. Dentro dele o JS procura
`.car-trilho`, `.car-slide`, `.car-prev`, `.car-next`, `.car-pontos` e `.car-contador`,
que podem estar em qualquer lugar do bloco, inclusive em outra coluna.
Um botão externo com `data-alvo="<id>"` e `data-ir="<n>"` navega o carrossel de id `<id>`.

## Pop-ups (glassmorphism)

- **`#modalReserva`**: abre em `data-modal="reserva"`. Datas, hóspedes, perfil, nome e
  observação. Monta a prévia da mensagem em tempo real e abre o `wa.me` preenchido.
- **`#modalFaq`**: abre em `data-modal="faq"`, aceita `data-faq="N"` para já expandir a
  pergunta N. 9 perguntas.

Fechar: X, botão Voltar, clique fora ou ESC (`data-fechar`).

## Dados fixos do imóvel

- 10 hóspedes, 3 quartos, 5 camas, 2 banheiros, terreno de 2.000 m²
- Quartos 1 e 2: cama de casal. Quarto 3: cama de casal + beliche com 2 colchões
- Sala com 2 sofás e 1 sofá-cama, cozinha completa, 2 geladeiras, 1 freezer,
  fogão e forno a lenha, cooktop
- Rancho com churrasqueira, mesa de madeira grande e mesa de sinuca
- Piscina com deck, Wi-Fi, TV, ventilador nos quartos, terreno alambrado,
  acesso asfaltado, estacionamento amplo, pet friendly
- Não fornece roupa de cama nem toalhas
- Check-in 16h, checkout 14h
- 22 avaliações reais no array `avaliacoes` do `site.js`
- Pomar: limão, abacate, caqui, pitaya, romã, maracujá, amora, pitanga, goiaba, uva,
  mandioca, banana, ameixa, maçã, castanha, manga

## Contato

WhatsApp **+55 19 99401-3782**, no código como `5519994013782` (constante `WHATS` no JS
e nos links diretos do rodapé e do botão flutuante).

## Deploy

- Repositório: `https://github.com/kaaiquemorais/BRUNACHACARA.git`
- Netlify: projeto `brunachacara`, publish dir na raiz.
