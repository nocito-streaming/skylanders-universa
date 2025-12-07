import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Singleton Supabase client instance
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

export function createClient() {
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient(
      `https://${projectId}.supabase.co`,
      publicAnonKey
    );
  }
  return supabaseInstance;
}

// Helper to get auth headers for API calls
export async function getAuthHeaders() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.access_token) {
    return {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json'
    };
  }
  
  return {
    'Authorization': `Bearer ${publicAnonKey}`,
    'Content-Type': 'application/json'
  };
}

// Helper to make authenticated API calls
export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const headers = await getAuthHeaders();
  
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-5fb874e3${endpoint}`,
    {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `API call failed: ${response.statusText}`);
  }

  return response.json();
}
