
/**
 * Extracts the main title from a filename by taking everything before the first comma
 * and removing the file extension
 */
export const extractMainTitle = (filename: string): string => {
  // Remove file extension
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  
  // Split by comma and take the first part (main title)
  const mainTitle = nameWithoutExt.split(',')[0].trim();
  
  return mainTitle || nameWithoutExt;
};
