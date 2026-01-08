-- Drop profile_privacy_settings table and related objects
DROP TRIGGER IF EXISTS create_privacy_settings_on_profile_insert ON profiles;
DROP FUNCTION IF EXISTS create_profile_privacy_settings();
DROP POLICY IF EXISTS "Users can view their own privacy settings" ON profile_privacy_settings;
DROP POLICY IF EXISTS "Users can update their own privacy settings" ON profile_privacy_settings;
DROP TABLE IF EXISTS profile_privacy_settings;

-- Add privacy_settings JSONB column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS privacy_settings JSONB DEFAULT '{
  "show_owned_communities": {
    "enabled": true
  },
  "show_subscriptions": {
    "enabled": true
  },
  "allow_messaging": {
    "enabled": true
  }
}'::jsonb;

-- Create index for better query performance on JSONB field
CREATE INDEX IF NOT EXISTS idx_profiles_privacy_settings ON profiles USING gin (privacy_settings);

-- Update existing profiles to have default privacy settings if null
UPDATE profiles
SET privacy_settings = '{
  "show_owned_communities": {
    "enabled": true
  },
  "show_subscriptions": {
    "enabled": true
  },
  "allow_messaging": {
    "enabled": true
  }
}'::jsonb
WHERE privacy_settings IS NULL;





