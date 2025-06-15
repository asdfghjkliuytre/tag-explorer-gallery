import { useState, useEffect } from 'react';
import { ImageGallery } from '@/components/ImageGallery';
import { TagSidebar } from '@/components/TagSidebar';
import { SearchBar } from '@/components/SearchBar';
import { FolderSelector } from '@/components/FolderSelector';
import { ThemeSelector } from '@/components/ThemeSelector';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Filter, Images, FolderOpen } from 'lucide-react';
import { extractTagsFromFilename, createTagStats, TagStats } from '@/utils/tagProcessor';
import { extractMainTitle } from '@/utils/titleExtractor';
import { PasswordProtectedFolderButton } from "@/components/PasswordProtectedFolderButton";

export interface ImageData {
  id: string;
  filename: string;
  src: string;
  title: string;
  tags: string[];
  favorite: boolean;
  folder: string;
}

const Index = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTagSidebarOpen, setIsTagSidebarOpen] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('cyberpunk');
  const [tagStats, setTagStats] = useState<TagStats[]>([]);
  const [selectedFolderName, setSelectedFolderName] = useState<string>('');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('gallery-theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    } else {
      setCurrentTheme('cyberpunk'); // Default to cyberpunk
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('gallery-theme', currentTheme);
  }, [currentTheme]);

  // Handle folder selection with enhanced tag processing
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
        
        const { tags } = extractTagsFromFilename(file.name);
        const title = extractMainTitle(file.name);
        
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
    
    // Generate tag statistics
    const stats = createTagStats(loadedImages);
    setTagStats(stats);
    
    // Set folder name for display
    const firstFile = imageFiles[0];
    if (firstFile && firstFile.webkitRelativePath) {
      const folderName = firstFile.webkitRelativePath.split('/')[0];
      setSelectedFolderName(folderName);
    } else {
      setSelectedFolderName('Selected Images');
    }
    
    setSelectedTag(''); // Clear any existing tag filter
    setSearchTerm(''); // Clear search
  };

  // Filter images based on selected tag and search with performance optimization
  const filteredImages = images.filter(image => {
    const matchesTag = selectedTag === '' || 
      image.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase()));
    
    const matchesSearch = searchTerm === '' || 
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesTag && matchesSearch;
  });

  // Toggle favorite
  const toggleFavorite = (imageId: string) => {
    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, favorite: !img.favorite } : img
    ));
  };

  // Update image tags
  const updateImageTags = (imageId: string, newTags: string[]) => {
    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, tags: newTags } : img
    ));
    
    // Regenerate tag stats
    const updatedImages = images.map(img => 
      img.id === imageId ? { ...img, tags: newTags } : img
    );
    const stats = createTagStats(updatedImages);
    setTagStats(stats);
  };

  // Handle tag click - single tag selection only
  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? '' : tag);
  };

  // Clear folder selection
  const handleClearFolder = () => {
    setImages([]);
    setTagStats([]);
    setSelectedFolderName('');
    setSelectedTag('');
    setSearchTerm('');
  };

  // Get all available tags for autocomplete
  const availableTags = tagStats.map(stat => stat.canonical);

  return (
    <SidebarProvider>
      <div className={`min-h-screen theme-${currentTheme} bg-background transition-colors duration-300 relative`}>
        {/* Header */}
        <header className="border-b bg-card/95 backdrop-blur-sm p-6 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Images className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    Professional Gallery
                  </h1>
                  {selectedFolderName && (
                    <p className="text-sm text-muted-foreground">
                      📁 {selectedFolderName}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
              {images.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearFolder}
                  className="flex items-center gap-2"
                >
                  <FolderOpen className="h-4 w-4" />
                  Change Folder
                </Button>
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsTagSidebarOpen(!isTagSidebarOpen)}
                className="relative"
              >
                <Filter className="h-4 w-4" />
                {selectedTag && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
                )}
              </Button>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Tag Sidebar */}
          {isTagSidebarOpen && (
            <TagSidebar
              tagStats={tagStats}
              selectedTag={selectedTag}
              onTagClick={handleTagClick}
              onClose={() => setIsTagSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 min-h-screen bg-gradient-to-br from-background to-muted/10">
            <div className="p-6 max-w-7xl mx-auto">
              {images.length === 0 ? (
                /* Folder Selector */
                <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg">
                  <FolderSelector onFolderSelect={handleFolderSelect} />
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Search Bar */}
                  <SearchBar 
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                  />

                  {/* Active Filters Display */}
                  {(selectedTag || searchTerm) && (
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">Active filters:</span>
                          {selectedTag && (
                            <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
                              Tag: {selectedTag}
                            </span>
                          )}
                          {searchTerm && (
                            <span className="text-sm bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full border border-border">
                              Search: {searchTerm}
                            </span>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedTag('');
                            setSearchTerm('');
                          }}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          Clear All
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Image Gallery */}
                  <ImageGallery 
                    images={filteredImages}
                    onToggleFavorite={toggleFavorite}
                    onTagClick={handleTagClick}
                    selectedTag={selectedTag}
                    searchTerm={searchTerm}
                    onUpdateTags={updateImageTags}
                    availableTags={availableTags}
                  />
                </div>
              )}
            </div>
          </main>
        </div>
        {/* Password-protected folder button at bottom (hidden UI) */}
        <PasswordProtectedFolderButton onFolderSelect={handleFolderSelect} />
      </div>
    </SidebarProvider>
  );
};

export default Index;
