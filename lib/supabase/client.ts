import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'
import { supabase as mockSupabase } from './mock-client'

export function createClient() {
  // Check if we have valid Supabase credentials
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key || url.includes('placeholder')) {
    // Return mock client for development
    console.warn('Using mock Supabase client - configure real credentials in .env.local')
    return mockSupabase
  }

  return createBrowserClient<Database>(url, key)
}

// Export a singleton instance for client components
export const supabase = createClient()