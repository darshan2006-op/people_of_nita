const fs = require('fs');
const path = require('path');

/**
 * Updates build metadata for CI/CD deployments
 * Runs before each build to ensure fresh timestamps
 */

const POSTS_DIR = path.join(__dirname, '../posts');
const METADATA_FILE = path.join(__dirname, '../build-metadata.json');

function updateBuildMetadata() {
  const buildTime = new Date().toISOString();
  
  // Get all markdown files
  const files = fs.readdirSync(POSTS_DIR)
    .filter(file => file.endsWith('.md') && file !== 'README.md');
  
  const metadata = {
    lastBuildTime: buildTime,
    buildNumber: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
    deploymentUrl: process.env.VERCEL_URL || 'localhost',
    totalPosts: files.length,
    posts: files.map(file => {
      const filePath = path.join(POSTS_DIR, file);
      const stats = fs.statSync(filePath);
      return {
        filename: file,
        lastModified: stats.mtime.toISOString(),
        size: stats.size
      };
    })
  };
  
  // Write metadata file
  fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2));
  
  console.log('✅ Build metadata updated');
  console.log(`📅 Build time: ${buildTime}`);
  console.log(`📝 Total posts: ${files.length}`);
  console.log(`🔗 Deployment: ${metadata.deploymentUrl}`);
  
  return metadata;
}

// Run if called directly
if (require.main === module) {
  try {
    updateBuildMetadata();
  } catch (error) {
    console.error('❌ Error updating metadata:', error);
    process.exit(1);
  }
}

module.exports = { updateBuildMetadata };
