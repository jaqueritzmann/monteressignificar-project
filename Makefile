.PHONY: help install dev build clean deploy rollout preview test check commit-msg

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

# Default target
.DEFAULT_GOAL := help

##@ Help

help: ## Mostra esta mensagem de ajuda
	@echo "$(BLUE)╔════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(BLUE)║  Monte Ressignificar - Comandos Disponíveis              ║$(NC)"
	@echo "$(BLUE)╚════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"; printf "\n$(GREEN)Comandos disponíveis:$(NC)\n\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  $(BLUE)%-15s$(NC) %s\n", $$1, $$2 } /^##@/ { printf "\n$(YELLOW)%s$(NC)\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
	@echo ""

##@ Desenvolvimento

install: ## Instala as dependências do projeto
	@echo "$(BLUE)📦 Instalando dependências...$(NC)"
	@npm install
	@echo "$(GREEN)✅ Dependências instaladas!$(NC)"

dev: ## Inicia o servidor de desenvolvimento (instala dependências apenas se necessário)
	@if [ ! -d "node_modules" ]; then \
		echo "$(BLUE)📦 Instalando dependências...$(NC)"; \
		npm install; \
		echo "$(GREEN)✅ Dependências instaladas!$(NC)"; \
	else \
		echo "$(GREEN)✅ Dependências já instaladas (pulando npm install)$(NC)"; \
	fi
	@echo ""
	@echo "$(BLUE)🚀 Iniciando servidor de desenvolvimento...$(NC)"
	@npm run dev

preview: ## Visualiza o build de produção localmente
	@echo "$(BLUE)👁️  Iniciando preview do build...$(NC)"
	@npm run preview

##@ Build

build: ## Faz o build completo para produção (limpa dist antes)
	@echo "$(BLUE)🔨 Fazendo build para produção...$(NC)"
	@npm run build
	@echo "$(GREEN)✅ Build concluído!$(NC)"

build-fast: ## Faz build rápido sem limpar cache (mais rápido para desenvolvimento)
	@echo "$(BLUE)⚡ Fazendo build rápido (sem limpar cache)...$(NC)"
	@npm run build:fast
	@echo "$(GREEN)✅ Build rápido concluído!$(NC)"

build-only: ## Faz apenas o build sem deploy
	@echo "$(BLUE)🔨 Fazendo build (sem deploy)...$(NC)"
	@npm run build:only
	@echo "$(GREEN)✅ Build concluído!$(NC)"

##@ Limpeza

clean: ## Remove arquivos temporários (dist apenas, mantém cache)
	@echo "$(YELLOW)🧹 Limpando arquivos temporários...$(NC)"
	@npm run clean
	@echo "$(GREEN)✅ Limpeza concluída!$(NC)"

clean-cache: ## Remove cache do Vite (use quando houver problemas com cache)
	@echo "$(YELLOW)🧹 Limpando cache do Vite...$(NC)"
	@npm run clean:cache
	@echo "$(GREEN)✅ Cache limpo!$(NC)"

clean-all: clean clean-cache ## Remove tudo incluindo node_modules e assets
	@echo "$(YELLOW)🧹 Limpando tudo (node_modules, assets, dist)...$(NC)"
	@rm -rf node_modules
	@rm -rf assets
	@rm -f index.html.backup
	@echo "$(GREEN)✅ Limpeza completa concluída!$(NC)"


##@ Deploy e Rollout

deploy: build ## Faz build e prepara para deploy
	@echo "$(GREEN)✅ Build concluído e pronto para deploy!$(NC)"
	@echo "$(BLUE)📝 Arquivos de produção estão na raiz do projeto$(NC)"
	@echo "$(YELLOW)💡 Execute 'make rollout' para fazer o deploy via Git$(NC)"

