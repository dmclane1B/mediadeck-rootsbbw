import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, Search, Trash2, Edit, Image, Check, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LazyImage from '@/components/LazyImage';
import ImagePreviewModal from '@/components/ImagePreviewModal';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  uploadDate: string;
  dimensions?: { width: number; height: number };
  size?: number;
}

interface MediaLibraryProps {
  onSelectImage?: (image: MediaFile) => void;
  selectedImageId?: string;
  compact?: boolean;
}

const MediaLibrary = ({ onSelectImage, selectedImageId, compact = false }: MediaLibraryProps) => {
  const [images, setImages] = useState<MediaFile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [previewImage, setPreviewImage] = useState<MediaFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const filteredImages = images.filter(img => 
    img.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = async (files: FileList) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const newImages: MediaFile[] = [];
      const totalFiles = files.length;
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (!file.type.startsWith('image/')) {
          toast({
            variant: "destructive",
            title: "Invalid file type",
            description: `${file.name} is not an image file.`
          });
          continue;
        }

        // Simulate upload progress
        setUploadProgress(((i + 1) / totalFiles) * 100);

        // Create object URL for preview
        const url = URL.createObjectURL(file);
        
        const newImage: MediaFile = {
          id: `img-${Date.now()}-${i}`,
          name: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
          url,
          uploadDate: new Date().toISOString(),
          size: file.size
        };
        
        // Get dimensions asynchronously after creating the image object
        getImageDimensions(url).then(dimensions => {
          const updatedImage = { ...newImage, dimensions };
          setImages(prev => prev.map(img => img.id === newImage.id ? updatedImage : img));
        }).catch(() => {
          // Dimensions loading failed, but that's okay
        });
        
        newImages.push(newImage);
        
        // Small delay to show progress
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      setImages(prev => [...prev, ...newImages]);
      toast({
        title: "Images uploaded",
        description: `Successfully uploaded ${newImages.length} image(s).`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Failed to upload one or more images."
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img') as HTMLImageElement;
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = url;
    });
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
      setImages(prev => prev.map(img => 
        img.id === editingId ? { ...img, name: newName.trim() } : img
      ));
      setEditingId(null);
      setNewName('');
      toast({
        title: "Image renamed",
        description: "Image name updated successfully."
      });
    }
  };

  const deleteImage = (id: string) => {
    const image = images.find(img => img.id === id);
    if (image) {
      URL.revokeObjectURL(image.url);
      setImages(prev => prev.filter(img => img.id !== id));
      toast({
        title: "Image deleted",
        description: "Image removed from library."
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
              />
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
          <p className="text-muted-foreground mb-4">
            {isDragOver ? 'Drop images here to upload' : 'Drag and drop images here, or click to browse'}
          </p>
          
          {isUploading && (
            <div className="mb-4 space-y-2">
              <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
              <p className="text-sm text-muted-foreground">
                Uploading... {Math.round(uploadProgress)}%
              </p>
            </div>
          )}
          
          <Button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Choose Files'}
          </Button>
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
            />
            
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

      {filteredImages.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {searchTerm ? 'No images match your search.' : 'No images uploaded yet.'}
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