
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
      <DialogContent className="max-w-[100vw] max-h-[100vh] p-0 overflow-hidden bg-black/95 backdrop-blur-xl border-0 rounded-none animate-scale-in">
        <div className="relative h-screen flex flex-col">
          {/* Enhanced Header Controls */}
          <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-4">
            <div className="flex items-center justify-between">
              {/* Image info */}
              <div className="flex items-center gap-3 text-white">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-sm font-medium">Fullscreen View</span>
                {image.favorite && (
                  <div className="flex items-center gap-1 text-red-400">
                    <Heart className="w-4 h-4 fill-current" />
                    <span className="text-xs">Favorite</span>
                  </div>
                )}
              </div>

              {/* Close button */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="bg-white/10 text-white hover:bg-white/20 border border-white/20 rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Enhanced Navigation Buttons */}
          {hasPrevious && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 bg-black/60 text-white hover:bg-black/80 w-14 h-14 border border-white/20 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-primary/50"
              onClick={onPrevious}
            >
              <ChevronLeft className="h-7 w-7" />
            </Button>
          )}
          
          {hasNext && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 bg-black/60 text-white hover:bg-black/80 w-14 h-14 border border-white/20 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-primary/50"
              onClick={onNext}
            >
              <ChevronRight className="h-7 w-7" />
            </Button>
          )}

          {/* Enhanced Image Container */}
          <div className="flex-1 flex items-center justify-center bg-black/50 p-8 pt-20 pb-32">
            <div className="relative max-w-full max-h-full">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-contain max-w-[90vw] max-h-[70vh] rounded-lg shadow-2xl animate-fade-in"
                style={{ 
                  filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))',
                  animationDelay: '100ms'
                }}
              />
            </div>
          </div>

          {/* Enhanced Bottom Info Panel */}
          <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
            <div className="max-w-6xl mx-auto p-6 space-y-4">
              {/* Title Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-xl truncate">
                    {image.title}
                  </h3>
                  {image.folder !== 'root' && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-primary/90 text-sm font-medium">
                        {image.folder}
                      </span>
                    </div>
                  )}
                </div>
                
                {image.favorite && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-red-500/20 rounded-full backdrop-blur-sm border border-red-500/30">
                    <Heart className="h-4 w-4 fill-red-400 text-red-400" />
                    <span className="text-red-400 text-sm font-medium">Favorite</span>
                  </div>
                )}
              </div>

              {/* Tags Section */}
              {image.tags.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white/70 text-sm font-medium">Tags</span>
                    <div className="w-1 h-1 rounded-full bg-white/30"></div>
                    <span className="text-white/50 text-xs">{image.tags.length} total</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {image.tags.slice(0, 8).map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="bg-primary/20 text-primary border-primary/30 text-sm px-3 py-1 font-medium backdrop-blur-sm hover:bg-primary/30 transition-colors"
                      >
                        #{tag}
                      </Badge>
                    ))}
                    {image.tags.length > 8 && (
                      <Badge 
                        variant="secondary" 
                        className="bg-white/10 text-white/70 border-white/20 text-sm px-3 py-1 backdrop-blur-sm"
                      >
                        +{image.tags.length - 8} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation hint */}
              <div className="flex items-center justify-center pt-2">
                <div className="flex items-center gap-4 text-white/40 text-xs">
                  <span>Use arrow keys or click buttons to navigate</span>
                  <div className="w-1 h-1 rounded-full bg-white/30"></div>
                  <span>Press ESC to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
