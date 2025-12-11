import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Free AI models for commit message generation
// Options:
// 1. Hugging Face (free, no API key needed for public models)
// 2. Groq (free, fast, requires API key - set GROQ_API_KEY env var)
const AI_MODELS = {
  HUGGING_FACE: 'https://api-inference.huggingface.co/models/Tavernari/git-commit-message',
  GROQ: 'https://api.groq.com/openai/v1/chat/completions',
  // Alternative Hugging Face: 'https://api-inference.huggingface.co/models/JosineyJr/generate-conventional-commit-messages'
};

// Check if fetch is available (Node 18+)
const hasFetch = typeof fetch !== 'undefined';

// Get git status
function getGitStatus() {
  try {
    const status = execSync('git status --short', { encoding: 'utf8', cwd: rootDir });
    return status.trim().split('\n').filter(line => line.trim());
  } catch (error) {
    return [];
  }
}

// Get git diff (full diff, not just stats)
function getGitDiff() {
  try {
    const diff = execSync('git diff --cached 2>/dev/null || git diff', {
      encoding: 'utf8',
      cwd: rootDir,
      maxBuffer: 10 * 1024 * 1024 // 10MB buffer
    });
    return diff.trim();
  } catch (error) {
    return '';
  }
}

// Get git diff stats
function getDiffStats() {
  try {
    const stats = execSync('git diff --stat --cached 2>/dev/null || git diff --stat', {
      encoding: 'utf8',
      cwd: rootDir
    });
    return stats.trim();
  } catch (error) {
    return '';
  }
}

// Generate commit message using Groq API (free, fast)
async function generateWithGroq(diff) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || !hasFetch) return null;

  try {
    const maxLength = 4000;
    const truncatedDiff = diff.length > maxLength 
      ? diff.substring(0, maxLength) + '\n... (truncated)'
      : diff;

    const prompt = `Analise as seguintes mudanças no código e gere uma mensagem de commit no formato Conventional Commits em português (Brasil). Seja conciso e descritivo:\n\n${truncatedDiff}\n\nMensagem de commit:`;

    const response = await fetch(AI_MODELS.GROQ, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente especializado em gerar mensagens de commit no formato Conventional Commits. Seja conciso e preciso.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 100
      })
    });

    if (!response.ok) return null;

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content?.trim();
    
    return message || null;
  } catch (error) {
    return null;
  }
}

// Generate commit message using Hugging Face API (free, no API key needed)
async function generateWithHuggingFace(diff) {
  if (!hasFetch) return null;

  try {
    // Truncate diff if too long (API limits)
    const maxLength = 2000;
    const truncatedDiff = diff.length > maxLength 
      ? diff.substring(0, maxLength) + '\n... (truncated)'
      : diff;

    const prompt = `Generate a conventional commit message in Portuguese (Brazil) for these changes:\n\n${truncatedDiff}\n\nCommit message:`;

    const response = await fetch(AI_MODELS.HUGGING_FACE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.7,
          return_full_text: false
        }
      })
    });

    if (!response.ok) {
      if (response.status === 503) {
        // Model is loading, fallback to local generation
        return null;
      }
      return null;
    }

    const data = await response.json();
    
    // Extract generated text from response
    let message = '';
    if (Array.isArray(data) && data[0]?.generated_text) {
      message = data[0].generated_text.trim();
    } else if (data.generated_text) {
      message = data.generated_text.trim();
    } else if (typeof data === 'string') {
      message = data.trim();
    }

    // Clean up the message (remove prompt if included)
    message = message.replace(prompt, '').trim();
    message = message.split('\n')[0]; // Take first line only

    return message || null;
  } catch (error) {
    return null;
  }
}

// Try AI generation (Groq first, then Hugging Face)
async function generateWithAI(diff) {
  // Try Groq first (faster, requires API key)
  const groqMessage = await generateWithGroq(diff);
  if (groqMessage) return groqMessage;

  // Fallback to Hugging Face (slower, no API key needed)
  const hfMessage = await generateWithHuggingFace(diff);
  return hfMessage;
}

