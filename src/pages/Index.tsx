import { useState, useEffect } from 'react';
import { TagSidebar } from '@/components/TagSidebar';
import { ThemeSelector } from '@/components/ThemeSelector';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { PasswordProtectedFolderButton } from "@/components/PasswordProtectedFolderButton";
import { Logo } from "@/components/Logo";

import { useGalleryImages } from "@/hooks/useGalleryImages";
import { GalleryOnboarding } from "@/components/GalleryOnboarding";
import { GalleryMainContent } from "@/components/GalleryMainContent";

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
  // State for sidebar, theme, and UI
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTagSidebarOpen, setIsTagSidebarOpen] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('cyberpunk');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('gallery-theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    } else {
      setCurrentTheme('cyberpunk');
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('gallery-theme', currentTheme);
  }, [currentTheme]);

  // Gallery images and file logic moved to hook
  const {
    images,
    tagStats,
    selectedFolderName,
    handleFolderSelect,
    toggleFavorite,
    updateImageTags,
  } = useGalleryImages();

  // Helper for light theme: choose accent color
  const accentText =
    currentTheme === 'cyberpunk'
      ? 'text-cyberpunk-accent'
      : 'text-primary';

  return (
    <SidebarProvider>
      <div
        className={`
          flex flex-col min-h-screen theme-${currentTheme} bg-background transition-colors duration-300 relative
        `}
      >
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 border-b border-border/30 bg-background/95 backdrop-blur-xl py-3 z-50 shadow-lg">
          <div className="container flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <Logo />
              <div className="hidden md:flex items-center gap-4">
                <span className="text-sm text-muted-foreground font-medium">
                  Organize, tag, and explore your images with ease
                </span>
                {selectedFolderName && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/30 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-sm font-semibold text-primary">{selectedFolderName}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
              {images.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsTagSidebarOpen(!isTagSidebarOpen)}
                  className="relative shadow-md hover:shadow-lg transition-all duration-200 border-border/50"
                >
                  <Filter className="h-4 w-4" />
                  {selectedTag && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse shadow-sm"></div>
                  )}
                </Button>
              )}
            </div>
          </div>
        </header>

        <main className="flex w-full min-h-screen bg-background pt-20">
          {isTagSidebarOpen && images.length > 0 && (
            <TagSidebar
              tagStats={tagStats}
              selectedTag={selectedTag}
              onTagClick={(tag) => setSelectedTag(selectedTag === tag ? '' : tag)}
              onClose={() => setIsTagSidebarOpen(false)}
            />
          )}

          <section className="flex-1 min-h-screen flex flex-col justify-between">
            {images.length === 0 ? (
              <GalleryOnboarding
                currentTheme={currentTheme}
                onFolderSelect={handleFolderSelect}
              />
            ) : (
              <GalleryMainContent
                images={images}
                tagStats={tagStats}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                toggleFavorite={toggleFavorite}
                updateImageTags={updateImageTags}
                currentTheme={currentTheme}
              />
            )}
          </section>
        </main>

        <PasswordProtectedFolderButton onFolderSelect={handleFolderSelect} />
        
      </div>
    </SidebarProvider>
  );
};

export default Index;
