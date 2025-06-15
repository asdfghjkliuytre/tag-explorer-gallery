
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className="relative mt-2 mb-2">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
      <Input
        placeholder="Search images by title or tags…"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-12 pr-12 text-lg py-4 bg-background/60 border-accent/40 rounded-xl shadow-lg focus:border-accent focus:ring-accent/60"
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="icon"
          onClick={clearSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-muted"
        >
          <X className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};
