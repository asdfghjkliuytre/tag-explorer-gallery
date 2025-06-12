
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
      <DialogContent className="max-w-[100vw] max-h-[100vh] p-0 overflow-hidden bg-black border-0 rounded-none">
        <div className="relative h-screen flex flex-col">
          {/* Close Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-black/70 text-white hover:bg-black/90 border border-primary/30 rounded-lg backdrop-blur-sm"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Navigation buttons */}
          {hasPrevious && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/70 text-white hover:bg-black/90 w-12 h-12 border border-primary/30 rounded-lg backdrop-blur-sm"
              onClick={onPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}
          
          {hasNext && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/70 text-white hover:bg-black/90 w-12 h-12 border border-primary/30 rounded-lg backdrop-blur-sm"
              onClick={onNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}

          {/* Image Container - Full screen with perfect fit */}
          <div className="flex-1 flex items-center justify-center bg-black p-4">
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-contain"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </div>

          {/* Bottom Info Panel - Compact and sleek */}
          <div className="bg-gradient-to-t from-black via-black/95 to-transparent border-t border-primary/20">
            <div className="max-w-6xl mx-auto p-4">
              {/* Title and Favorite - Single line */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-lg truncate">
                    {image.title}
                  </h3>
                  {image.folder !== 'root' && (
                    <span className="text-primary/80 text-sm">
                      📁 {image.folder}
                    </span>
                  )}
                </div>
                
                {image.favorite && (
                  <Heart className="h-5 w-5 fill-red-500 text-red-500 flex-shrink-0" />
                )}
              </div>

              {/* Tags - Compact display */}
              {image.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {image.tags.slice(0, 5).map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/30 text-xs px-2 py-0.5"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {image.tags.length > 5 && (
                    <Badge 
                      variant="secondary" 
                      className="bg-muted/20 text-muted-foreground border-muted/30 text-xs px-2 py-0.5"
                    >
                      +{image.tags.length - 5} more
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
