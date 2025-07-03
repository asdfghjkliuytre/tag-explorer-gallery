
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
  // Force a re-render on theme change for focus/visibility
  useEffect(() => {
    // When theme changes, ensure popover is still visible if open
    if (isOpen) {
      setIsOpen(false); // close then open to trigger DOM update & z-index
      setTimeout(() => setIsOpen(true), 30);
    }
  }, [currentTheme]);
  
  // Try to always bring into foreground (z-50)
  return (
    <div className="relative z-[99]">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(o => !o)}
        className="relative bg-card/80 backdrop-blur-xl border border-border/30 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 group"
        aria-label="Theme selector"
      >
        <Palette className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-72 bg-card/95 backdrop-blur-2xl border border-border/30 rounded-2xl shadow-xl z-50 animate-fade-in overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-border/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                <h3 className="font-bold text-sm text-foreground">Choose Theme</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-muted/60 rounded-full transition-colors duration-200 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          {/* Theme grid */}
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map((theme) => (
                <div
                  key={theme.id}
                  className={
                    `group relative p-3 rounded-xl cursor-pointer transition-all duration-300 border flex flex-col space-y-2
                    ${currentTheme === theme.id
                      ? 'border-primary bg-primary/10 scale-[1.02] shadow-md'
                      : 'border-border/30 hover:border-primary/40 hover:bg-muted/40 hover:scale-[1.01]'
                    }`
                  }
                  onClick={() => {
                    onThemeChange(theme.id);
                    setIsOpen(false);
                  }}
                  role="button"
                  aria-label={`Switch to ${theme.name}`}
                >
                  {/* Theme preview */}
                  <div
                    className={`h-6 rounded-lg theme-preview-${theme.id} border border-border/20 shadow-sm`}
                  ></div>
                  
                  {/* Theme info */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <span className="font-semibold text-xs text-foreground block">{theme.name}</span>
                      <span className="text-[10px] text-muted-foreground line-clamp-1">{theme.description}</span>
                    </div>
                    {currentTheme === theme.id && (
                      <div className="flex-shrink-0 ml-1">
                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
