import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PublishSlideRequest {
  slideId: string;
  image: {
    id: string;
    name: string;
    url: string;
    cloudPath?: string;
    altText?: string;
    dimensions?: { width: number; height: number };
    size?: number;
    type?: string;
  };
}

interface PublishAllSlidesRequest {
  slideConfig: Record<string, any>;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration');
    }

    // Create Supabase client with service role for bypassing RLS
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, data } = await req.json();

    if (action === 'publishSlide') {
      const { slideId, image } = data as PublishSlideRequest;
      
      // First, ensure image is uploaded to cloud storage and published_media
      const { error: mediaError } = await supabase
        .from('published_media')
        .upsert({
          image_id: image.id,
          image_name: image.name,
          cloud_path: image.cloudPath || `media/${image.id}`,
          cloud_url: image.url,
          file_size: image.size,
          file_type: image.type || 'image/jpeg',
          dimensions: image.dimensions,
          published_by: null, // System publication
        });

      if (mediaError) {
        console.error('Media publish error:', mediaError);
        throw mediaError;
      }

      // Then publish the slide configuration
      const { error: slideError } = await supabase
        .from('published_slide_configurations')
        .upsert({
          slide_id: slideId,
          image_id: image.id,
          image_name: image.name,
          image_url: image.url,
          cloud_path: image.cloudPath || `media/${image.id}`,
          alt_text: image.altText,
          dimensions: image.dimensions,
          size: image.size,
          published_by: null, // System publication
        });

      if (slideError) {
        console.error('Slide config publish error:', slideError);
        throw slideError;
      }

      console.log(`Successfully published slide: ${slideId}`);
      
      return new Response(
        JSON.stringify({ success: true, slideId }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }

    if (action === 'publishAllSlides') {
      const { slideConfig } = data as PublishAllSlidesRequest;
      const slideEntries = Object.entries(slideConfig).filter(([_, image]) => image);
      let successCount = 0;
      const errors: string[] = [];

      for (const [slideId, image] of slideEntries) {
        try {
          // Publish media
          const { error: mediaError } = await supabase
            .from('published_media')
            .upsert({
              image_id: image.id,
              image_name: image.name,
              cloud_path: image.cloudPath || `media/${image.id}`,
              cloud_url: image.url,
              file_size: image.size,
              file_type: image.type || 'image/jpeg',
              dimensions: image.dimensions,
              published_by: null,
            });

          if (mediaError) throw mediaError;

          // Publish slide config
          const { error: slideError } = await supabase
            .from('published_slide_configurations')
            .upsert({
              slide_id: slideId,
              image_id: image.id,
              image_name: image.name,
              image_url: image.url,
              cloud_path: image.cloudPath || `media/${image.id}`,
              alt_text: image.altText,
              dimensions: image.dimensions,
              size: image.size,
              published_by: null,
            });

          if (slideError) throw slideError;

          successCount++;
          console.log(`Successfully published slide: ${slideId}`);
        } catch (err) {
          console.error(`Failed to publish slide ${slideId}:`, err);
          errors.push(`${slideId}: ${err.message}`);
        }
      }

      return new Response(
        JSON.stringify({ 
          success: successCount === slideEntries.length,
          successCount,
          totalCount: slideEntries.length,
          errors
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }

    throw new Error('Invalid action specified');

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    );
  }
});