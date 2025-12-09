import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  // Get cookie store - if this fails, we're likely in a build context
  let cookieStore
  try {
    cookieStore = await cookies()
  } catch (error) {
    // We're in a build/static context - use placeholder values to allow build to succeed
    // Make sure to set env vars in Netlify for runtime to work properly
    if (!supabaseUrl || !supabaseKey) {
      return createServerClient(
        'https://placeholder.supabase.co',
        'placeholder-key',
        {
          cookies: {
            getAll() {
              return []
            },
            setAll() {
              // No-op during build
            },
          },
        }
      )
    }
    // Re-throw if we have env vars but cookies() failed for another reason
    throw error
  }

  if (!supabaseUrl || !supabaseKey) {
    // We have cookies() access (runtime) but env vars are missing - throw error
    throw new Error(
      'Missing Supabase environment variables. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are set in your Netlify environment variables.'
    )
  }

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}