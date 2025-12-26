import fs from 'fs';
import path from 'path';

export interface BuildMetadata {
  lastBuildTime: string;
  buildNumber: string;
  deploymentUrl: string;
  totalPosts: number;
  posts: Array<{
    filename: string;
    lastModified: string;
    size: number;
  }>;
}

/**
 * Get build metadata generated during build process
 */
export function getBuildMetadata(): BuildMetadata | null {
  try {
    const metadataPath = path.join(process.cwd(), 'build-metadata.json');
    if (!fs.existsSync(metadataPath)) {
      return null;
    }
    const data = fs.readFileSync(metadataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.warn('Could not read build metadata:', error);
    return null;
  }
}

/**
 * Get last build time or current time as fallback
 */
export function getLastBuildTime(): Date {
  const metadata = getBuildMetadata();
  return metadata ? new Date(metadata.lastBuildTime) : new Date();
}
