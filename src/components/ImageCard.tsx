
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
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-medium break-all">
            {image.filename}
          </CardTitle>
          <div className="flex items-center gap-2 ml-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFavorite}
              className="shrink-0"
            >
              <Heart 
                className={`h-4 w-4 ${
                  image.favorite 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-muted-foreground'
                }`} 
              />
            </Button>
            
            {!isEditingTags ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleTagEdit}
                className="shrink-0"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSaveTags}
                  className="shrink-0"
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancelEdit}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {image.folder !== 'root' && (
          <div className="text-xs text-muted-foreground">
            📁 {image.folder}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <AspectRatio ratio={16 / 9}>
          <img
            src={image.src}
            alt={image.filename}
            className="rounded-md object-cover w-full h-full cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={onImageClick}
          />
        </AspectRatio>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Tags:</span>
            <span className="text-xs text-muted-foreground">
              {image.tags.length} tag{image.tags.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          {isEditingTags ? (
            <div className="space-y-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Enter tags separated by commas..."
                className="text-sm"
              />
              <div className="text-xs text-muted-foreground">
                Separate multiple tags with commas
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-1">
              {image.tags.length > 0 ? (
                image.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground italic">
                  No tags found
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
