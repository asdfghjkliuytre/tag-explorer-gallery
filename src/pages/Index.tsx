import { useState, useEffect } from 'react';
import { TagSidebar } from '@/components/TagSidebar';
import { ThemeSelector } from '@/components/ThemeSelector';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { PasswordProtectedFolderButton } from "@/components/PasswordProtectedFolderButton";
import { Logo } from "@/components/Logo";
import Footer from "@/components/Footer";
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
              onTagClick={(tag) => setSelectedTag(selectedTag === tag ? '' : tag)}
              onClose={() => setIsTagSidebarOpen(false)}
            />
          )}

          <section className="flex-1 min-h-screen flex flex-col px-2 md:px-6 py-8 md:py-14 justify-between">
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
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Index;
