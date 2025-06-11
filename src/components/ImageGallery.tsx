
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { ImageData } from '@/pages/Index';

interface ImageGalleryProps {
  images: ImageData[];
  onToggleFavorite: (id: string) => void;
  onUpdateTags: (id: string, tags: string[]) => void;
  onTagClick: (tag: string) => void;
  selectedTag: string;
}

export const ImageGallery = ({ 
  images, 
  onToggleFavorite, 
  onUpdateTags,
  onTagClick,
  selectedTag 
}: ImageGalleryProps) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          {selectedTag ? `No images found with tag "${selectedTag}"` : "No images found. Select a folder to get started."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {images.map((image) => (
        <div 
          key={image.id} 
          className="bg-card rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
        >
          {/* Image Container */}
          <div className="relative aspect-video bg-muted flex items-center justify-center p-4">
            <img
              src={image.src}
              alt={image.title}
              className="max-w-full max-h-full object-contain rounded"
            />
            
            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite(image.id)}
              className="absolute top-4 right-4 bg-background/80 hover:bg-background"
            >
              <Heart 
                className={`h-5 w-5 transition-colors ${
                  image.favorite 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-muted-foreground hover:text-red-400'
                }`} 
              />
            </Button>
          </div>

          {/* Image Info */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <div>
              <h2 className="text-2xl font-bold mb-1">{image.title}</h2>
              <p className="text-sm text-muted-foreground">{image.filename}</p>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Tags ({image.tags.length})
              </h3>
              
              {image.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {image.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant={selectedTag === tag ? "default" : "secondary"}
                      className="text-sm cursor-pointer hover:bg-primary/80 transition-all duration-200 hover:scale-105"
                      onClick={() => onTagClick(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No tags found for this image
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
