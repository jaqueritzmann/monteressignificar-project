import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const indexHtmlPath = join(rootDir, 'index.html');

// Create a clean index.html for Vite build (without asset references)
const cleanIndexHTML = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Monte Ressignificar - ONG</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bree+Serif&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Caveat:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Hide body until correct script loads -->
    <style>
      body { opacity: 0; transition: opacity 0.2s; }
      body.loaded { opacity: 1; }
      /* Show error message if script fails */
      .error-message {
        display: none;
        padding: 20px;
        text-align: center;
        color: #A44819;
        font-family: 'DM Sans', sans-serif;
      }
      body.error .error-message { display: block; }
      body.error { opacity: 1 !important; }
    </style>

    <!-- Production assets will be injected by inject-assets.js after build -->
    <!-- This script is needed for Vite to bundle the app -->
    <script type="module" src="/src/main.jsx"></script>

    <!-- Environment detection (runs after scripts are parsed) -->
    <script>
      (function() {
        // Wait for DOM to be ready
        function init() {
          // Check if we're in development mode (Vite dev server)
          const isDev = window.location.hostname === 'localhost' ||
                        window.location.hostname === '127.0.0.1' ||
                        window.location.port === '5173' ||
                        window.location.port === '4173' ||
                        window.location.hostname === '';

          if (isDev) {
            // Remove production scripts BEFORE they load
            const prodScripts = document.querySelectorAll('script[data-production]');
            prodScripts.forEach(script => {
              script.remove();
            });

            // Remove production styles
            const prodStyles = document.querySelectorAll('link[href*="assets/index-"]');
            prodStyles.forEach(link => link.remove());

            // Load development script immediately
            const script = document.createElement('script');
            script.type = 'module';
            script.src = '/src/main.jsx';
            script.onload = function() {
              document.body.classList.add('loaded');
            };
            script.onerror = function() {
              console.error('Failed to load development script');
              document.body.classList.add('loaded', 'error');
            };
            document.head.appendChild(script);
          } else {
            // Production mode - wait for production scripts to load
            const prodScript = document.querySelector('script[data-production]');
            if (prodScript) {
              let scriptLoaded = false;
              prodScript.onload = function() {
                scriptLoaded = true;
                document.body.classList.add('loaded');
              };
              prodScript.onerror = function() {
                console.error('Failed to load production script:', prodScript.src);
                document.body.classList.add('loaded', 'error');
              };
              // Fallback in case onload doesn't fire (increase timeout)
              setTimeout(function() {
                if (!scriptLoaded) {
                  console.warn('Script load timeout, showing page anyway');
                  document.body.classList.add('loaded');
                }
              }, 2000);
            } else {
              console.warn('No production script found');
              document.body.classList.add('loaded', 'error');
            }
          }
        }

        // Run immediately - scripts are already in the DOM at this point
        // Use requestAnimationFrame to ensure DOM is fully parsed
        if (typeof requestAnimationFrame !== 'undefined') {
          requestAnimationFrame(function() {
            setTimeout(init, 0);
          });
        } else {
          setTimeout(init, 0);
        }
      })();
    </script>
  </head>
  <body>
    <div class="error-message">
      <h2>Erro ao carregar o site</h2>
      <p>Por favor, verifique se todos os arquivos foram enviados corretamente ao servidor.</p>
      <p>Abra o console do navegador (F12) para mais detalhes.</p>
    </div>
    <div id="root"></div>
  </body>
</html>`;

// Backup current index.html if it exists and has asset references
if (existsSync(indexHtmlPath)) {
  const currentContent = readFileSync(indexHtmlPath, 'utf8');
  if (currentContent.includes('assets/index-')) {
    // Save backup
    writeFileSync(join(rootDir, 'index.html.backup'), currentContent);
    console.log('💾 Backed up index.html');
  }
}

// Write clean index.html for build
writeFileSync(indexHtmlPath, cleanIndexHTML);
console.log('✅ Prepared clean index.html for build');
