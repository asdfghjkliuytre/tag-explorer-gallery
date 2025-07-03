
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Palette, X, Check } from 'lucide-react';

const THEMES = [
  { id: 'light', name: 'Light', description: 'Clean and bright' },
  { id: 'dark', name: 'Dark', description: 'Easy on the eyes' },
  { id: 'neon', name: 'Neon', description: 'Vibrant and electric' },
  { id: 'glass', name: 'Glass', description: 'Translucent elegance' },
  { id: 'pastel', name: 'Pastel', description: 'Soft and dreamy' },
  { id: 'cyberpunk', name: 'Cyberpunk', description: 'Futuristic vibes' },
  // New custom themes:
  { id: 'aurora', name: 'Aurora', description: 'Ethereal gradient blues & purples' },
  { id: 'vintage-paper', name: 'Vintage Paper', description: 'Warm off-whites & muted reds' },
  { id: 'solar-flare', name: 'Solar Flare', description: 'Orange/blue cosmic energy' },
  { id: 'midnight-opal', name: 'Midnight Opal', description: 'Dark jewel tones, iridescence' },
  { id: 'forest-meadow', name: 'Forest Meadow', description: 'Green/brown natural calm' },
  // Add Tight theme
  { id: 'tight', name: 'Tight', description: 'Ultra-compact, dense and efficient UI' },
];

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export const ThemeSelector = ({ currentTheme, onThemeChange }: ThemeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleThemeSelect = (themeId: string) => {
    onThemeChange(themeId);
    setIsOpen(false);
  };
  
  return (
    <div className="relative z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative bg-background border border-border shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-200 ${isOpen ? 'bg-accent text-accent-foreground' : ''}`}
        aria-label="Theme selector"
      >
        <Palette className="h-4 w-4" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-1 w-80 bg-background border border-border rounded-xl shadow-xl z-50 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border bg-muted/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm text-foreground">Choose Theme</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsOpen(false)} 
                  className="h-6 w-6 p-0 hover:bg-accent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            {/* Theme grid */}
            <ScrollArea className="max-h-96">
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      className={`
                        group relative p-3 rounded-lg cursor-pointer transition-all duration-200 border flex flex-col space-y-2 text-left w-full
                        ${currentTheme === theme.id
                          ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                          : 'border-border hover:border-primary/50 hover:bg-accent/50'
                        }
                      `}
                      onClick={() => handleThemeSelect(theme.id)}
                      aria-label={`Switch to ${theme.name}`}
                    >
                      {/* Theme preview */}
                      <div
                        className={`h-6 rounded-md theme-preview-${theme.id} border border-border/20 shadow-sm`}
                      />
                      
                      {/* Theme info */}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <span className="font-medium text-sm text-foreground block">{theme.name}</span>
                          <span className="text-xs text-muted-foreground line-clamp-1">{theme.description}</span>
                        </div>
                        {currentTheme === theme.id && (
                          <div className="flex-shrink-0 ml-2">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  );
};