// Analyze changes and generate commit message (local fallback)
function generateCommitMessageLocal() {
  const changes = getGitStatus();

  if (changes.length === 0) {
    return 'chore: no changes to commit';
  }

  const categories = {
    feat: [],
    fix: [],
    refactor: [],
    build: [],
    docs: [],
    style: [],
    test: [],
    chore: []
  };

  let hasAssets = false;
  let hasSource = false;
  let hasConfig = false;
  let hasBuild = false;
  let componentChanges = [];

  changes.forEach(change => {
    const [status, ...fileParts] = change.trim().split(/\s+/);
    const file = fileParts.join(' ');

    // Analyze file type
    if (file.includes('assets/') || file.includes('dist/')) {
      hasAssets = true;
      hasBuild = true;
    } else if (file.includes('src/')) {
      hasSource = true;
      if (file.includes('components/')) {
        const component = file.split('/').pop().replace('.jsx', '').replace('.js', '');
        componentChanges.push(component);
      }
    } else if (file.includes('package.json') || file.includes('vite.config') ||
      file.includes('tailwind.config') || file.includes('Makefile') ||
      file.includes('scripts/')) {
      hasConfig = true;
    }

    // Categorize by file
    if (file.includes('assets/') || file.includes('dist/') || file.includes('index.html')) {
      categories.build.push('build artifacts');
    } else if (file.includes('src/components/')) {
      const component = file.split('/').pop().replace('.jsx', '').replace('.js', '');
      categories.feat.push(`update ${component} component`);
    } else if (file.includes('src/')) {
      categories.refactor.push('source code changes');
    } else if (file.includes('scripts/')) {
      categories.build.push('build scripts');
    } else if (file.includes('Makefile')) {
      categories.build.push('automation');
    } else if (file.includes('package.json')) {
      categories.build.push('dependencies');
    } else if (file.includes('.config.')) {
      categories.build.push('configuration');
    } else {
      categories.chore.push('project files');
    }
  });

  // Generate message based on analysis
  let type = 'chore';
  let scope = '';
  let description = '';

  if (hasBuild && hasAssets) {
    type = 'build';
    description = 'production build';
  } else if (hasSource && componentChanges.length > 0) {
    type = 'feat';
    if (componentChanges.length === 1) {
      scope = componentChanges[0];
      description = 'component update';
    } else {
      description = `update ${componentChanges.length} components`;
    }
  } else if (hasSource) {
    type = 'refactor';
    description = 'code changes';
  } else if (hasConfig) {
    type = 'build';
    description = 'configuration update';
  } else {
    type = 'chore';
    description = 'project maintenance';
  }

  // Build commit message
  let message = type;
  if (scope) {
    message += `(${scope})`;
  }
  message += `: ${description}`;

  // Add details if multiple changes
  if (componentChanges.length > 1) {
    message += `\n\nUpdated components: ${componentChanges.join(', ')}`;
  }

  // Add timestamp for build commits
  if (hasBuild && hasAssets) {
    const date = new Date().toLocaleString('pt-BR');
    message += `\n\nBuild generated at ${date}`;
  }

  return message;
}

// Main function - tries AI first, falls back to local
async function generateCommitMessage() {
  const changes = getGitStatus();
  
  if (changes.length === 0) {
    return 'chore: no changes to commit';
  }

  // Try AI generation if diff is available and fetch is supported
  if (hasFetch) {
    const diff = getGitDiff();
    if (diff && diff.length > 0) {
      try {
        const aiMessage = await generateWithAI(diff);
        if (aiMessage) {
          return aiMessage;
        }
      } catch (error) {
        // Fall through to local generation
      }
    }
  }

  // Fallback to local generation
  return generateCommitMessageLocal();
}

// Main
(async () => {
  try {
    const message = await generateCommitMessage();
    console.log(message);
  } catch (error) {
    console.error('Error generating commit message:', error.message);
    process.exit(1);
  }
})();
