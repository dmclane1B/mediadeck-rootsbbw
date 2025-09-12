-- Create published slide configurations table
CREATE TABLE public.published_slide_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slide_id TEXT NOT NULL,
  image_id TEXT NOT NULL,
  image_name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  cloud_path TEXT NOT NULL,
  alt_text TEXT,
  dimensions JSONB,
  size INTEGER,
  published_by UUID REFERENCES auth.users(id),
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  version INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'active'
);

-- Create published media table
CREATE TABLE public.published_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_id TEXT NOT NULL UNIQUE,
  image_name TEXT NOT NULL,
  cloud_path TEXT NOT NULL,
  cloud_url TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  dimensions JSONB,
  published_by UUID REFERENCES auth.users(id),
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.published_slide_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.published_media ENABLE ROW LEVEL SECURITY;

-- RLS Policies for published_slide_configurations
CREATE POLICY "Published slides are viewable by everyone"
ON public.published_slide_configurations
FOR SELECT
USING (status = 'active');

CREATE POLICY "Authenticated users can publish slides"
ON public.published_slide_configurations
FOR INSERT
WITH CHECK (auth.uid() = published_by);

CREATE POLICY "Publishers can update their slides"
ON public.published_slide_configurations
FOR UPDATE
USING (auth.uid() = published_by);

CREATE POLICY "Publishers can delete their slides"
ON public.published_slide_configurations
FOR DELETE
USING (auth.uid() = published_by);

-- RLS Policies for published_media
CREATE POLICY "Published media is viewable by everyone"
ON public.published_media
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can publish media"
ON public.published_media
FOR INSERT
WITH CHECK (auth.uid() = published_by);

CREATE POLICY "Publishers can update their media"
ON public.published_media
FOR UPDATE
USING (auth.uid() = published_by);

CREATE POLICY "Publishers can delete their media"
ON public.published_media
FOR DELETE
USING (auth.uid() = published_by);

-- Create indexes
CREATE INDEX idx_published_slide_configurations_slide_id ON public.published_slide_configurations(slide_id);
CREATE INDEX idx_published_slide_configurations_status ON public.published_slide_configurations(status);
CREATE INDEX idx_published_media_image_id ON public.published_media(image_id);

-- Create trigger for updated_at
CREATE TRIGGER update_published_slide_configurations_updated_at
  BEFORE UPDATE ON public.published_slide_configurations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_published_media_updated_at
  BEFORE UPDATE ON public.published_media
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();