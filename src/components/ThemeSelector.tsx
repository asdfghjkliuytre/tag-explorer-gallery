
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Palette, X } from 'lucide-react';

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
  
  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-background border border-border shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
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
          <div className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-xl shadow-lg z-50">
            {/* Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm text-popover-foreground">Choose Theme</h3>
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
                    <div
                      key={theme.id}
                      className={`
                        group relative p-3 rounded-lg cursor-pointer transition-all duration-200 border flex flex-col space-y-2
                        ${currentTheme === theme.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50 hover:bg-accent/50'
                        }
                      `}
                      onClick={() => {
                        onThemeChange(theme.id);
                        setIsOpen(false);
                      }}
                      role="button"
                      aria-label={`Switch to ${theme.name}`}
                    >
                      {/* Theme preview */}
                      <div
                        className={`h-6 rounded-md theme-preview-${theme.id} border border-border/20`}
                      />
                      
                      {/* Theme info */}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <span className="font-medium text-sm text-popover-foreground block">{theme.name}</span>
                          <span className="text-xs text-muted-foreground line-clamp-1">{theme.description}</span>
                        </div>
                        {currentTheme === theme.id && (
                          <div className="flex-shrink-0 ml-2">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                          </div>
                        )}
                      </div>
                    </div>
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