rollout: ## Faz o rollout completo (build + git commit + push)
	@echo "$(BLUE)🚀 Iniciando rollout completo...$(NC)"
	@echo ""
	@echo "$(YELLOW)1️⃣  Fazendo build...$(NC)"
	@$(MAKE) build
	@echo ""
	@echo "$(YELLOW)2️⃣  Verificando status do Git...$(NC)"
	@git status --short || true
	@echo ""
	@read -p "$(YELLOW)3️⃣  Deseja fazer commit e push? (s/N): $(NC)" confirm && \
	if [ "$$confirm" = "s" ] || [ "$$confirm" = "S" ]; then \
		echo "$(BLUE)🤖 Gerando mensagem de commit com IA...$(NC)"; \
		git add -A; \
		MSG=$$(node scripts/generate-commit-msg.js); \
		echo "$(GREEN)📝 Mensagem gerada:$(NC)"; \
		echo "$$MSG"; \
		echo ""; \
		read -p "$(YELLOW)   Usar esta mensagem? (S/n): $(NC)" useMsg; \
		if [ "$$useMsg" != "n" ] && [ "$$useMsg" != "N" ]; then \
			git commit -m "$$MSG" || echo "$(RED)⚠️  Nenhuma mudança para commitar$(NC)"; \
		else \
			read -p "$(YELLOW)   Digite a mensagem do commit: $(NC)" customMsg && \
			git commit -m "$$customMsg" || echo "$(RED)⚠️  Nenhuma mudança para commitar$(NC)"; \
		fi; \
		echo "$(BLUE)📤 Fazendo push...$(NC)"; \
		git push origin main || git push origin master; \
		echo "$(GREEN)✅ Rollout concluído!$(NC)"; \
	else \
		echo "$(YELLOW)⏭️  Rollout cancelado. Build está pronto para commit manual.$(NC)"; \
	fi

rollout-auto: build ## Faz rollout automático sem confirmação (usa mensagem gerada por IA)
	@echo "$(BLUE)🚀 Iniciando rollout automático...$(NC)"
	@git add -A
	@echo "$(BLUE)🤖 Gerando mensagem de commit com IA...$(NC)"
	@MSG=$$(node scripts/generate-commit-msg.js); \
	echo "$(GREEN)📝 Mensagem: $$MSG$(NC)"; \
	git commit -m "$$MSG" || echo "$(YELLOW)⚠️  Nenhuma mudança para commitar$(NC)"
	@git push origin main || git push origin master
	@echo "$(GREEN)✅ Rollout automático concluído!$(NC)"

commit-msg: ## Gera uma mensagem de commit usando IA (sem fazer commit)
	@echo "$(BLUE)🤖 Analisando mudanças e gerando mensagem de commit...$(NC)"
	@echo ""
	@node scripts/generate-commit-msg.js
	@echo ""

rollout-server: ## Executa deploy no servidor (via deploy.sh)
	@echo "$(BLUE)🚀 Executando deploy no servidor...$(NC)"
	@if [ -f deploy.sh ]; then \
		chmod +x deploy.sh; \
		./deploy.sh; \
	else \
		echo "$(RED)❌ Arquivo deploy.sh não encontrado!$(NC)"; \
		exit 1; \
	fi

##@ Verificação

check: ## Verifica se há problemas no código
	@echo "$(BLUE)🔍 Verificando código...$(NC)"
	@npm run build:only || echo "$(RED)❌ Build falhou!$(NC)"
	@echo "$(GREEN)✅ Verificação concluída!$(NC)"

status: ## Mostra status do Git e arquivos de produção
	@echo "$(BLUE)📊 Status do projeto:$(NC)"
	@echo ""
	@echo "$(YELLOW)Git Status:$(NC)"
	@git status --short || echo "  (não é um repositório Git)"
	@echo ""
	@echo "$(YELLOW)Arquivos de produção:$(NC)"
	@if [ -d "assets" ]; then \
		echo "  ✅ Pasta assets/ existe"; \
		ls -lh assets/*.js assets/*.css 2>/dev/null | awk '{print "    - " $$9 " (" $$5 ")"}'; \
	else \
		echo "  ❌ Pasta assets/ não existe"; \
	fi
	@if [ -f "index.html" ]; then \
		echo "  ✅ index.html existe"; \
	else \
		echo "  ❌ index.html não existe"; \
	fi

##@ Utilitários

commit-msg: ## Gera uma mensagem de commit usando IA (sem fazer commit)
	@echo "$(BLUE)🤖 Analisando mudanças e gerando mensagem de commit...$(NC)"
	@echo ""
	@node scripts/generate-commit-msg.js
	@echo ""

info: ## Mostra informações do projeto
	@echo "$(BLUE)ℹ️  Informações do projeto:$(NC)"
	@echo ""
	@echo "  Nome: $(shell node -p "require('./package.json').name")"
	@echo "  Versão: $(shell node -p "require('./package.json').version")"
	@echo "  Node: $(shell node --version)"
	@echo "  NPM: $(shell npm --version)"
	@echo ""

test-build: build ## Testa se o build funciona corretamente
	@echo "$(GREEN)✅ Build testado com sucesso!$(NC)"
