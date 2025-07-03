
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
        size="icon"
        onClick={() => setIsOpen(o => !o)}
        className="relative bg-card/80 backdrop-blur-xl border border-border/40 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        aria-label="Theme selector"
      >
        <Palette className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-14 w-80 bg-card/95 backdrop-blur-2xl border border-border/40 rounded-3xl shadow-2xl z-50 animate-fade-in overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-border/30 bg-gradient-to-r from-card to-card/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse"></div>
                <h3 className="font-bold text-lg text-foreground tracking-tight">Choose Theme</h3>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-muted/60 rounded-full transition-colors duration-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Transform your gallery experience</p>
          </div>
          
          {/* Theme grid */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {THEMES.map((theme) => (
                <div
                  key={theme.id}
                  className={
                    `group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 flex flex-col space-y-3
                    ${currentTheme === theme.id
                      ? 'border-primary bg-gradient-to-br from-primary/10 to-accent/10 scale-[1.02] shadow-lg'
                      : 'border-border/40 hover:border-primary/50 hover:bg-gradient-to-br hover:from-muted/60 hover:to-muted/40 hover:scale-[1.01]'
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
                    className={`h-8 rounded-xl theme-preview-${theme.id} border border-border/20 shadow-sm group-hover:shadow-md transition-shadow duration-300`}
                  ></div>
                  
                  {/* Theme info */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <span className="font-bold text-sm text-foreground block">{theme.name}</span>
                      <span className="text-xs text-muted-foreground">{theme.description}</span>
                    </div>
                    {currentTheme === theme.id && (
                      <div className="flex-shrink-0 ml-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Active indicator glow */}
                  {currentTheme === theme.id && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 -z-10 blur-sm"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
