
import { useState, useEffect } from 'react';
import { extractTagsFromFilename, createTagStats, TagStats } from '@/utils/tagProcessor';
import { extractMainTitle } from '@/utils/titleExtractor';
import type { ImageData } from '@/pages/Index';

export function useGalleryImages() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [tagStats, setTagStats] = useState<TagStats[]>([]);
  const [selectedFolderName, setSelectedFolderName] = useState<string>('');
  const [recentFolders, setRecentFolders] = useState<string[]>([]);

  // Add to recent folders
  useEffect(() => {
    if (selectedFolderName && !recentFolders.includes(selectedFolderName)) {
      setRecentFolders([selectedFolderName, ...recentFolders.slice(0, 3)]);
    }
    // eslint-disable-next-line
  }, [selectedFolderName]);

  const handleFolderSelect = async (files: FileList) => {
    const imageFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/')
    );
    const loadedImages: ImageData[] = await Promise.all(
      imageFiles.map(async (file, index) => {
        const src = URL.createObjectURL(file);
        const folderPath = file.webkitRelativePath ? 
          file.webkitRelativePath.split('/').slice(0, -1).join('/') : 
          'root';
        const { tags } = extractTagsFromFilename(file.name);
        const title = extractMainTitle(file.name);
        return {
          id: `${Date.now()}-${index}`,
          filename: file.name,
          src,
          title,
          tags,
          favorite: false,
          folder: folderPath
        };
      })
    );
    setImages(loadedImages);
    const stats = createTagStats(loadedImages);
    setTagStats(stats);
    const firstFile = imageFiles[0];
    if (firstFile && firstFile.webkitRelativePath) {
      const folderName = firstFile.webkitRelativePath.split('/')[0];
      setSelectedFolderName(folderName);
    } else {
      setSelectedFolderName('Selected Images');
    }
  };

  const handleSampleGallery = () => {
    const sampleImages: ImageData[] = [
      {
        id: "demo1",
        filename: "aurora_landscape.jpg",
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
        title: "Northern Lights",
        tags: ["aurora", "sky", "nature"],
        favorite: false,
        folder: "Sample",
      },
      {
        id: "demo2",
        filename: "forest_meadow.jpg",
        src: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&q=80",
        title: "Forest Meadow",
        tags: ["forest", "meadow", "nature"],
        favorite: false,
        folder: "Sample",
      },
      {
        id: "demo3",
        filename: "old_paper.jpg",
        src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80",
        title: "Vintage Paper",
        tags: ["vintage", "paper", "classic"],
        favorite: false,
        folder: "Sample",
      },
    ];
    setImages(sampleImages);
    setTagStats(createTagStats(sampleImages));
    setSelectedFolderName("Sample Gallery");
  };

  const handleClearFolder = () => {
    setImages([]);
    setTagStats([]);
    setSelectedFolderName('');
  };

  const toggleFavorite = (imageId: string) => {
    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, favorite: !img.favorite } : img
    ));
  };

  const updateImageTags = (imageId: string, newTags: string[]) => {
    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, tags: newTags } : img
    ));
    const updatedImages = images.map(img => 
      img.id === imageId ? { ...img, tags: newTags } : img
    );
    const stats = createTagStats(updatedImages);
    setTagStats(stats);
  };

  return {
    images,
    setImages,
    tagStats,
    setTagStats,
    selectedFolderName,
    setSelectedFolderName,
    recentFolders,
    setRecentFolders,
    handleFolderSelect,
    handleSampleGallery,
    handleClearFolder,
    toggleFavorite,
    updateImageTags,
  };
}
