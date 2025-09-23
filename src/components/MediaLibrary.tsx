import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, Search, Trash2, Edit, Image, Check, Eye, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LazyImage from '@/components/LazyImage';
import ImagePreviewModal from '@/components/ImagePreviewModal';
import { useMediaLibrary, type MediaFile, type UploadProgress } from '@/hooks/useMediaLibrary';
import { formatFileSize } from '@/utils/imageCompression';

interface MediaLibraryProps {
  onSelectImage?: (image: MediaFile) => void;
  selectedImageId?: string;
  compact?: boolean;
}

const MediaLibrary = ({ onSelectImage, selectedImageId, compact = false }: MediaLibraryProps) => {
  // Get data from the hook
  const {
    images,
    cloudImages,
    loading,
    uploadProgress,
    addImages,
    removeImage,
    updateImage,
    clearAll,
    getStorageInfo,
    cacheImageLocally,
    resetLocalCache,
    restoreFromPublishedSlides,
    restoreFromCloudImages,
    isEphemeralStorage
  } = useMediaLibrary();
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [previewImage, setPreviewImage] = useState<MediaFile | null>(null);
  const [currentProgress, setCurrentProgress] = useState<UploadProgress[]>([]);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Add debugging effect to monitor state changes
  React.useEffect(() => {
    console.log('[MediaLibrary] State updated:', {
      imageCount: images.length,
      loading,
      isUploading,
      hasImages: images.length > 0,
      filteredCount: filteredImages.length
    });

    // Show debug info if no images but not loading
    if (!loading && images.length === 0) {
      const info = `No images found. Loading: ${loading}, Images array length: ${images.length}`;
      setDebugInfo(info);
      console.log('[MediaLibrary] Debug info:', info);
    } else {
      setDebugInfo(null);
    }
  }, [images, loading, isUploading]);

  const storageInfo = getStorageInfo();

  // Get combined images for display - show both local and cloud images
  const allImages = [...images];
  
  // Add cloud images that aren't already cached locally
  cloudImages.forEach(cloudImg => {
    const existsLocally = images.some(img => 
      img.id === cloudImg.id || img.cloudPath === cloudImg.cloudPath
    );
    if (!existsLocally) {
      allImages.push({
        ...cloudImg,
        // Mark as cloud-only for UI display
        isCloudOnly: true
      } as any);
    }
  });

  const filteredImages = allImages.filter(image =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = async (files: FileList) => {
    setIsUploading(true);
    setCurrentProgress([]);
    
    try {
      const { success, errors } = await addImages(files, (progress) => {
        setCurrentProgress(progress);
      });
      
      // Show results
      if (success.length > 0) {        
        toast({
          title: "Images uploaded",
          description: `Successfully uploaded ${success.length} image(s).`
        });
      }
      
      if (errors.length > 0) {
        // Show detailed error information
        const errorMessages = errors.join('\n\n');
        toast({
          variant: "destructive",
          title: `Upload failed: ${errors.length} file(s)`,
          description: errors.length === 1 ? errors[0] : `${errors.length} files failed. Check console for details.`
        });
        
        // Log detailed errors to console for debugging
        console.error('Upload errors:', errors);
        
        // Show detailed errors in a more accessible way (first 3 errors)
        const errorsToShow = errors.slice(0, 3);
        errorsToShow.forEach((error, index) => {
          setTimeout(() => {
            toast({
              variant: "destructive",
              title: `Upload Error ${index + 1}`,
              description: error,
            });
          }, (index + 1) * 1000);
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Failed to upload images."
      });
    } finally {
      setIsUploading(false);
      setCurrentProgress([]);
    }
  };


  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleRename = (id: string, currentName: string) => {
    setEditingId(id);
    setNewName(currentName);
  };

  const saveRename = () => {
    if (editingId && newName.trim()) {
      updateImage(editingId, { name: newName.trim() });
      setEditingId(null);
      setNewName('');
      toast({
        title: "Image renamed",
        description: "Image name updated successfully."
      });
    }
  };

  const deleteImage = (id: string) => {
    removeImage(id);
    toast({
      title: "Image deleted",
      description: "Image removed from library."
    });
  };

  const handleCacheLocally = async (image: MediaFile) => {
    try {
      await cacheImageLocally(image);
      toast({
        title: "Image cached",
        description: `${image.name} is now cached locally.`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Cache failed",
        description: "Failed to cache image locally."
      });
    }
  };

  const handleSyncFromCloud = async () => {
    try {
      const restoredCount = await restoreFromCloudImages();
      toast({
        title: "Cloud Sync Complete",
        description: `Restored ${restoredCount} images from cloud storage`,
      });
    } catch (error) {
      console.error('Error syncing from cloud:', error);
      toast({
        title: "Sync Failed",
        description: "Failed to sync images from cloud storage",
        variant: "destructive",
      });
    }
  };

  const handleRestoreFromPublishedSlides = async () => {
    try {
      const restoredCount = await restoreFromPublishedSlides();
      if (restoredCount > 0) {
        toast({
          title: "Images restored",
          description: `Successfully restored ${restoredCount} image(s) from published slides.`
        });
      } else {
        toast({
          title: "No images to restore",
          description: "All published slide images are already in your library."
        });
      }
    } catch (error) {
      console.error('Failed to restore from published slides:', error);
      toast({
        variant: "destructive",
        title: "Restore failed",
        description: "Failed to restore images from published slides."
      });
    }
  };

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            size="sm"
          >
            <Upload className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
          {filteredImages.map(image => (
            <div
              key={image.id}
              className={`group relative aspect-square cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                selectedImageId === image.id 
                  ? 'border-primary ring-2 ring-primary/20' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onSelectImage?.(image)}
            >
              <LazyImage
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover"
                fallbackToPlaceholder={true}
              />
              {/* Cloud badge for compact view */}
              {image.source === 'cloud' && (
                <div className="absolute top-1 left-1">
                  <div className="bg-blue-500 text-white text-xs px-1 py-0.5 rounded">
                    Cloud
                  </div>
                </div>
              )}
              {selectedImageId === image.id && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-primary" />
                </div>
              )}
              {/* Preview button */}
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewImage(image);
                  }}
                  className="h-6 w-6 p-0"
                >
                  <Eye className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed transition-all ${
          isDragOver 
            ? 'border-primary bg-primary/5 scale-[1.02]' 
            : 'border-border hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-8 text-center">
          <Image className={`w-12 h-12 mx-auto mb-4 transition-colors ${
            isDragOver ? 'text-primary' : 'text-muted-foreground'
          }`} />
          <h3 className="text-lg font-semibold mb-2">Upload Images</h3>
          <p className="text-muted-foreground mb-2">
            {isDragOver ? 'Drop images here to upload' : 'Drag and drop images here, or click to browse'}
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Up to 50 MB per file accepted. We'll compress to under 10 MB.
          </p>
          
          {/* Storage Info */}
          <div className="mb-4 text-sm text-muted-foreground">
            <div className="flex justify-between items-center mb-1">
              <span>Storage Used: {formatFileSize(storageInfo.totalSize)}</span>
              <span>{Math.round(storageInfo.usagePercent)}%</span>
            </div>
            <Progress value={storageInfo.usagePercent} className="w-full max-w-xs mx-auto" />
            <div className="flex justify-between items-center mt-2 text-xs">
              <span>Local: {images.filter(img => img.source !== 'cloud').length}</span>
              <span>Cloud: {cloudImages.length}</span>
            </div>
          </div>

          {/* Ephemeral Storage Warning */}
          {isEphemeralStorage && (
            <div className="mb-4 p-2 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-xs text-yellow-800 dark:text-yellow-200">
              Local cache isn't persistent on this browser. Images will still show from the cloud.
            </div>
          )}
          
          {/* Upload Progress */}
          {isUploading && currentProgress.length > 0 && (
            <div className="mb-4 space-y-2 max-w-xs mx-auto">
              {currentProgress.map((progress) => (
                <div key={progress.fileIndex} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="truncate">{progress.fileName}</span>
                    <span className="capitalize">{progress.stage}</span>
                  </div>
                  <Progress value={progress.progress} className="h-2" />
                </div>
              ))}
            </div>
          )}
          
          <div className="flex gap-2 justify-center">
            <Button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Choose Files'}
            </Button>
            <Button 
              variant="outline"
              onClick={handleRestoreFromPublishedSlides}
              disabled={isUploading}
            >
              Restore from Slides
            </Button>
            <Button 
              variant="outline"
              onClick={handleSyncFromCloud}
              disabled={isUploading}
              size="sm"
            >
              Sync from Cloud
            </Button>
          </div>
        </div>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Image Grid */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">
          Loading images...
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredImages.map(image => (
          <Card 
            key={image.id} 
            className={`group relative aspect-square overflow-hidden cursor-pointer transition-all ${
              selectedImageId === image.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
            }`}
            onClick={() => onSelectImage?.(image)}
          >
            <LazyImage
              src={image.url}
              alt={image.name}
              className="w-full h-full object-cover"
              fallbackToPlaceholder={true}
            />
            
            {/* Cloud status badges */}
            {image.source === 'cloud' && (image as any).isCloudOnly && (
              <div className="absolute top-2 left-2">
                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Upload className="w-3 h-3" />
                  Cloud Only
                </div>
              </div>
            )}
            {image.source === 'cloud' && !(image as any).isCloudOnly && (
              <div className="absolute top-2 left-2">
                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Synced
                </div>
              </div>
            )}
            
            {selectedImageId === image.id && (
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-primary" />
              </div>
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-2 left-2 right-2">
                {editingId === image.id ? (
                  <div className="flex gap-1">
                    <Input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="text-xs h-6"
                      onKeyDown={(e) => e.key === 'Enter' && saveRename()}
                      autoFocus
                    />
                    <Button size="sm" onClick={saveRename} className="h-6 w-6 p-0">
                      <Check className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <p className="text-white text-xs truncate">{image.name}</p>
                )}
              </div>
              
              <div className="absolute top-2 right-2 flex gap-1">
                {(image as any).isCloudOnly ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCacheLocally(image);
                    }}
                    className="h-6 w-6 p-0"
                    title="Download to local cache"
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                ) : image.source === 'cloud' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCacheLocally(image);
                    }}
                    className="h-6 w-6 p-0"
                    title="Update local cache"
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                ) : null}
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewImage(image);
                  }}
                  className="h-6 w-6 p-0"
                >
                  <Eye className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRename(image.id, image.name);
                  }}
                  className="h-6 w-6 p-0"
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteImage(image.id);
                  }}
                  className="h-6 w-6 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
          ))}
        </div>
      )}

      {!loading && filteredImages.length === 0 && (
        <div className="text-center py-12 text-muted-foreground space-y-4">
          <div>
            {searchTerm ? 'No images match your search.' : 'No images uploaded yet.'}
          </div>
          {!searchTerm && (
            <div className="space-y-2">
              <p className="text-sm">
                If you have images visible on your slides but not here, try restoring them:
              </p>
              <Button 
                variant="outline"
                onClick={handleRestoreFromPublishedSlides}
                disabled={loading}
                className="mx-auto"
              >
                Restore Published Images
              </Button>
            </div>
          )}
          {debugInfo && (
            <div className="text-xs bg-muted p-2 rounded font-mono">
              Debug: {debugInfo}
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        className="hidden"
      />

      {/* Image Preview Modal */}
      {previewImage && (
        <ImagePreviewModal
          isOpen={!!previewImage}
          onClose={() => setPreviewImage(null)}
          imageUrl={previewImage.url}
          imageName={previewImage.name}
          imageAlt={previewImage.name}
        />
      )}
    </div>
  );
};

export default MediaLibrary;