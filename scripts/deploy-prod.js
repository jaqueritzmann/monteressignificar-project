import { copyFileSync, mkdirSync, readdirSync, statSync, rmSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

// Function to copy directory recursively
function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      // Remove existing file before copying to ensure it's updated
      if (existsSync(destPath)) {
        rmSync(destPath, { force: true });
      }
      copyFileSync(srcPath, destPath);
    }
  }
}

// Function to remove directory recursively
function removeDir(dir) {
  try {
    if (existsSync(dir)) {
      const stat = statSync(dir);
      if (stat.isDirectory()) {
        // Remove all contents first, then the directory itself
        const entries = readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const entryPath = join(dir, entry.name);
          if (entry.isDirectory()) {
            removeDir(entryPath);
          } else {
            rmSync(entryPath, { force: true });
          }
        }
        // Remove the directory itself
        rmSync(dir, { recursive: true, force: true });
      } else {
        rmSync(dir, { force: true });
      }
    }
  } catch (error) {
    console.warn(`⚠️  Could not remove ${dir}:`, error.message);
    // Try one more time with force
    try {
      rmSync(dir, { recursive: true, force: true });
    } catch (retryError) {
      console.warn(`⚠️  Retry failed for ${dir}:`, retryError.message);
    }
  }
}

console.log('🚀 Deploying dist to root for PRODUCTION (static files)...');

try {
  // Always remove assets directory in root before copying to ensure clean state
  const assetsDir = join(rootDir, 'assets');
  if (existsSync(assetsDir)) {
    console.log('🧹 Removing existing assets directory...');
    // Force complete removal - remove all files first, then directory
    try {
      // Remove all files and subdirectories
      const entries = readdirSync(assetsDir, { withFileTypes: true });
      for (const entry of entries) {
        const entryPath = join(assetsDir, entry.name);
        if (entry.isDirectory()) {
          rmSync(entryPath, { recursive: true, force: true });
        } else {
          rmSync(entryPath, { force: true });
        }
      }
      // Remove the directory itself
      rmSync(assetsDir, { recursive: true, force: true });
    } catch (error) {
      console.warn(`⚠️  Error removing assets directory:`, error.message);
      // Try alternative method
      removeDir(assetsDir);
    }
  }

  // Check if dist directory exists
  if (!existsSync(distDir) || !statSync(distDir).isDirectory()) {
    console.error('❌ Error: dist directory not found. Run "npm run build:only" first.');
    process.exit(1);
  }

  // Note: index.html is already processed by inject-assets.js
  // It now works in both development and production modes

  // Get all files and directories in dist
  const entries = readdirSync(distDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(distDir, entry.name);
    const destPath = join(rootDir, entry.name);

    try {
      if (entry.isDirectory()) {
        // Remove existing directory completely before copying to ensure clean state
        // This is especially important for assets/ which may have old files with different hashes
        if (existsSync(destPath)) {
          console.log(`🧹 Cleaning existing directory: ${entry.name}`);
          removeDir(destPath);
        }
        copyDir(srcPath, destPath);
        console.log(`✅ Copied directory: ${entry.name}`);
      } else {
        // Skip index.html - it's already been processed by inject-assets.js
        if (entry.name === 'index.html') {
          console.log(`⏭️  Skipping index.html (already processed by inject-assets)`);
          continue;
        }
        // For production: copy all other files
        if (existsSync(destPath)) {
          rmSync(destPath, { force: true });
        }
        copyFileSync(srcPath, destPath);
        console.log(`✅ Copied file: ${entry.name}`);
      }
    } catch (error) {
      console.warn(`⚠️  Could not copy ${entry.name}:`, error.message);
    }
  }

  console.log('✨ Production deployment complete!');
  console.log('📦 All static files are ready in root directory.');
  console.log('🌐 You can now upload these files to your static hosting server.');
  console.log('');
  console.log('💡 The index.html works in both development and production!');
  console.log('   - Development: npm run dev (auto-detects and uses /src/main.jsx)');
  console.log('   - Production: Serves static files from /assets/');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}

