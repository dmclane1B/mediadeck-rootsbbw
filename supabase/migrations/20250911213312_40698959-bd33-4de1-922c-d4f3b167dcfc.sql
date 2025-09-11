-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Create policies for media uploads
CREATE POLICY "Anyone can view media files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'media');

CREATE POLICY "Anyone can upload media files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'media');

CREATE POLICY "Anyone can update media files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'media');

CREATE POLICY "Anyone can delete media files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'media');