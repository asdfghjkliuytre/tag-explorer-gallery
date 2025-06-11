// Utility for intelligent tag processing and normalization

// Enhanced tag groupings with more comprehensive mapping
const TAG_GROUPINGS: Record<string, string> = {
  // Feminization variants
  'feminization': 'feminization',
  'femanization': 'feminization', 
  'femaization': 'feminization',
  'feamnization': 'feminization',
  'femanizaed': 'feminization',
  'femanized': 'feminization',
  'feminized': 'feminized',
  'femaized': 'feminized',
  'permanent feminization': 'permanent feminization',
  'permanent femanization': 'permanent feminization',
  'permanent feamnization': 'permanent feminization',
  'premanent femanization': 'permanent feminization',
  'permenent femanization': 'permanent feminization',
  'permenant femanization': 'permanent feminization',
  'forced feminization': 'forced feminization',
  'forced femanization': 'forced feminization',
  'forced femaization': 'forced feminization',
  
  // Gender transformation
  'male to female': 'male to female',
  'man to woman': 'male to female',
  'boy to girl': 'male to female',
  'man turned into woman': 'man turned into woman',
  'man turned into women': 'man turned into woman',
  'man into woman': 'man turned into woman',
  'turned into woman': 'man turned into woman',
  
  // Relationship changes
  'boyfriend to girlfriend': 'boyfriend to girlfriend',
  'bf to gf': 'boyfriend to girlfriend',
  'husband to wife': 'husband to wife',
  
  // Dressing scenarios
  'cheated into dress': 'cheated into dress',
  'cheated dress': 'cheated into dress',
  'forced into dress': 'cheated into dress',
  'dressed as a girl': 'dressed as a girl',
  'living as a girl': 'living as a girl',
  
  // Learning scenarios
  'learning to be a woman': 'learning to be a woman',
  'learning to be a women': 'learning to be a woman',
  'learnig to be a women': 'learning to be a woman',
  'learning to be an women': 'learning to be a woman',
  'learnig to be an women': 'learning to be a woman',
  'learing to be a women': 'learning to be a woman',
  
  // Pretty girls lessons
  'pretty girls lesson': 'pretty girls lesson',
  'pretty girl lesson': 'pretty girl lesson',
  'pretty girls lessons': 'pretty girls lesson',
  'pretty girl lessons': 'pretty girl lessons',
  'pretty girls leeson': 'pretty girls lesson',
  'pretty girl leeson': 'pretty girl leeson',
  'pertty girls leesson': 'pretty girls lesson',
  
  // Family scenarios
  'feminized by girlfriend': 'feminized by girlfriend',
  'femanized by girlfriend': 'feminized by girlfriend',
  'femanized by girl friend': 'feminized by girlfriend',
  'feminized by sister': 'feminized by sister',
  'femanized by sister': 'feminized by sister',
  'femaized by sister': 'feminized by sister',
  'feminized by wife': 'feminized by wife',
  'femanized by wife': 'feminized by wife',
  'feminized by mother': 'feminized by mother',
  'femanized by mother': 'feminized by mother',
  'feminized by cousin': 'feminized by cousin',
  'femanized by cousin': 'feminized by cousin',
  
  // Other scenarios
  'crossdressing': 'crossdressing',
  'fun crossdressing': 'crossdressing',
  'humiliation': 'humiliation',
  'humilation': 'humiliation',
  'revenge tale': 'revenge tale',
  'gang of girls': 'gang of girls',
  'hormones': 'hormones',
  'hypnosis': 'hypnosis',
  'love story': 'love story',
  'punished': 'punished',
  
  // Explicit content variants
  'fucked as a woman': 'fucked as a woman',
  'fucked as women': 'fucked as a woman',
  'fuvked as women': 'fucked as a woman',
  'fucked as a women': 'fucked as a woman'
};

// Simple Levenshtein distance for fuzzy matching
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i += 1) {
    matrix[0][i] = i;
  }
  
  for (let j = 0; j <= str2.length; j += 1) {
    matrix[j][0] = j;
  }
  
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator, // substitution
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Advanced tag extraction with multiple delimiter support
export function extractTagsFromFilename(filename: string): { title: string; tags: string[] } {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  
  // Enhanced regex to handle various separators including ,,, , ,, ,,,, ,, .,,, --, multiple spaces
  const separatorRegex = /(\s{2,}|,,+\s*,*|,\s*,+|--+|\.\.,+|\s*\|\s*)/;
  
  // Split on the first major separator
  const parts = nameWithoutExt.split(separatorRegex);
  
  if (parts.length < 2) {
    return { title: nameWithoutExt.trim(), tags: [] };
  }
  
  const title = parts[0].trim();
  
  // Join remaining parts and split on various tag delimiters
  const tagString = parts.slice(1).join('').trim();
  const rawTags = tagString.split(/,,+\s*|,\s*,+|,\s+|\s*,\s*|\s{2,}|--+|\.\.,+|\s*\|\s*/)
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0 && !separatorRegex.test(tag));
  
  const normalizedTags = rawTags.map(tag => normalizeTag(tag));
  
  // Remove duplicates while preserving order
  const uniqueTags = Array.from(new Set(normalizedTags)).filter(tag => tag.length > 0);
  
  return { title, tags: uniqueTags };
}

// Normalize tag with fuzzy matching and grouping
export function normalizeTag(tag: string): string {
  const cleaned = tag.toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  if (!cleaned) return '';
  
  // Direct mapping first
  if (TAG_GROUPINGS[cleaned]) {
    return TAG_GROUPINGS[cleaned];
  }
  
  // Fuzzy matching for close variants
  const threshold = 2; // Allow up to 2 character differences
  for (const [variant, canonical] of Object.entries(TAG_GROUPINGS)) {
    if (levenshteinDistance(cleaned, variant) <= threshold && cleaned.length > 3) {
      return canonical;
    }
  }
  
  return cleaned;
}

// Create tag statistics for sidebar display
export interface TagStats {
  canonical: string;
  count: number;
  variants: string[];
}

export function createTagStats(images: Array<{ tags: string[] }>): TagStats[] {
  const tagMap = new Map<string, { count: number; variants: Set<string> }>();
  
  images.forEach(image => {
    image.tags.forEach(tag => {
      const canonical = normalizeTag(tag);
      if (!tagMap.has(canonical)) {
        tagMap.set(canonical, { count: 0, variants: new Set() });
      }
      const stats = tagMap.get(canonical)!;
      stats.count++;
      stats.variants.add(tag);
    });
  });
  
  return Array.from(tagMap.entries())
    .map(([canonical, { count, variants }]) => ({
      canonical,
      count,
      variants: Array.from(variants)
    }))
    .sort((a, b) => a.canonical.localeCompare(b.canonical));
}
