export interface CompressionOptions {
  maxSizeBytes: number;
  quality: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface CompressionResult {
  compressedFile: string; // base64 data URL
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  dimensions: { width: number; height: number };
}

const DEFAULT_OPTIONS: CompressionOptions = {
  maxSizeBytes: 10 * 1024 * 1024, // 10MB
  quality: 0.8,
  maxWidth: 2048,
  maxHeight: 2048
};

export const compressImage = async (
  file: File, 
  options: Partial<CompressionOptions> = {},
  onProgress?: (progress: number) => void
): Promise<CompressionResult> => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  onProgress?.(10);

  // If file is already small enough, return as-is
  if (file.size <= opts.maxSizeBytes) {
    const dataUrl = await fileToDataUrl(file);
    const dimensions = await getImageDimensions(dataUrl);
    onProgress?.(100);
    
    return {
      compressedFile: dataUrl,
      originalSize: file.size,
      compressedSize: file.size,
      compressionRatio: 1,
      dimensions
    };
  }

  onProgress?.(25);

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      try {
        onProgress?.(50);
        
        // Calculate new dimensions
        let { width, height } = img;
        
        if (opts.maxWidth && width > opts.maxWidth) {
          height = (height * opts.maxWidth) / width;
          width = opts.maxWidth;
        }
        
        if (opts.maxHeight && height > opts.maxHeight) {
          width = (width * opts.maxHeight) / height;
          height = opts.maxHeight;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        onProgress?.(70);
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        
        onProgress?.(90);
        
        // Try different quality levels to meet size requirement
        let quality = opts.quality;
        let compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        let attempts = 0;
        
        // Reduce quality until size is acceptable (max 5 attempts)
        while (getDataUrlSize(compressedDataUrl) > opts.maxSizeBytes && attempts < 5 && quality > 0.1) {
          quality *= 0.8;
          compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          attempts++;
        }
        
        onProgress?.(100);
        
        const compressedSize = getDataUrlSize(compressedDataUrl);
        
        resolve({
          compressedFile: compressedDataUrl,
          originalSize: file.size,
          compressedSize,
          compressionRatio: file.size / compressedSize,
          dimensions: { width, height }
        });
      } catch (error) {
        reject(new Error('Compression failed'));
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

const getImageDimensions = (dataUrl: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
};

const getDataUrlSize = (dataUrl: string): number => {
  // Remove data URL prefix and calculate base64 size
  const base64 = dataUrl.split(',')[1] || '';
  return Math.round((base64.length * 3) / 4);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};