
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { X, Search } from 'lucide-react';

interface TagSidebarProps {
  allTags: string[];
  selectedTag: string;
  onTagClick: (tag: string) => void;
  onClose: () => void;
}

export const TagSidebar = ({ 
  allTags, 
  selectedTag, 
  onTagClick, 
  onClose 
}: TagSidebarProps) => {
  const [tagSearch, setTagSearch] = useState('');

  const filteredTags = allTags.filter(tag =>
    tag.toLowerCase().includes(tagSearch.toLowerCase())
  );

  const clearSelectedTag = () => {
    onTagClick('');
  };

  return (
    <div className="w-80 border-r bg-card h-screen sticky top-0">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Filter by Tags</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tags..."
            value={tagSearch}
            onChange={(e) => setTagSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {selectedTag && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Selected Tag</span>
              <Button variant="ghost" size="sm" onClick={clearSelectedTag}>
                Clear
              </Button>
            </div>
            <Badge 
              variant="default"
              className="cursor-pointer w-full justify-center"
              onClick={() => onTagClick(selectedTag)}
            >
              {selectedTag} <X className="h-3 w-3 ml-1" />
            </Badge>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground mb-2">
            Available Tags ({filteredTags.length})
          </div>
          {filteredTags.map(tag => (
            <div
              key={tag}
              className={`p-3 rounded cursor-pointer transition-all duration-200 border ${
                selectedTag === tag
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'hover:bg-muted border-transparent hover:border-border'
              }`}
              onClick={() => onTagClick(tag)}
            >
              <span className="text-sm font-medium">{tag}</span>
            </div>
          ))}
          
          {filteredTags.length === 0 && (
            <div className="text-sm text-muted-foreground text-center py-8">
              No tags found matching "{tagSearch}"
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
