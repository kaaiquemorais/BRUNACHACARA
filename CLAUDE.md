# CLAUDE.md

Contexto do projeto para retomar o trabalho sem reler o histórico da conversa.

## O que é

Duas coisas, no mesmo diretório mas independentes:

1. **Landing page** da **Chácara Vista Panorâmica**, casa de temporada em Socorro/SP,
   bairro Rio do Peixe. Site estático, sem build. Objetivo: captar reservas via WhatsApp.
2. **CRM** em `crm/`, projeto Next.js separado, com o seu próprio README e deploy.
   Ver `crm/ARQUITETURA.md`.

## Arquivos da landing page

| Caminho | O que é |
|---|---|
| `index.html` | Landing page principal. |
| `o-que-fazer.html` | Página com as 24 atrações de Socorro. |
| `404.html` | Página de erro, na identidade do site. Alvo dos redirects do Netlify. |
| `assets/css/style.css` | Toda a folha de estilo, usada pelas duas páginas. |
| `assets/js/site.js` | Todo o JavaScript, usado pelas duas páginas. |
| `assets/fotos/*.webp` | 32 fotos da chácara + `hero.webp`. |
| `assets/socorro/*.webp` | 24 fotos das atrações de Socorro. |
| `assets/img/bruna.webp` | Foto da anfitriã. |
| `IMAGENS/` | Material de origem. Fora do Git e bloqueado no deploy. |
| `IMAGENS/ORIGINAIS-SITE/` | Imagens originais da hero e da anfitriã, em alta. |
| `crm/` | Projeto do CRM. Fora do Git deste repositório. |

**Toda imagem do site é WebP**, sem exceção. Original novo vai para
`IMAGENS/ORIGINAIS-SITE/`, nunca para a raiz do projeto: a raiz é publicada.

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
11. **No mobile, tudo centralizado.** Exceções deliberadas: o campo de observação do
    formulário e a prévia da mensagem do WhatsApp, que são texto de várias linhas.
12. **Copy em registro profissional**, sem gíria e sem coloquialismo. As regras da casa
    ficam no infinitivo ("Tomar uma ducha antes de entrar"), não no imperativo.

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
   Terreno e vista). Cada bloco tem título, texto, chips e carrossel, sem numeração.
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

Anfitriã: **Bruna Mazeto**. WhatsApp **+55 19 99401-3782**, no código como `5519994013782` (constante `WHATS` no JS
e nos links diretos do rodapé e do botão flutuante).

## Deploy da landing page

- Repositório: `https://github.com/kaaiquemorais/BRUNACHACARA.git`
- Netlify: projeto `brunachacara`, publish dir na raiz.
- O site **não** tem deploy automático pelo GitHub. O push não publica nada.
  Publicar é sempre um passo manual e explícito.

### Publicar é só isto

```bash
./deploy.sh              # produção
./deploy.sh --previa     # URL de teste, não mexe no site no ar
./deploy.sh --conferir   # só monta e confere o pacote, não publica
```

**Nunca rodar `netlify deploy --prod` apontando para a raiz.** O `deploy.sh` existe
justamente para impedir isso, e a explicação está no item seguinte.

### Por que não se publica a raiz

O publish dir é a raiz, então **o Netlify sobe tudo o que está na pasta**, inclusive o
que o `.gitignore` ignora: o `.gitignore` vale para o Git, não para o deploy. E a raiz
hoje contém `crm/`, que tem `.env.local` com credencial real do Supabase, e `IMAGENS/`,
com o material de origem do cliente.

Isso já aconteceu. Os deploys de 13 e 14 de agosto de 2026 subiram a pasta `crm/` inteira:
`/crm/package.json`, `/crm/src/**` e a documentação do CRM ficaram públicos nas URLs
daqueles deploys. **Nenhuma credencial vazou**, porque o Netlify CLI pula arquivos e
pastas que começam com ponto (`.env.local`, `.next`) e pula `node_modules`. Foi sorte da
convenção de nome, não proteção de verdade: um arquivo de segredo sem ponto no nome teria
ido ao ar. Verificado arquivo por arquivo em 4 de setembro de 2026.

O `deploy.sh` fecha esse buraco montando o pacote com `git archive HEAD`, ou seja, só o
que está versionado neste repositório, e abortando se encontrar `.env*`, `crm/`,
`IMAGENS/`, `node_modules/`, `.sql`, `.pem`, `.key` ou qualquer texto parecido com
credencial (`eyJ...`, `sb_secret_`, `service_role`).

### Redirects do netlify.toml

São a **segunda** linha de defesa, para o caso de alguém publicar a raiz por engano.
Devolvem 404 para `/IMAGENS/*`, `/CLAUDE.md`, `/crm/*`, `/.env*` e `/node_modules/*`.

Duas armadilhas descobertas testando contra o site publicado:

1. `force = true` é obrigatório no redirect, senão um arquivo que existe de verdade
   naquele caminho vence a regra.
2. O splat precisa ser o **fim** do padrão. `/*.jpg` e `/*.md` não pegam nada. É por isso
   que todo material de origem mora dentro de `IMAGENS/`, bloqueada de uma vez só.

Redirect **não apaga o que já foi publicado**: cada deploy antigo continua servindo o
próprio conteúdo na URL `https://<id>--brunachacara.netlify.app`, com a configuração que
tinha na época. Regra nova só vale do deploy seguinte em diante.

## CRM (`crm/`)

Projeto Next.js 15 + TypeScript + Tailwind v4 + Supabase, independente da landing page.
Documentação própria em `crm/ARQUITETURA.md`, `crm/README.md` e `crm/SEGURANCA.md`.

- Repositório próprio, iniciado dentro de `crm/`. Fora do Git da landing page.
- Netlify: projeto `crmbruna`, em `https://crmbruna.netlify.app`.

**O build precisa rodar no Linux, pelo Netlify, não localmente.** O
`@netlify/plugin-nextjs` gera o handler do servidor com as barras invertidas do Windows,
e no runtime Linux `\v` e `\t` viram caracteres de escape: o deploy sobe e toda rota
dinâmica responde 502. Deploy local com `netlify deploy --build` não funciona a partir
do Windows.

Regra de ouro do código: nunca colocar credencial real em arquivo, exemplo ou commit.
A `SUPABASE_SECRET_KEY` ignora o RLS e é lida só em `src/lib/supabase/admin.ts`, que
importa `server-only` para o build quebrar se alguém a arrastar para o navegador.
