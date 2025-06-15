
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
    const stats = createTagStats(loadedImages);
    setTagStats(stats);

    const firstFile = imageFiles[0];
    if (firstFile && firstFile.webkitRelativePath) {
      const folderName = firstFile.webkitRelativePath.split('/')[0];
      setSelectedFolderName(folderName);
    } else {
      setSelectedFolderName('Selected Images');
    }
    setSelectedTag('');
    setSearchTerm('');
  };

  const filteredImages = images.filter(image => {
    const matchesTag = selectedTag === '' || 
      image.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase()));
    const matchesSearch = searchTerm === '' || 
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  const toggleFavorite = (imageId: string) => {
    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, favorite: !img.favorite } : img
    ));
  };

  const updateImageTags = (imageId: string, newTags: string[]) => {
    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, tags: newTags } : img
    ));
    const updatedImages = images.map(img => 
      img.id === imageId ? { ...img, tags: newTags } : img
    );
    const stats = createTagStats(updatedImages);
    setTagStats(stats);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? '' : tag);
  };

  const handleClearFolder = () => {
    setImages([]);
    setTagStats([]);
    setSelectedFolderName('');
    setSelectedTag('');
    setSearchTerm('');
  };

  const availableTags = tagStats.map(stat => stat.canonical);

  // Helper for light theme: choose accent color
  const accentText =
    currentTheme === 'cyberpunk'
      ? 'text-cyberpunk-accent'
      : 'text-primary';

  const borderClass =
    currentTheme === 'cyberpunk'
      ? 'border-cyberpunk-accent'
      : 'border-border';

  return (
    <SidebarProvider>
      <div
        className={`flex flex-col min-h-screen theme-${currentTheme} bg-background transition-colors duration-300 relative`}
        style={{ minHeight: "100vh" }}
      >
        {/* Header */}
        <header className="border-b bg-card/95 backdrop-blur-md py-6 px-0 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl shadow-sm">
                  <Images className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-foreground drop-shadow-md">
                    Professional Gallery
                  </h1>
                  {selectedFolderName && (
                    <p className="text-base font-medium text-foreground/90">{`📁 ${selectedFolderName}`}</p>
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
                  className={`flex items-center gap-2 ${accentText} shadow`}
                >
                  <FolderOpen className="h-4 w-4" />
                  Change Folder
                </Button>
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsTagSidebarOpen(!isTagSidebarOpen)}
                className="relative shadow"
              >
                <Filter className="h-4 w-4" />
                {selectedTag && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
                )}
              </Button>
            </div>
          </div>
        </header>

        <div className="flex w-full">
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
          <main className="flex-1 min-h-screen bg-background bg-opacity-70">
            <div className="py-10 px-2 md:px-8 lg:px-12 max-w-6xl mx-auto">
              {images.length === 0 ? (
                <div className="bg-card/60 backdrop-blur-md rounded-3xl py-14 px-6 border border-border/50 shadow-2xl flex flex-col items-center justify-center">
                  <FolderSelector onFolderSelect={handleFolderSelect} />
                  <div className={`mt-6 ${accentText} text-sm opacity-80`}>
                    Tip: Try the cyberpunk/neon theme for an immersive experience!
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Search Bar */}
                  <SearchBar 
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                  />

                  {/* Active Filters Display */}
                  {(selectedTag || searchTerm) && (
                    <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className={`flex items-center gap-2 ${accentText}`}>
                          <span className="text-sm font-semibold">Active filters:</span>
                          {selectedTag && (
                            <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/30">
                              Tag: {selectedTag}
                            </span>
                          )}
                          {searchTerm && (
                            <span className="text-sm bg-secondary/30 text-secondary-foreground px-3 py-1 rounded-full border border-border">
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
        {/* Password-protected folder button at bottom right (now customizable) */}
        <PasswordProtectedFolderButton onFolderSelect={handleFolderSelect} />
      </div>
    </SidebarProvider>
  );
};

export default Index;

