import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const extra = (Constants?.expoConfig?.extra ?? {}) as {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
};

const url =
  process.env.EXPO_PUBLIC_SUPABASE_URL ??
  extra.supabaseUrl;

const anon =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
  extra.supabaseAnonKey;

if (!url || !anon) {
  console.warn('Missing Supabase config. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY or app.json extra.');
}

// Create a client even if config is missing; queries will return errors instead of crashing
export const supabase = createClient(url ?? 'https://invalid.local', anon ?? 'invalid');