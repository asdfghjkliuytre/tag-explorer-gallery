
import { useState } from 'react';
import { ImageCard } from '@/components/ImageCard';
import { ImageViewer } from '@/components/ImageViewer';
import { Badge } from '@/components/ui/badge';
import { ImageData } from '@/pages/Index';

interface ImageGalleryProps {
  images: ImageData[];
  onToggleFavorite: (id: string) => void;
  onTagClick: (tag: string) => void;
  selectedTag: string;
  searchTerm: string;
  onUpdateTags: (imageId: string, tags: string[]) => void;
  availableTags: string[];
}

export const ImageGallery = ({ 
  images, 
  onToggleFavorite, 
  onTagClick,
  selectedTag,
  searchTerm,
  onUpdateTags,
  availableTags
}: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="max-w-lg mx-auto text-center p-8 bg-card/30 rounded-2xl border border-border/50 backdrop-blur-sm">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse"></div>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-3">
            {selectedTag || searchTerm ? 'No matches found' : 'No images yet'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {selectedTag || searchTerm ? 
              'Try adjusting your filters or search terms to find what you\'re looking for.' : 
              'Select a folder from the options above to start exploring your image gallery.'
            }
          </p>
          {(selectedTag || searchTerm) && (
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedTag && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Filtering by: {selectedTag}
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="outline" className="border-accent/50 text-accent">
                  Searching: "{searchTerm}"
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseViewer = () => {
    setSelectedImageIndex(null);
  };

  const handlePrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Results Header with enhanced styling */}
      <div className="flex items-center justify-between p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="text-foreground font-medium">
            {images.length} {images.length === 1 ? 'image' : 'images'} found
          </span>
          {selectedTag && (
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              #{selectedTag}
            </Badge>
          )}
          {searchTerm && (
            <Badge variant="outline" className="border-accent/50 text-accent">
              "{searchTerm}"
            </Badge>
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          Click any image to view fullscreen
        </div>
      </div>

      {/* Enhanced Image Grid with staggered animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div 
            key={image.id}
            className="animate-scale-in hover-scale"
            style={{ 
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'both'
            }}
          >
            <ImageCard
              image={image}
              onImageClick={() => handleImageClick(index)}
              onToggleFavorite={() => onToggleFavorite(image.id)}
              onUpdateTags={(tags) => onUpdateTags(image.id, tags)}
              availableTags={availableTags}
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Image Viewer */}
      {selectedImageIndex !== null && (
        <ImageViewer
          image={images[selectedImageIndex]}
          onClose={handleCloseViewer}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasNext={selectedImageIndex < images.length - 1}
          hasPrevious={selectedImageIndex > 0}
        />
      )}
    </div>
  );
};
