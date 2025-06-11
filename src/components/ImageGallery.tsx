
import { useState, useEffect } from 'react';
import { ImageData } from '@/pages/Index';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ChevronLeft, ChevronRight, Edit3, Save, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ImageGalleryProps {
  images: ImageData[];
  currentIndex: number;
  onNavigate: (direction: 'prev' | 'next') => void;
  onToggleFavorite: (id: string) => void;
  onUpdateTags: (id: string, tags: string[]) => void;
  onTagClick: (tag: string) => void;
  selectedTags: string[];
  availableTags: string[];
  sortBy: 'filename' | 'date';
}

export const ImageGallery = ({ 
  images, 
  currentIndex,
  onNavigate,
  onToggleFavorite, 
  onUpdateTags,
  onTagClick,
  selectedTags,
  availableTags,
  sortBy 
}: ImageGalleryProps) => {
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const sortedImages = [...images].sort((a, b) => {
    if (sortBy === 'filename') {
      return a.filename.localeCompare(b.filename);
    }
    return a.id.localeCompare(b.id);
  });

  const currentImage = sortedImages[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        onNavigate('prev');
      } else if (event.key === 'ArrowRight') {
        onNavigate('next');
      } else if (event.key === 'Escape') {
        setIsEditingTags(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNavigate]);

  const handleTagEdit = () => {
    if (currentImage) {
      setIsEditingTags(true);
      setTagInput(currentImage.tags.join(', '));
    }
  };

  const handleSaveTags = () => {
    if (currentImage) {
      const newTags = tagInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      onUpdateTags(currentImage.id, newTags);
      setIsEditingTags(false);
      setTagInput('');
    }
  };

  const handleCancelEdit = () => {
    setIsEditingTags(false);
    setTagInput('');
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No images found. Select a folder to get started.</p>
      </div>
    );
  }

  if (!currentImage) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No images match your current filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Image Counter and Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">
            Image {currentIndex + 1} of {sortedImages.length}
          </h2>
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {selectedTags.map(tag => (
                <Badge key={tag} variant="default" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate('prev')}
            disabled={sortedImages.length <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate('next')}
            disabled={sortedImages.length <= 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Image Display */}
      <div className="relative bg-card rounded-lg overflow-hidden shadow-lg">
        {/* Image */}
        <div className="relative aspect-video bg-muted flex items-center justify-center">
          <img
            src={currentImage.src}
            alt={currentImage.title}
            className="max-w-full max-h-full object-contain"
          />
          
          {/* Navigation Overlays */}
          {sortedImages.length > 1 && (
            <>
              <button
                onClick={() => onNavigate('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => onNavigate('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Image Info */}
        <div className="p-6 space-y-4">
          {/* Title and Actions */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">{currentImage.title}</h3>
              <p className="text-sm text-muted-foreground">{currentImage.filename}</p>
              {currentImage.folder !== 'root' && (
                <p className="text-xs text-muted-foreground">📁 {currentImage.folder}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleFavorite(currentImage.id)}
              >
                <Heart 
                  className={`h-4 w-4 ${
                    currentImage.favorite 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-muted-foreground'
                  }`} 
                />
              </Button>
              
              {!isEditingTags ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleTagEdit}
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSaveTags}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCancelEdit}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Tags Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Tags:</span>
              <span className="text-xs text-muted-foreground">
                {currentImage.tags.length} tag{currentImage.tags.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            {isEditingTags ? (
              <div className="space-y-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Enter tags separated by commas..."
                  className="text-sm"
                />
                <div className="text-xs text-muted-foreground">
                  Separate multiple tags with commas
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {currentImage.tags.length > 0 ? (
                  currentImage.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant={selectedTags.includes(tag) ? "default" : "secondary"}
                      className="text-xs cursor-pointer hover:bg-primary/80 transition-colors"
                      onClick={() => onTagClick(tag)}
                    >
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground italic">
                    No tags found
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="text-xs text-muted-foreground text-center">
        Use arrow keys to navigate • Click tags to filter • ESC to cancel editing
      </div>
    </div>
  );
};
