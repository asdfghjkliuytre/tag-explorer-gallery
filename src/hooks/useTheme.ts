import { useState, useEffect, useCallback } from 'react';

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  category: 'light' | 'dark' | 'vibrant' | 'neutral';
  accessibility: {
    contrast: 'AA' | 'AAA';
    reducedMotion?: boolean;
  };
  imageFilters?: {
    brightness?: number;
    contrast?: number;
    saturation?: number;
    hue?: number;
    blur?: number;
    sepia?: number;
  };
}

export const THEME_CONFIGS: ThemeConfig[] = [
  {
    id: 'light',
    name: 'Light',
    description: 'Clean and bright for daytime use',
    category: 'light',
    accessibility: { contrast: 'AAA' },
    imageFilters: { brightness: 1.0, contrast: 1.0, saturation: 1.0 }
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Easy on the eyes for low-light environments',
    category: 'dark',
    accessibility: { contrast: 'AAA' },
    imageFilters: { brightness: 0.9, contrast: 1.1, saturation: 0.95 }
  },
  {
    id: 'neon',
    name: 'Neon',
    description: 'Vibrant and electric energy',
    category: 'vibrant',
    accessibility: { contrast: 'AA' },
    imageFilters: { brightness: 1.1, contrast: 1.2, saturation: 1.3, hue: 5 }
  },
  {
    id: 'glass',
    name: 'Glass',
    description: 'Translucent elegance with depth',
    category: 'neutral',
    accessibility: { contrast: 'AA' },
    imageFilters: { brightness: 0.95, contrast: 1.05, saturation: 0.9, blur: 0.5 }
  },
  {
    id: 'pastel',
    name: 'Pastel',
    description: 'Soft and dreamy aesthetics',
    category: 'light',
    accessibility: { contrast: 'AA' },
    imageFilters: { brightness: 1.05, contrast: 0.9, saturation: 0.8 }
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Futuristic vibes with high contrast',
    category: 'dark',
    accessibility: { contrast: 'AA' },
    imageFilters: { brightness: 1.1, contrast: 1.3, saturation: 1.2, hue: 10 }
  },
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Ethereal gradient blues & purples',
    category: 'dark',
    accessibility: { contrast: 'AA' },
    imageFilters: { brightness: 0.95, contrast: 1.1, saturation: 1.1, hue: -5 }
  },
  {
    id: 'vintage-paper',
    name: 'Vintage Paper',
    description: 'Warm off-whites & muted reds',
    category: 'light',
    accessibility: { contrast: 'AA' },
    imageFilters: { brightness: 1.0, contrast: 0.95, saturation: 0.85, sepia: 0.2 }
  },
  {
    id: 'solar-flare',
    name: 'Solar Flare',
    description: 'Orange/blue cosmic energy',
    category: 'dark',
    accessibility: { contrast: 'AA' },
    imageFilters: { brightness: 1.05, contrast: 1.15, saturation: 1.25, hue: 15 }
  },
  {
    id: 'midnight-opal',
    name: 'Midnight Opal',
    description: 'Dark jewel tones with iridescence',
    category: 'dark',
    accessibility: { contrast: 'AA' },
    imageFilters: { brightness: 0.9, contrast: 1.2, saturation: 1.1, hue: -10 }
  },
  {
    id: 'forest-meadow',
    name: 'Forest Meadow',
    description: 'Green/brown natural calm',
    category: 'neutral',
    accessibility: { contrast: 'AA' },
    imageFilters: { brightness: 1.0, contrast: 1.0, saturation: 0.9, hue: 5 }
  },
  {
    id: 'tight',
    name: 'Tight',
    description: 'Ultra-compact, dense and efficient UI',
    category: 'light',
    accessibility: { contrast: 'AAA', reducedMotion: true },
    imageFilters: { brightness: 1.0, contrast: 1.0, saturation: 1.0 }
  }
];

export interface UseThemeReturn {
  currentTheme: string;
  themeConfig: ThemeConfig;
  setTheme: (themeId: string) => void;
  isTransitioning: boolean;
  getImageFilter: (themeId?: string) => string;
  getThemesByCategory: (category: ThemeConfig['category']) => ThemeConfig[];
  resetToSystemTheme: () => void;
}

export const useTheme = (): UseThemeReturn => {
  const [currentTheme, setCurrentTheme] = useState<string>('cyberpunk');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get system preference
  const getSystemTheme = useCallback((): string => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('gallery-theme');
    if (savedTheme && THEME_CONFIGS.find(t => t.id === savedTheme)) {
      setCurrentTheme(savedTheme);
    } else {
      const systemTheme = getSystemTheme();
      setCurrentTheme(systemTheme);
    }
  }, [getSystemTheme]);

  // Apply theme to document
  useEffect(() => {
    const applyTheme = async () => {
      setIsTransitioning(true);
      
      // Remove all existing theme classes
      const root = document.documentElement;
      THEME_CONFIGS.forEach(config => {
        root.classList.remove(`theme-${config.id}`);
      });
      
      // Add new theme class
      root.classList.add(`theme-${currentTheme}`);
      
      // Set data attribute for CSS selectors
      root.setAttribute('data-theme', currentTheme);
      
      // Apply accessibility preferences
      const themeConfig = THEME_CONFIGS.find(t => t.id === currentTheme);
      if (themeConfig?.accessibility.reducedMotion) {
        root.style.setProperty('--transition-duration', '0ms');
      } else {
        root.style.removeProperty('--transition-duration');
      }
      
      // Save to localStorage
      localStorage.setItem('gallery-theme', currentTheme);
      
      // Transition delay
      setTimeout(() => setIsTransitioning(false), 300);
    };

    applyTheme();
  }, [currentTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const savedTheme = localStorage.getItem('gallery-theme');
      if (!savedTheme) {
        setCurrentTheme(getSystemTheme());
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [getSystemTheme]);

  const setTheme = useCallback((themeId: string) => {
    if (THEME_CONFIGS.find(t => t.id === themeId)) {
      setCurrentTheme(themeId);
    }
  }, []);

  const getImageFilter = useCallback((themeId?: string): string => {
    const theme = THEME_CONFIGS.find(t => t.id === (themeId || currentTheme));
    if (!theme?.imageFilters) return 'none';
    
    const filters = [];
    const { brightness, contrast, saturation, hue, blur, sepia } = theme.imageFilters;
    
    if (brightness !== undefined) filters.push(`brightness(${brightness})`);
    if (contrast !== undefined) filters.push(`contrast(${contrast})`);
    if (saturation !== undefined) filters.push(`saturate(${saturation})`);
    if (hue !== undefined) filters.push(`hue-rotate(${hue}deg)`);
    if (blur !== undefined) filters.push(`blur(${blur}px)`);
    if (sepia !== undefined) filters.push(`sepia(${sepia})`);
    
    return filters.length > 0 ? filters.join(' ') : 'none';
  }, [currentTheme]);

  const getThemesByCategory = useCallback((category: ThemeConfig['category']): ThemeConfig[] => {
    return THEME_CONFIGS.filter(theme => theme.category === category);
  }, []);

  const resetToSystemTheme = useCallback(() => {
    localStorage.removeItem('gallery-theme');
    setCurrentTheme(getSystemTheme());
  }, [getSystemTheme]);

  const themeConfig = THEME_CONFIGS.find(t => t.id === currentTheme) || THEME_CONFIGS[0];

  return {
    currentTheme,
    themeConfig,
    setTheme,
    isTransitioning,
    getImageFilter,
    getThemesByCategory,
    resetToSystemTheme
  };
};