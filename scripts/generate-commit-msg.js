import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Get git status
function getGitStatus() {
  try {
    const status = execSync('git status --short', { encoding: 'utf8', cwd: rootDir });
    return status.trim().split('\n').filter(line => line.trim());
  } catch (error) {
    return [];
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

// Analyze changes and generate commit message
function generateCommitMessage() {
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

// Main
try {
  const message = generateCommitMessage();
  console.log(message);
} catch (error) {
  console.error('Error generating commit message:', error.message);
  process.exit(1);
}
