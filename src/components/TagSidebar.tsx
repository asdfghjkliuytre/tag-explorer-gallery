import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { X, Search, Filter, Info } from 'lucide-react';
import { TagStats } from '@/utils/tagProcessor';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface TagSidebarProps {
  tagStats: TagStats[];
  selectedTag: string;
  onTagClick: (tag: string) => void;
  onClose: () => void;
}

export const TagSidebar = ({ 
  tagStats, 
  selectedTag, 
  onTagClick, 
  onClose 
}: TagSidebarProps) => {
  const [tagSearch, setTagSearch] = useState('');

  const filteredTags = tagStats.filter(tagStat =>
    tagStat.canonical.toLowerCase().includes(tagSearch.toLowerCase())
  );

  const clearSelectedTag = () => {
    onTagClick('');
  };

  const totalImages = tagStats.reduce((sum, tag) => sum + tag.count, 0);

  const hasTags = tagStats.length > 0;

  return (
    <div className="w-80 border-r bg-card/95 backdrop-blur-sm h-screen sticky top-0 shadow-xl hidden lg:flex flex-col">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground flex items-center gap-1">
              Filter by Tags
              <TooltipProvider delayDuration={130}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-accent cursor-help animate-pulse" />
                  </TooltipTrigger>
                  <TooltipContent className="text-xs max-w-xs">
                    Smart tags are auto-extracted from each image's filename.<br />
                    Select a tag to filter your gallery!
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-destructive/10">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tags..."
            value={tagSearch}
            onChange={(e) => setTagSearch(e.target.value)}
            className="pl-10 bg-background/50"
          />
        </div>

        {selectedTag && (
          <div className="space-y-2 mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary">Active Filter</span>
              <Button variant="ghost" size="sm" onClick={clearSelectedTag} className="h-6 px-2 text-xs">
                Clear
              </Button>
            </div>
            <Badge 
              variant="default"
              className="w-full justify-center py-2 cursor-pointer"
              onClick={() => onTagClick(selectedTag)}
            >
              {selectedTag}
              <X className="h-3 w-3 ml-2" />
            </Badge>
          </div>
        )}

        <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-md">
          {filteredTags.length} of {tagStats.length} tags • {totalImages} total images
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {filteredTags.map(tagStat => (
            <div
              key={tagStat.canonical}
              className={`group p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                selectedTag === tagStat.canonical
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'hover:bg-muted/60 border-transparent hover:border-border hover:shadow-sm'
              }`}
              onClick={() => onTagClick(tagStat.canonical)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium truncate flex-1 mr-2">
                  {tagStat.canonical}
                </span>
                <Badge 
                  variant={selectedTag === tagStat.canonical ? "secondary" : "outline"}
                  className={`text-xs font-mono shrink-0 ${
                    selectedTag === tagStat.canonical 
                      ? 'bg-primary-foreground/20 text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {tagStat.count}
                </Badge>
              </div>
              
              {tagStat.variants.length > 1 && (
                <div className="mt-2 text-xs text-muted-foreground/70">
                  <span className="font-medium">Variants:</span> {tagStat.variants.slice(0, 3).join(', ')}
                  {tagStat.variants.length > 3 && ` +${tagStat.variants.length - 3} more`}
                </div>
              )}
            </div>
          ))}
          
          {filteredTags.length === 0 && (
            <div className="text-sm text-muted-foreground text-center py-8">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No tags found matching</p>
              <p className="font-medium">"{tagSearch}"</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {!hasTags && (
        <div className="mt-6 text-sm text-muted-foreground/70 bg-muted/60 p-4 rounded-lg shadow-inner flex flex-col items-center gap-2">
          <Info className="h-6 w-6 text-accent" />
          <span className="font-medium text-center">No tags yet — select a folder to generate smart tags from filenames.</span>
        </div>
      )}
    </div>
  );
};
