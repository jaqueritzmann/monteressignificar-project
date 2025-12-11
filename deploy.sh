#!/bin/bash

# Script de deploy para Hostinger
# Este script configura o Git para lidar com branches divergentes
# e faz o pull do repositório

set -e  # Para o script se houver erro

echo "🚀 Iniciando deploy..."

# Configurar Git para usar merge ao invés de rebase quando houver branches divergentes
# Isso evita o erro "Need to specify how to reconcile divergent branches"
git config pull.rebase false

# Alternativamente, você pode usar:
# git config pull.rebase true   # para usar rebase
# git config pull.ff only        # para permitir apenas fast-forward

# Fazer pull do repositório
echo "📥 Fazendo pull do repositório..."
git pull origin main

echo "✅ Deploy concluído com sucesso!"
