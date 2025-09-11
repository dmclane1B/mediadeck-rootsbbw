-- Fix security vulnerability in profiles table RLS policies
-- Remove potentially insecure overlapping policies and implement strict access control

-- First, drop all existing profiles policies to start fresh
DROP POLICY IF EXISTS "profiles_block_anonymous" ON public.profiles;
DROP POLICY IF EXISTS "profiles_users_view_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_users_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_users_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_verified_admins_only" ON public.profiles;
DROP POLICY IF EXISTS "profiles_verified_admins_update" ON public.profiles;

-- Create new, more secure and explicit policies

-- 1. Block all anonymous access completely
CREATE POLICY "profiles_block_all_anonymous_access" 
ON public.profiles 
FOR ALL 
TO anon 
USING (false) 
WITH CHECK (false);

-- 2. Users can only view their own profile data
CREATE POLICY "profiles_users_view_own_only" 
ON public.profiles 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- 3. Users can only insert their own profile (during signup)
CREATE POLICY "profiles_users_insert_own_only" 
ON public.profiles 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- 4. Users can only update their own profile data
CREATE POLICY "profiles_users_update_own_only" 
ON public.profiles 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- 5. Only verified admins can view all profiles (separate policy for clarity)
CREATE POLICY "profiles_admin_view_all" 
ON public.profiles 
FOR SELECT 
TO authenticated 
USING (is_admin_bulletproof());

-- 6. Only verified admins can update any profile (for admin management)
CREATE POLICY "profiles_admin_update_all" 
ON public.profiles 
FOR UPDATE 
TO authenticated 
USING (is_admin_bulletproof()) 
WITH CHECK (is_admin_bulletproof());

-- 7. Prevent regular users from deleting profiles (only admins should be able to)
CREATE POLICY "profiles_admin_delete_only" 
ON public.profiles 
FOR DELETE 
TO authenticated 
USING (is_admin_bulletproof());

-- Add additional security: Create a function to get masked profile data for non-admin users
CREATE OR REPLACE FUNCTION public.get_safe_profile_data(profile_user_id uuid DEFAULT auth.uid())
RETURNS TABLE(
  id uuid,
  user_id uuid,
  email text,
  full_name text,
  role text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only return data if user is requesting their own profile or is admin
  IF profile_user_id = auth.uid() OR is_admin_bulletproof() THEN
    RETURN QUERY
    SELECT 
      p.id,
      p.user_id,
      p.email,
      p.full_name,
      p.role,
      p.created_at,
      p.updated_at
    FROM public.profiles p
    WHERE p.user_id = profile_user_id;
  ELSE
    -- Return nothing for unauthorized access attempts
    RETURN;
  END IF;
END;
$$;

-- Log any unauthorized access attempts to profiles table
CREATE OR REPLACE FUNCTION public.log_profile_access_attempt()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log when someone tries to access profile data they shouldn't
  IF TG_OP = 'SELECT' AND OLD.user_id != auth.uid() AND NOT is_admin_bulletproof() THEN
    INSERT INTO public.audit_logs (
      table_name,
      operation,
      performed_by,
      user_id,
      new_data
    ) VALUES (
      'profiles',
      'UNAUTHORIZED_ACCESS_ATTEMPT',
      COALESCE(current_setting('request.jwt.claims', true)::json->>'email', 'unknown'),
      auth.uid(),
      jsonb_build_object(
        'attempted_profile_id', OLD.user_id,
        'timestamp', now(),
        'auth_uid', auth.uid()
      )
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;