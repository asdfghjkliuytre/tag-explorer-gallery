
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageData } from '@/pages/Index';
import { Heart, Edit3, Save, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ImageCardProps {
  image: ImageData;
  onImageClick: () => void;
  onToggleFavorite: () => void;
  onUpdateTags: (tags: string[]) => void;
  availableTags: string[];
}

export const ImageCard = ({ 
  image, 
  onImageClick, 
  onToggleFavorite, 
  onUpdateTags, 
  availableTags 
}: ImageCardProps) => {
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const handleTagEdit = () => {
    setIsEditingTags(true);
    setTagInput(image.tags.join(', '));
  };

  const handleSaveTags = () => {
    const newTags = tagInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    onUpdateTags(newTags);
    setIsEditingTags(false);
    setTagInput('');
  };

  const handleCancelEdit = () => {
    setIsEditingTags(false);
    setTagInput('');
  };

  return (
    <Card className="group relative overflow-hidden bg-card/70 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
      {/* Favorite indicator overlay */}
      {image.favorite && (
        <div className="absolute top-3 right-3 z-10">
          <div className="w-6 h-6 rounded-full bg-red-500/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <Heart className="w-3 h-3 fill-white text-white" />
          </div>
        </div>
      )}

      {/* Image Section with hover effects */}
      <div className="relative overflow-hidden">
        <AspectRatio ratio={16 / 9}>
          <img
            src={image.src}
            alt={image.filename}
            className="w-full h-full object-cover cursor-pointer transition-all duration-500 group-hover:scale-110 theme-adaptive-image"
            onClick={onImageClick}
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick actions overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={onToggleFavorite}
                className="bg-background/90 backdrop-blur-sm shadow-lg hover:scale-105 transition-transform"
              >
                <Heart 
                  className={`h-4 w-4 ${
                    image.favorite 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-muted-foreground'
                  }`} 
                />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleTagEdit}
                className="bg-background/90 backdrop-blur-sm shadow-lg hover:scale-105 transition-transform"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </AspectRatio>
      </div>

      {/* Content Section */}
      <CardContent className="p-4 space-y-3">
        {/* Title and folder */}
        <div className="space-y-1">
          <h3 className="font-medium text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {image.title}
          </h3>
          {image.folder !== 'root' && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <div className="w-1 h-1 rounded-full bg-primary/60"></div>
              <span>{image.folder}</span>
            </div>
          )}
        </div>
        
        {/* Tags Section */}
        <div className="space-y-2">
          {isEditingTags ? (
            <div className="space-y-3 p-3 bg-muted/30 rounded-lg border border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Edit Tags</span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSaveTags}
                    className="h-7 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                  >
                    <Save className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancelEdit}
                    className="h-7 px-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Enter tags separated by commas..."
                className="text-sm border-border/50 focus:border-primary/50"
                autoFocus
              />
              <div className="text-xs text-muted-foreground">
                Separate multiple tags with commas
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Tags ({image.tags.length})
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleTagEdit}
                  className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit3 className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-1.5 min-h-[24px]">
                {image.tags.length > 0 ? (
                  image.tags.slice(0, 4).map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-xs px-2 py-0.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                    >
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground italic">
                    No tags yet
                  </span>
                )}
                {image.tags.length > 4 && (
                  <Badge 
                    variant="outline" 
                    className="text-xs px-2 py-0.5 border-muted/50 text-muted-foreground"
                  >
                    +{image.tags.length - 4}
                  </Badge>
                )}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
