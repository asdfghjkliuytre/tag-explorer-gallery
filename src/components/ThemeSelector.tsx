
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
    <div className="relative z-[99]">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-card/60 backdrop-blur-3xl border border-border/70 shadow-md hover:scale-105 transition-transform"
        aria-label="Theme selector"
      >
        <Palette className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-72 bg-card/98 backdrop-blur-2xl border border-border/70 rounded-2xl shadow-2xl z-[99] animate-fade-in">
          <div className="p-4 border-b border-border/40">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground tracking-normal">Choose Theme</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-muted/60">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map((theme) => (
                <div
                  key={theme.id}
                  className={
                    `p-3 rounded-xl cursor-pointer card-hover transition-all duration-200 border-2 flex flex-col space-y-2 group
                    ${currentTheme === theme.id
                      ? 'border-primary bg-primary/10 scale-[1.03] shadow-lg'
                      : 'border-border/60 hover:border-primary/70 hover:bg-muted/60'
                    }`
                  }
                  onClick={() => handleThemeSelect(theme.id)}
                  role="button"
                  aria-label={`Switch to ${theme.name}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-foreground">{theme.name}</span>
                    {currentTheme === theme.id && (
                      <Badge variant="default" className="text-xs">Active</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{theme.description}</p>
                  {/* Theme Preview Bar */}
                  <div className={`h-6 rounded-lg theme-preview-${theme.id} border border-border/30`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
