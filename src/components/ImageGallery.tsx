
import { useState } from 'react';
import { ImageCard } from './ImageCard';
import { ImageViewer } from './ImageViewer';
import { ImageData } from '@/pages/Index';

interface ImageGalleryProps {
  images: ImageData[];
  onToggleFavorite: (id: string) => void;
  onUpdateTags: (id: string, tags: string[]) => void;
  availableTags: string[];
  sortBy: 'filename' | 'date';
}

export const ImageGallery = ({ 
  images, 
  onToggleFavorite, 
  onUpdateTags, 
  availableTags,
  sortBy 
}: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const sortedImages = [...images].sort((a, b) => {
    if (sortBy === 'filename') {
      return a.filename.localeCompare(b.filename);
    }
    return a.id.localeCompare(b.id); // Using id as a proxy for date
  });

  const openImageViewer = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImageViewer = () => {
    setSelectedImageIndex(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    
    if (direction === 'prev') {
      setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : sortedImages.length - 1);
    } else {
      setSelectedImageIndex(selectedImageIndex < sortedImages.length - 1 ? selectedImageIndex + 1 : 0);
    }
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No images found. Select a folder to get started.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Images ({sortedImages.length})
          </h2>
          <span className="text-sm text-muted-foreground">
            Sorted by {sortBy}
          </span>
        </div>
        
        <div className="grid gap-6">
          {sortedImages.map((image, index) => (
            <ImageCard
              key={image.id}
              image={image}
              onImageClick={() => openImageViewer(index)}
              onToggleFavorite={() => onToggleFavorite(image.id)}
              onUpdateTags={(tags) => onUpdateTags(image.id, tags)}
              availableTags={availableTags}
            />
          ))}
        </div>
      </div>

      {selectedImageIndex !== null && (
        <ImageViewer
          image={sortedImages[selectedImageIndex]}
          onClose={closeImageViewer}
          onPrevious={() => navigateImage('prev')}
          onNext={() => navigateImage('next')}
          hasNext={selectedImageIndex < sortedImages.length - 1}
          hasPrevious={selectedImageIndex > 0}
        />
      )}
    </>
  );
};
