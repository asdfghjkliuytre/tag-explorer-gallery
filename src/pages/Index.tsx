
import { useState, useEffect } from 'react';
import { ImageGallery } from '@/components/ImageGallery';
import { TagSidebar } from '@/components/TagSidebar';
import { SearchBar } from '@/components/SearchBar';
import { FolderSelector } from '@/components/FolderSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

export interface ImageData {
  id: string;
  filename: string;
  src: string;
  tags: string[];
  favorite: boolean;
  folder: string;
}

const PREDEFINED_TAGS = [
  'permanent femanization', 'male to female', 'punished', 'husband to wife', 'forced femanization',
  'fucked as a women', 'pretty girls lesson', 'gang of girls', 'humilation', 'revenge tale',
  'fucked as women', 'learning to be a women', 'learnig to be a women', 'fun crossdressing',
  'femanized', 'femanized by girlfriend', 'learning to be an women', 'hormones',
  'femanized by sister', 'pretty girl lesson', 'femanization fun', 'femanized by wife',
  'pretty girls lessons', 'femaized by sister', 'man turned into women', 'humiliation',
  'permanent feamnization', 'femanized by girl friend', 'pretty girl lessons', 'crossdressing',
  'pretty girls leeson', 'femanized by mother', 'premanent femanization', 'permenent femanization',
  'permenant femanization', 'living as a girl', 'dressed as a girl', 'hypnosis', 'love story',
  'forced femaization', 'learing to be a women', 'learnig to be an women', 'pretty girl leeson',
  'femanized by cousin', 'femanization', 'pertty girls leesson'
];

const Index = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [isTagSidebarOpen, setIsTagSidebarOpen] = useState(false);
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'filename' | 'date'>('filename');

  // Extract tags from filename
  const extractTagsFromFilename = (filename: string): string[] => {
    const lowerFilename = filename.toLowerCase();
    return PREDEFINED_TAGS.filter(tag => 
      lowerFilename.includes(tag.toLowerCase())
    );
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
        
        return {
          id: `${Date.now()}-${index}`,
          filename: file.name,
          src,
          tags: extractTagsFromFilename(file.name),
          favorite: false,
          folder: folderPath
        };
      })
    );

    setImages(loadedImages);
  };

  // Filter images based on search, tags, and folders
  const filteredImages = images.filter(image => {
    const matchesSearch = searchTerm === '' || 
      image.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => image.tags.includes(tag));
    
    const matchesFolder = selectedFolders.length === 0 || 
      selectedFolders.includes(image.folder);

    return matchesSearch && matchesTags && matchesFolder;
  });

  // Get all unique tags from all images
  const allTags = Array.from(new Set(
    images.flatMap(image => image.tags)
  )).sort();

  // Get all unique folders
  const allFolders = Array.from(new Set(
    images.map(image => image.folder)
  )).sort();

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
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Image Gallery</h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
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
          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="space-y-6">
              {/* Folder Selector */}
              <FolderSelector onFolderSelect={handleFolderSelect} />
              
              {/* Search Bar */}
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />

              {/* Folder Filter */}
              {allFolders.length > 1 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Folders</h3>
                  <div className="flex flex-wrap gap-2">
                    {allFolders.map(folder => (
                      <Button
                        key={folder}
                        variant={selectedFolders.includes(folder) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          if (selectedFolders.includes(folder)) {
                            setSelectedFolders(prev => prev.filter(f => f !== folder));
                          } else {
                            setSelectedFolders(prev => [...prev, folder]);
                          }
                        }}
                      >
                        {folder}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Gallery */}
              <ImageGallery 
                images={filteredImages}
                onToggleFavorite={toggleFavorite}
                onUpdateTags={updateImageTags}
                availableTags={PREDEFINED_TAGS}
                sortBy={sortBy}
              />
            </div>
          </main>

          {/* Tag Sidebar */}
          {isTagSidebarOpen && (
            <TagSidebar
              allTags={allTags}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              onClose={() => setIsTagSidebarOpen(false)}
            />
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
