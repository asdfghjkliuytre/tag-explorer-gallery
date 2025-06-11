
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
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden">
        <div className="relative">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-black/80 text-white p-4 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{image.filename}</h3>
              {image.folder !== 'root' && (
                <p className="text-xs text-white/70">📁 {image.folder}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              {image.favorite && (
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation buttons */}
          {hasPrevious && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={onPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}
          
          {hasNext && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={onNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}

          {/* Image */}
          <div className="flex items-center justify-center min-h-[50vh] max-h-[80vh] bg-black">
            <img
              src={image.src}
              alt={image.filename}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Footer with tags */}
          {image.tags.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Tags:</h4>
                <div className="flex flex-wrap gap-1">
                  {image.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-xs bg-white/20 text-white hover:bg-white/30"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
