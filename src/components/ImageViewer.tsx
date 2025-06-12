
import { useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ImageData } from '@/pages/Index';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface ImageViewerProps {
  image: ImageData;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export const ImageViewer = ({ 
  image, 
  onClose, 
  onPrevious, 
  onNext, 
  hasNext, 
  hasPrevious 
}: ImageViewerProps) => {
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasPrevious) onPrevious();
          break;
        case 'ArrowRight':
          if (hasNext) onNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrevious, onNext, hasNext, hasPrevious]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden bg-black/95 border-0">
        <div className="relative h-full">
          {/* Close Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-black/50 text-white hover:bg-black/70 border-0"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Navigation buttons */}
          {hasPrevious && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 text-white hover:bg-black/70 w-12 h-12"
              onClick={onPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}
          
          {hasNext && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 text-white hover:bg-black/70 w-12 h-12"
              onClick={onNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}

          {/* Image */}
          <div className="flex items-center justify-center h-full bg-black">
            <img
              src={image.src}
              alt={image.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Bottom Info Panel */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 pt-12">
            <div className="max-w-4xl mx-auto">
              {/* Title and Favorite */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-lg mb-1 truncate">
                    {image.title}
                  </h3>
                  {image.folder !== 'root' && (
                    <p className="text-white/60 text-sm">
                      📁 {image.folder}
                    </p>
                  )}
                </div>
                
                {image.favorite && (
                  <Heart className="h-5 w-5 fill-red-500 text-red-500 ml-4 flex-shrink-0" />
                )}
              </div>

              {/* Tags */}
              {image.tags.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-white/80 text-sm font-medium">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {image.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="bg-white/20 text-white hover:bg-white/30 border-white/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
