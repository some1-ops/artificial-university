import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  if (!supabaseUrl.startsWith('http')) {
    supabaseUrl = 'https://placeholder.supabase.co'
  }
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
  
  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
}
