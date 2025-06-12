
import { useState } from 'react';
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
  { id: 'cyberpunk', name: 'Cyberpunk', description: 'Futuristic vibes' }
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
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80"
      >
        <Palette className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-72 bg-card/95 backdrop-blur-sm border border-border/50 rounded-xl shadow-lg z-50">
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Choose Theme</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map((theme) => (
                <div
                  key={theme.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                    currentTheme === theme.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border/50 hover:border-primary/50 hover:bg-muted/50'
                  }`}
                  onClick={() => handleThemeSelect(theme.id)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-foreground">{theme.name}</span>
                      {currentTheme === theme.id && (
                        <Badge variant="default" className="text-xs">Active</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{theme.description}</p>
                    
                    {/* Theme Preview */}
                    <div className={`h-6 rounded theme-preview-${theme.id} border border-border/30`}></div>
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
