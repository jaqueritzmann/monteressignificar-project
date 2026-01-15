# Site ONG - Monte Ressignificar

Landing page responsiva desenvolvida em React com Tailwind CSS.

## 🚀 Como executar

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse no navegador:
```
http://localhost:5173
```

## 📦 Build e Deploy

### Desenvolvimento Local
```bash
npm run dev
```
- Usa `index.html` da raiz com HMR (Hot Module Replacement)
- Alterações refletem automaticamente no navegador

### Build para Produção Estática
```bash
npm run build
```
- Gera arquivos estáticos otimizados
- **Cria um `index.html` universal** que funciona em desenvolvimento e produção
- Injeta automaticamente os arquivos de produção quando disponíveis
- Em desenvolvimento, carrega automaticamente `/src/main.jsx`
- Pronto para upload em servidor estático

**✨ Não precisa mais alternar entre ambientes!** O mesmo `index.html` funciona nos dois casos.

### Apenas Build (sem deploy)
```bash
npm run build:only
```
- Apenas gera os arquivos em `dist/` sem copiar para a raiz
- Útil para testar o build antes de fazer deploy

### Workflow com Git
Os arquivos de produção são mantidos no repositório:
- `assets/` - Arquivos JS/CSS buildados
- `img/` - Imagens de produção
- `index.html` - Versão universal (funciona em dev e prod)

**Processo:**
1. **Desenvolver localmente:** `npm run dev`
   - O `index.html` detecta automaticamente e usa `/src/main.jsx`
2. **Fazer build e deploy:** `npm run build`
   - Injeta os arquivos de produção no `index.html`
   - O mesmo arquivo funciona em ambos os ambientes
3. **Commitar tudo:** `git add . && git commit -m "Deploy produção"`
4. **Push:** `git push`

O servidor estático pode fazer `git pull` e servir os arquivos diretamente.

**✨ Vantagem:** O mesmo `index.html` funciona em desenvolvimento e produção! Não precisa mais alternar entre versões.

## 🎨 Estrutura do Projeto

```
src/
  components/
    Hero.jsx          - Seção hero com imagem e botões
    About.jsx         - Seção sobre nós
    Projects.jsx      - Grid de projetos
    Team.jsx          - Cards da equipe
    HowToHelp.jsx     - Formas de ajudar
    CallToAction.jsx  - Bloco de chamada para ação
    PixSection.jsx    - Seção de doação via PIX
    Footer.jsx        - Rodapé com links e contato
  App.jsx             - Componente principal
  main.jsx            - Entry point
  index.css           - Estilos globais
```

## 🎨 Paleta de Cores

- Fundo principal: `#FFEFD4`
- Destaque primário: `#A44819`
- Destaque secundário: `#F8B82D`
- Verde PIX: `#00A859`

## 📱 Responsividade

- Mobile: < 768px (1 coluna)
- Tablet: 768px - 1024px (2 colunas)
- Desktop: > 1px (3 colunas onde aplicável)

## 🎯 Favicon

O projeto utiliza favicons PNG otimizados em múltiplos tamanhos. O arquivo `public/favicon.ico` atual é um PNG renomeado (temporário).

### Criar favicon.ico real (multi-size)

Para gerar um arquivo `.ico` real com múltiplos tamanhos (16x16, 32x32, 48x48):

1. **Usando favicon.io (recomendado):**
   - Acesse: https://favicon.io/favicon-converter/
   - Faça upload de `public/favicon-32x32.png` ou `public/img/logo512.png`
   - Baixe o arquivo `favicon.ico` gerado
   - Substitua `public/favicon.ico` pelo arquivo baixado

2. **Alternativa - Online:**
   - https://www.favicon-generator.org/
   - https://realfavicongenerator.net/

**Nota:** Os favicons PNG (16x16, 32x32) já estão configurados e funcionam corretamente. O arquivo `.ico` é opcional para compatibilidade com navegadores mais antigos.
