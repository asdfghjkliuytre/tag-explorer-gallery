import React from 'react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Palette, Eye, Accessibility } from 'lucide-react';

export const ThemeShowcase: React.FC = () => {
  const { currentTheme, themeConfig, getImageFilter, resetToSystemTheme } = useTheme();

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Palette className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Dynamic Theme System</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experience our comprehensive theme switcher with smooth transitions, 
          accessibility compliance, and adaptive image filters for every theme.
        </p>
      </div>

      {/* Current Theme Info */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Current Theme: {themeConfig.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {themeConfig.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">
              Category: {themeConfig.category}
            </Badge>
            <Badge 
              variant={themeConfig.accessibility.contrast === 'AAA' ? 'default' : 'secondary'}
              className="flex items-center gap-1"
            >
              <Accessibility className="h-3 w-3" />
              {themeConfig.accessibility.contrast} Contrast
            </Badge>
            {themeConfig.accessibility.reducedMotion && (
              <Badge variant="secondary">
                Reduced Motion
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Image Filters Applied:</h4>
            <code className="text-xs bg-muted p-2 rounded block">
              {getImageFilter() || 'none'}
            </code>
          </div>
        </CardContent>
      </Card>

      {/* Theme Switcher Variants */}
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Compact Theme Switcher</CardTitle>
          </CardHeader>
          <CardContent>
            <ThemeSwitcher variant="compact" showLabels={false} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Full Theme Grid</CardTitle>
          </CardHeader>
          <CardContent>
            <ThemeSwitcher variant="full" showLabels={true} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grouped by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ThemeSwitcher variant="grouped" />
          </CardContent>
        </Card>
      </div>

      {/* Demo Image with Adaptive Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Adaptive Image Filters Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This demo image shows how filters adapt to each theme for optimal viewing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Without Adaptive Filters</h4>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                  alt="Demo landscape"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">With Adaptive Filters</h4>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                  alt="Demo landscape with adaptive filters"
                  className="w-full h-full object-cover theme-adaptive-image"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Theme Reset */}
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium">Reset to System Preference</h3>
            <p className="text-sm text-muted-foreground">
              Use your operating system's preferred color scheme
            </p>
            <Button onClick={resetToSystemTheme} variant="outline">
              Reset to System Theme
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};