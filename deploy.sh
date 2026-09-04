#!/usr/bin/env bash
#
# Deploy seguro da landing page da Chacara Vista Panoramica.
#
# POR QUE ESTE SCRIPT EXISTE
#
# O publish dir configurado no netlify.toml e a raiz do projeto, e o Netlify CLI
# sobe tudo o que encontra na pasta que recebe. O .gitignore nao vale para o
# deploy, so para o Git. Hoje a raiz contem:
#
#   crm/          projeto separado, com .env.local e credencial real do Supabase
#   IMAGENS/      material de origem do cliente, 44 MB
#
# Rodar "netlify deploy --prod" apontando para a raiz manda os dois para o ar.
# Este script publica apenas os arquivos versionados do site, tirados do ultimo
# commit, e so publica depois de conferir que nao ha segredo no meio.
#
# COMO USAR
#
#   ./deploy.sh              publica em producao
#   ./deploy.sh --previa     publica em URL de teste, sem mexer no site no ar
#   ./deploy.sh --conferir   so monta e confere o pacote, nao publica nada
#
set -euo pipefail

cd "$(dirname "$0")"

MODO="prod"
case "${1:-}" in
  --previa)   MODO="previa" ;;
  --conferir) MODO="conferir" ;;
esac

vermelho() { printf "\033[31m%s\033[0m\n" "$1"; }
verde()    { printf "\033[32m%s\033[0m\n" "$1"; }

# ---------------------------------------------------------------------------
# 1. So publica o que esta commitado
#
# O pacote e montado com "git archive HEAD". Se houver alteracao nao commitada,
# ela nao entraria no deploy e o site publicado ficaria diferente do que voce
# esta vendo aqui. Melhor parar e avisar do que publicar algo inesperado.
# ---------------------------------------------------------------------------
if [ -n "$(git status --porcelain)" ]; then
  vermelho "Ha alteracao nao commitada. O deploy sobe o ultimo commit, entao ela"
  vermelho "ficaria de fora. Faca o commit antes:"
  echo
  git status --short
  exit 1
fi

# ---------------------------------------------------------------------------
# 2. Monta o pacote a partir do ultimo commit
# ---------------------------------------------------------------------------
PACOTE="$(mktemp -d)"
trap 'rm -rf "$PACOTE"' EXIT

git archive HEAD | tar -x -C "$PACOTE"

# Documentacao interna e este proprio script nao sao site.
rm -f "$PACOTE/CLAUDE.md" "$PACOTE"/*.sh "$PACOTE/.gitignore" "$PACOTE/.gitattributes"

# ---------------------------------------------------------------------------
# 3. Trava de seguranca
#
# Confere o pacote antes de subir. Qualquer coisa suspeita aqui aborta o deploy.
# Esta checagem existe para o dia em que alguem mover um arquivo de lugar sem
# lembrar desta regra.
# ---------------------------------------------------------------------------
ERROS=0

# 3a. Pasta ou arquivo que nunca pode ir para o ar.
PROIBIDOS="$(find "$PACOTE" \( -name '.env*' -o -name 'CLAUDE.md' -o -name '*.sh' \
  -o -path '*/crm/*' -o -path '*/IMAGENS/*' -o -path '*/node_modules/*' \
  -o -name '*.sql' -o -name '*.pem' -o -name '*.key' \) -print)"
if [ -n "$PROIBIDOS" ]; then
  vermelho "Arquivo proibido dentro do pacote de deploy:"
  echo "$PROIBIDOS" | sed "s|$PACOTE|.|"
  ERROS=1
fi

# 3b. Conteudo com cara de credencial, dentro de qualquer arquivo de texto.
#     eyJ...        JWT, formato antigo de chave do Supabase
#     sb_secret_    chave secreta do Supabase, formato novo
#     service_role  chave que ignora o RLS
VAZAMENTO="$(grep -rlIE 'eyJ[A-Za-z0-9_-]{30,}|sb_secret_|service_role|SUPABASE_SECRET' \
  "$PACOTE" 2>/dev/null || true)"
if [ -n "$VAZAMENTO" ]; then
  vermelho "Possivel credencial dentro do pacote de deploy:"
  echo "$VAZAMENTO" | sed "s|$PACOTE|.|"
  ERROS=1
fi

if [ "$ERROS" -ne 0 ]; then
  vermelho "Deploy abortado. Nada foi publicado."
  exit 1
fi

verde "Pacote conferido: $(find "$PACOTE" -type f | wc -l | tr -d ' ') arquivos, $(du -sh "$PACOTE" | cut -f1)."

# ---------------------------------------------------------------------------
# 4. Publica
# ---------------------------------------------------------------------------
if [ "$MODO" = "conferir" ]; then
  verde "Modo conferencia: o pacote passou em todas as travas. Nada foi publicado."
  exit 0
fi

# O Netlify CLI e um programa Windows: converte o caminho antes de entregar.
PACOTE_CLI="$PACOTE"
if command -v cygpath >/dev/null 2>&1; then PACOTE_CLI="$(cygpath -w "$PACOTE")"; fi

MSG="$(git log -1 --format=%s)"

if [ "$MODO" = "prod" ]; then
  netlify deploy --prod --dir="$PACOTE_CLI" --message "$MSG"
else
  netlify deploy --dir="$PACOTE_CLI" --message "previa: $MSG"
fi

# ---------------------------------------------------------------------------
# 5. Confere o resultado no ar
# ---------------------------------------------------------------------------
if [ "$MODO" = "prod" ]; then
  echo
  echo "Conferindo o que ficou publico:"
  for caminho in /crm/.env.local /crm/package.json /CLAUDE.md /IMAGENS/ /deploy.sh; do
    codigo="$(curl -s -o /dev/null -w '%{http_code}' "https://brunachacara.netlify.app$caminho")"
    if [ "$codigo" = "404" ]; then
      verde "  $codigo  $caminho"
    else
      vermelho "  $codigo  $caminho  <= deveria ser 404, verificar agora"
    fi
  done
fi
