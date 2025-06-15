
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/ImageGallery";
import type { ImageData } from "@/pages/Index";
import type { TagStats } from "@/utils/tagProcessor";

interface GalleryMainContentProps {
  images: ImageData[];
  tagStats: TagStats[];
  selectedTag: string;
  setSelectedTag: (t: string) => void;
  searchTerm: string;
  setSearchTerm: (t: string) => void;
  toggleFavorite: (id: string) => void;
  updateImageTags: (id: string, tags: string[]) => void;
  currentTheme: string;
}

export function GalleryMainContent({
  images,
  tagStats,
  selectedTag,
  setSelectedTag,
  searchTerm,
  setSearchTerm,
  toggleFavorite,
  updateImageTags,
  currentTheme,
}: GalleryMainContentProps) {
  const availableTags = tagStats.map((stat) => stat.canonical);

  const accentText =
    currentTheme === 'cyberpunk'
      ? 'text-cyberpunk-accent'
      : 'text-primary';

  const filteredImages = images.filter(image => {
    const matchesTag =
      selectedTag === '' ||
      image.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase()));
    const matchesSearch =
      searchTerm === '' ||
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {(selectedTag || searchTerm) && (
        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className={`flex items-center gap-2 ${accentText}`}>
              <span className="text-sm font-semibold">Active filters:</span>
              {selectedTag && (
                <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/30">
                  Tag: {selectedTag}
                </span>
              )}
              {searchTerm && (
                <span className="text-sm bg-secondary/30 text-secondary-foreground px-3 py-1 rounded-full border border-border">
                  Search: {searchTerm}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedTag('');
                setSearchTerm('');
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          </div>
        </div>
      )}

      <ImageGallery
        images={filteredImages}
        onToggleFavorite={toggleFavorite}
        onTagClick={(tag) => setSelectedTag(selectedTag === tag ? '' : tag)}
        selectedTag={selectedTag}
        searchTerm={searchTerm}
        onUpdateTags={updateImageTags}
        availableTags={availableTags}
      />
    </div>
  );
}
