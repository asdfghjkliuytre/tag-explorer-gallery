import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme, THEME_CONFIGS } from '@/hooks/useTheme';
import { Palette, Monitor, Sun, Moon, Zap, Sparkles } from 'lucide-react';

interface ThemeSwitcherProps {
  variant?: 'compact' | 'full' | 'grouped';
  showLabels?: boolean;
  className?: string;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'light': return Sun;
    case 'dark': return Moon;
    case 'vibrant': return Zap;
    case 'neutral': return Sparkles;
    default: return Palette;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'light': return 'text-yellow-500';
    case 'dark': return 'text-blue-500';
    case 'vibrant': return 'text-purple-500';
    case 'neutral': return 'text-green-500';
    default: return 'text-muted-foreground';
  }
};

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  variant = 'compact', 
  showLabels = false,
  className = ''
}) => {
  const { currentTheme, setTheme, isTransitioning, resetToSystemTheme, getThemesByCategory } = useTheme();

  if (variant === 'grouped') {
    const categories = ['light', 'dark', 'vibrant', 'neutral'] as const;
    
    return (
      <div className={`space-y-4 ${className}`}>
        {/* System theme option */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">System Preference</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={resetToSystemTheme}
            className="h-7 px-3 text-xs"
          >
            Auto
          </Button>
        </div>

        {/* Grouped themes by category */}
        {categories.map(category => {
          const themes = getThemesByCategory(category);
          const Icon = getCategoryIcon(category);
          const colorClass = getCategoryColor(category);
          
          return (
            <div key={category} className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${colorClass}`} />
                <h4 className="text-sm font-medium capitalize">{category} Themes</h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {themes.map(theme => (
                  <Button
                    key={theme.id}
                    variant={currentTheme === theme.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme(theme.id)}
                    disabled={isTransitioning}
                    className="justify-start h-auto p-3 transition-all duration-200"
                  >
                    <div className="flex flex-col items-start gap-1 w-full">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm font-medium">{theme.name}</span>
                        {theme.accessibility.contrast === 'AAA' && (
                          <Badge variant="secondary" className="text-xs px-1 py-0">
                            AAA
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground text-left">
                        {theme.description}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ${className}`}>
        {THEME_CONFIGS.map(theme => {
          const Icon = getCategoryIcon(theme.category);
          const colorClass = getCategoryColor(theme.category);
          
          return (
            <Button
              key={theme.id}
              variant={currentTheme === theme.id ? "default" : "outline"}
              onClick={() => setTheme(theme.id)}
              disabled={isTransitioning}
              className="h-auto p-4 flex flex-col gap-2 transition-all duration-200 hover:scale-105"
            >
              <div className="flex items-center justify-between w-full">
                <Icon className={`h-4 w-4 ${colorClass}`} />
                {theme.accessibility.contrast === 'AAA' && (
                  <Badge variant="secondary" className="text-xs">
                    AAA
                  </Badge>
                )}
              </div>
              <div className="space-y-1 w-full">
                <div className="font-medium text-sm">{theme.name}</div>
                {showLabels && (
                  <div className="text-xs text-muted-foreground text-center">
                    {theme.description}
                  </div>
                )}
              </div>
              {/* Theme preview bar */}
              <div 
                className={`w-full h-2 rounded-full theme-preview-${theme.id} border border-border/20`}
              />
            </Button>
          );
        })}
      </div>
    );
  }

  // Compact variant (default)
  return (
    <div className={`flex items-center gap-1 bg-muted/50 rounded-lg p-1 ${className}`}>
      {THEME_CONFIGS.map(theme => (
        <Button
          key={theme.id}
          variant={currentTheme === theme.id ? "default" : "ghost"}
          size="sm"
          onClick={() => setTheme(theme.id)}
          disabled={isTransitioning}
          className={`h-8 px-2 text-xs capitalize transition-all duration-200 relative ${
            currentTheme === theme.id ? 'scale-105' : 'hover:scale-105'
          }`}
          title={`${theme.name}: ${theme.description}`}
        >
          {showLabels ? theme.name.replace('-', ' ') : theme.name.charAt(0).toUpperCase()}
          {theme.accessibility.contrast === 'AAA' && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
          )}
        </Button>
      ))}
      
      {/* Transition indicator */}
      {isTransitioning && (
        <div className="ml-2 w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      )}
    </div>
  );
};