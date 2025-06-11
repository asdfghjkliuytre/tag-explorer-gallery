
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { ImageData } from '@/pages/Index';

interface ImageGalleryProps {
  images: ImageData[];
  onToggleFavorite: (id: string) => void;
  onTagClick: (tag: string) => void;
  selectedTag: string;
  searchTerm: string;
}

export const ImageGallery = ({ 
  images, 
  onToggleFavorite, 
  onTagClick,
  selectedTag,
  searchTerm
}: ImageGalleryProps) => {
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

  return (
    <div className="space-y-8">
      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {images.length} {images.length === 1 ? 'result' : 'results'} found
        {selectedTag && ` for tag "${selectedTag}"`}
        {searchTerm && ` matching "${searchTerm}"`}
      </div>

      {images.map((image) => (
        <div 
          key={image.id} 
          className="bg-card rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-border/50"
        >
          {/* Image Container */}
          <div className="relative bg-muted/30 p-6">
            <div className="relative aspect-video max-w-4xl mx-auto bg-background/50 rounded-lg overflow-hidden">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-contain"
                loading="lazy"
              />
              
              {/* Favorite Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleFavorite(image.id)}
                className="absolute top-4 right-4 bg-background/90 hover:bg-background border border-border/50 backdrop-blur-sm"
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
          </div>

          {/* Image Info */}
          <div className="p-6 space-y-6">
            {/* Title */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2 leading-tight">
                {image.title}
              </h2>
              <p className="text-sm text-muted-foreground font-mono">
                {image.filename}
              </p>
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Tags
                </h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {image.tags.length} {image.tags.length === 1 ? 'tag' : 'tags'}
                </span>
              </div>
              
              {image.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2 justify-center">
                  {image.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant={selectedTag === tag ? "default" : "secondary"}
                      className={`text-sm cursor-pointer transition-all duration-200 hover:scale-105 ${
                        selectedTag === tag 
                          ? 'bg-primary text-primary-foreground shadow-md' 
                          : 'hover:bg-primary/20 hover:border-primary/30'
                      }`}
                      onClick={() => onTagClick(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground italic">
                    No tags found for this image
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
