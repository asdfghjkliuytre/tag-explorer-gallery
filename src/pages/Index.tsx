
import { useState, useEffect } from 'react';
import { ImageGallery } from '@/components/ImageGallery';
import { TagSidebar } from '@/components/TagSidebar';
import { SearchBar } from '@/components/SearchBar';
import { FolderSelector } from '@/components/FolderSelector';
import { ThemeSelector } from '@/components/ThemeSelector';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

export interface ImageData {
  id: string;
  filename: string;
  src: string;
  title: string;
  tags: string[];
  favorite: boolean;
  folder: string;
}

// Smart tag grouping - maps variations to canonical forms
const TAG_GROUPINGS: Record<string, string> = {
  'male to female': 'male to female',
  'man to woman': 'male to female',
  'boy to girl': 'male to female',
  'man turned into women': 'man turned into woman',
  'man turned into woman': 'man turned into woman',
  'man into woman': 'man turned into woman',
  'turned into woman': 'man turned into woman',
  'cheated into dress': 'cheated into dress',
  'cheated dress': 'cheated into dress',
  'forced into dress': 'cheated into dress',
  'boyfriend to girlfriend': 'boyfriend to girlfriend',
  'bf to gf': 'boyfriend to girlfriend',
  'husband to wife': 'husband to wife',
  'permanent feminization': 'permanent feminization',
  'permanent femanization': 'permanent feminization',
  'permanent feamnization': 'permanent feminization',
  'premanent femanization': 'permanent feminization',
  'permenent femanization': 'permanent feminization',
  'permenant femanization': 'permanent feminization',
  'forced feminization': 'forced feminization',
  'forced femanization': 'forced feminization',
  'forced femaization': 'forced feminization',
  'feminized': 'feminized',
  'femanized': 'feminized',
  'femaized': 'feminized',
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
  'pretty girls lesson': 'pretty girls lesson',
  'pretty girl lesson': 'pretty girls lesson',
  'pretty girls lessons': 'pretty girls lesson',
  'pretty girl lessons': 'pretty girls lesson',
  'pretty girls leeson': 'pretty girls lesson',
  'pretty girl leeson': 'pretty girls lesson',
  'pertty girls leesson': 'pretty girls lesson',
  'learning to be a woman': 'learning to be a woman',
  'learning to be a women': 'learning to be a woman',
  'learnig to be a women': 'learning to be a woman',
  'learning to be an women': 'learning to be a woman',
  'learnig to be an women': 'learning to be a woman',
  'learing to be a women': 'learning to be a woman',
  'living as a girl': 'living as a girl',
  'dressed as a girl': 'dressed as a girl',
  'crossdressing': 'crossdressing',
  'fun crossdressing': 'crossdressing',
  'humiliation': 'humiliation',
  'humilation': 'humiliation',
  'revenge tale': 'revenge tale',
  'gang of girls': 'gang of girls',
  'hormones': 'hormones',
  'hypnosis': 'hypnosis',
  'love story': 'love story',
  'punished': 'punished'
};

const Index = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTagSidebarOpen, setIsTagSidebarOpen] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('light');

  // Normalize and group tags
  const normalizeTag = (tag: string): string => {
    const cleaned = tag.trim().toLowerCase();
    return TAG_GROUPINGS[cleaned] || cleaned;
  };

  // Parse filename into title and tags using ,, delimiter
  const parseFilename = (filename: string): { title: string; tags: string[] } => {
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    
    // Check if filename contains ,, delimiter
    if (nameWithoutExt.includes(',,')) {
      const parts = nameWithoutExt.split(',,');
      const title = parts[0].trim();
      
      // Get all tag parts after the title
      const tagParts = parts.slice(1);
      const rawTags = tagParts
        .map(part => part.trim())
        .filter(part => part.length > 0);
      
      // Normalize and deduplicate tags
      const normalizedTags = Array.from(new Set(
        rawTags.map(tag => normalizeTag(tag))
      )).filter(tag => tag.length > 0);
      
      return {
        title,
        tags: normalizedTags
      };
    }
    
    // Fallback: treat entire filename as title with no tags
    return {
      title: nameWithoutExt,
      tags: []
    };
  };

  // Handle folder selection
  const handleFolderSelect = async (files: FileList) => {
    const imageFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/')
    );

    const loadedImages: ImageData[] = await Promise.all(
      imageFiles.map(async (file, index) => {
        const src = URL.createObjectURL(file);
        const folderPath = file.webkitRelativePath ? 
          file.webkitRelativePath.split('/').slice(0, -1).join('/') : 
          'root';
        
        const { title, tags } = parseFilename(file.name);
        
        return {
          id: `${Date.now()}-${index}`,
          filename: file.name,
          src,
          title,
          tags,
          favorite: false,
          folder: folderPath
        };
      })
    );

    setImages(loadedImages);
    setSelectedTag(''); // Clear any existing tag filter
  };

  // Filter images based on selected tag and search
  const filteredImages = images.filter(image => {
    const matchesTag = selectedTag === '' || 
      image.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase()));
    
    const matchesSearch = searchTerm === '' || 
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesTag && matchesSearch;
  });

  // Get all unique tags from all images
  const allTags = Array.from(new Set(
    images.flatMap(image => image.tags)
  )).sort();

  // Toggle favorite
  const toggleFavorite = (imageId: string) => {
    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, favorite: !img.favorite } : img
    ));
  };

  // Update image tags
  const updateImageTags = (imageId: string, newTags: string[]) => {
    const normalizedTags = newTags.map(tag => normalizeTag(tag));
    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, tags: normalizedTags } : img
    ));
  };

  // Handle tag click - single tag selection only
  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? '' : tag);
  };

  return (
    <SidebarProvider>
      <div className={`min-h-screen theme-${currentTheme}`}>
        {/* Header */}
        <header className="border-b bg-card p-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Image Gallery</h1>
            <div className="flex items-center gap-4">
              <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsTagSidebarOpen(!isTagSidebarOpen)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Tag Sidebar */}
          {isTagSidebarOpen && (
            <TagSidebar
              allTags={allTags}
              selectedTag={selectedTag}
              onTagClick={handleTagClick}
              onClose={() => setIsTagSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Folder Selector */}
              <FolderSelector onFolderSelect={handleFolderSelect} />
              
              {/* Search Bar */}
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />

              {/* Selected Tag Display */}
              {selectedTag && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Filtered by tag: <span className="font-bold text-primary">{selectedTag}</span>
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTag('')}
                    >
                      Clear Filter
                    </Button>
                  </div>
                </div>
              )}

              {/* Image Gallery */}
              <ImageGallery 
                images={filteredImages}
                onToggleFavorite={toggleFavorite}
                onUpdateTags={updateImageTags}
                onTagClick={handleTagClick}
                selectedTag={selectedTag}
              />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
