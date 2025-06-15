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
import { FolderOnboardingSidebar } from '@/components/FolderOnboardingSidebar';
import { FolderOnboardingSteps } from '@/components/FolderOnboardingSteps';
import { OnboardingBanner } from '@/components/OnboardingBanner';
import { Logo } from "@/components/Logo";
import HeroFolderIcon from "@/components/HeroFolderIcon";
import EmptyGalleryIllustration from "@/components/EmptyGalleryIllustration";
import { RecentFoldersPanel } from "@/components/RecentFoldersPanel";
import SampleGalleryButton from "@/components/SampleGalleryButton";
import Footer from "@/components/Footer";

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
  const [recentFolders, setRecentFolders] = useState<string[]>([]);

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

  // Add to recent folders logic:
  useEffect(() => {
    if (selectedFolderName && !recentFolders.includes(selectedFolderName)) {
      setRecentFolders([selectedFolderName, ...recentFolders.slice(0, 3)]);
    }
    // eslint-disable-next-line
  }, [selectedFolderName]);

  // Handler for selecting recent folder (optional: restore images/tags for recent folders if persisted)
  const handleRecentFolderSelect = (folderName: string) => {
    // Not implemented: would require persisting folder data for full restore.
    setSelectedFolderName(folderName);
    // Optionally show a toast: "Restoring recent folder is not supported yet."
    // To keep functionality unchanged.
  };

  // Handler for loading sample gallery
  const handleSampleGallery = () => {
    const sampleImages: ImageData[] = [
      {
        id: "demo1",
        filename: "aurora_landscape.jpg",
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
        title: "Northern Lights",
        tags: ["aurora", "sky", "nature"],
        favorite: false,
        folder: "Sample",
      },
      {
        id: "demo2",
        filename: "forest_meadow.jpg",
        src: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&q=80",
        title: "Forest Meadow",
        tags: ["forest", "meadow", "nature"],
        favorite: false,
        folder: "Sample",
      },
      {
        id: "demo3",
        filename: "old_paper.jpg",
        src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80",
        title: "Vintage Paper",
        tags: ["vintage", "paper", "classic"],
        favorite: false,
        folder: "Sample",
      },
    ];
    setImages(sampleImages);
    setTagStats(createTagStats(sampleImages));
    setSelectedFolderName("Sample Gallery");
    setSelectedTag("");
    setSearchTerm("");
  };

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
        <header className="border-b bg-card/95 backdrop-blur-md py-6 px-0 sticky top-0 z-20 shadow-md">
          <div className="container flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <Logo />
              <span className="text-base md:ml-3 text-muted-foreground font-normal">
                Organize, tag, and explore your images with ease.
              </span>
              {selectedFolderName && (
                <span className="text-base font-medium text-primary/90 ml-1">{`📁 ${selectedFolderName}`}</span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsTagSidebarOpen(!isTagSidebarOpen)}
                className="relative shadow-sm"
              >
                <Filter className="h-4 w-4" />
                {selectedTag && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border border-background"></div>
                )}
              </Button>
            </div>
          </div>
        </header>

        <main className="flex w-full min-h-screen bg-background bg-opacity-80">
          {isTagSidebarOpen && (
            <TagSidebar
              tagStats={tagStats}
              selectedTag={selectedTag}
              onTagClick={handleTagClick}
              onClose={() => setIsTagSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <section className="flex-1 min-h-screen flex flex-col px-2 md:px-6 py-8 md:py-14 justify-between">
            {images.length === 0 ? (
              // Onboarding/Folder Selection Page
              currentTheme === "light" ? (
                <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fafbfe] via-[#f6f3ff] to-[#fdeff5]">
                  <div className="absolute top-0 left-0 w-full flex justify-center pointer-events-none z-10">
                    <OnboardingBanner theme={currentTheme} />
                  </div>
                  <div className="flex flex-1 flex-col items-center justify-center z-20 px-4 py-24">
                    <FolderSelector onFolderSelect={handleFolderSelect} variant="light" />
                  </div>
                </div>
              ) : (
                <div className="relative w-full min-h-screen bg-background flex items-stretch justify-center overflow-hidden">
                  {/* BANNER */}
                  <div className="absolute top-0 left-0 w-full flex justify-center pointer-events-none z-10">
                    <OnboardingBanner theme={currentTheme} />
                  </div>
                  {/* MAIN FOLDER CARD + STEPS */}
                  <div className="flex flex-1 flex-col items-center justify-center z-20 py-24 md:py-36 px-4">
                    <div className="mx-auto w-full max-w-lg">
                      <FolderSelector onFolderSelect={handleFolderSelect} />
                      <FolderOnboardingSteps className="mt-8" />
                    </div>
                  </div>
                  {/* TIPS SIDEBAR (right) - only visible on lg+ screens */}
                  <div className="hidden lg:block w-1/3 min-w-[320px] max-w-xs py-24 md:py-36 pr-12 z-20">
                    <FolderOnboardingSidebar />
                  </div>
                </div>
              )
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
          </section>
        </main>
        {/* Password-protected folder button at bottom right (now customizable) */}
        <PasswordProtectedFolderButton onFolderSelect={handleFolderSelect} />
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Index;
