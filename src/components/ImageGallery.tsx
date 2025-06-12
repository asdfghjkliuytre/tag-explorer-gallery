
import { useState } from 'react';
import { ImageCard } from '@/components/ImageCard';
import { ImageViewer } from '@/components/ImageViewer';
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
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <p className="text-muted-foreground text-lg mb-2">
            {selectedTag || searchTerm ? 
              `No images found matching your criteria` : 
              "No images found. Select a folder to get started."
            }
          </p>
          {(selectedTag || searchTerm) && (
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
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
    <div className="space-y-6">
      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {images.length} {images.length === 1 ? 'result' : 'results'} found
        {selectedTag && ` for tag "${selectedTag}"`}
        {searchTerm && ` matching "${searchTerm}"`}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <ImageCard
            key={image.id}
            image={image}
            onImageClick={() => handleImageClick(index)}
            onToggleFavorite={() => onToggleFavorite(image.id)}
            onUpdateTags={(tags) => onUpdateTags(image.id, tags)}
            availableTags={availableTags}
          />
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
