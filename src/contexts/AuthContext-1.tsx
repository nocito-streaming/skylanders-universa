import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createClient } from '../utils/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import { toast } from 'sonner@2.0.3';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, displayName: string) => Promise<{ error?: string; needsVerification?: boolean }>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: 'google' | 'github' | 'discord', options?: any) => Promise<any>;
  verifyOTP: (email: string, token: string) => Promise<{ error?: string }>;
  resendOTP: (email: string) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAILS = ['thomas.25santi@gmail.com'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const isAdmin = user ? ADMIN_EMAILS.includes(user.email || '') : false;

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Clean up URL hash after successful authentication
      if (session && window.location.hash) {
        // Remove the hash from the URL without reloading the page
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Sign in error:', error.message);
        
        // Provide more helpful error messages
        if (error.message.includes('Invalid login credentials')) {
          return { error: 'Email ou mot de passe incorrect. Si vous n\'avez pas encore de compte, veuillez vous inscrire.' };
        } else if (error.message.includes('Email not confirmed')) {
          return { error: 'Veuillez confirmer votre email avant de vous connecter. Vérifiez votre boîte de réception.' };
        } else if (error.message.includes('User not found')) {
          return { error: 'Aucun compte trouvé avec cet email. Veuillez vous inscrire.' };
        }
        
        return { error: error.message };
      }

      return {};
    } catch (error: any) {
      console.error('Sign in error:', error.message);
      return { error: error.message || 'Une erreur est survenue lors de la connexion' };
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      // Use Supabase signUp with email confirmation
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName
          },
          emailRedirectTo: window.location.origin
        }
      });

      if (error) {
        console.error('Sign up error:', error.message);
        
        // Provide helpful error messages
        if (error.message.includes('already registered')) {
          return { error: 'Cet email est déjà enregistré. Veuillez vous connecter.' };
        }
        
        return { error: error.message };
      }

      // Success! Email verification sent
      toast.success('Compte créé ! Veuillez vérifier votre email pour confirmer votre inscription.');
      return {};
    } catch (error: any) {
      console.error('Sign up error:', error.message);
      return { error: error.message || 'Une erreur est survenue lors de l\'inscription' };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error: any) {
      console.error('Sign out error:', error.message);
    }
  };

  const signInWithProvider = async (provider: 'google' | 'github' | 'discord', options?: any) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
          ...options
        }
      });

      if (error) {
        console.error(`${provider} sign in error:`, error.message);
        return { error: error.message };
      }

      return {};
    } catch (error: any) {
      console.error(`${provider} sign in error:`, error.message);
      return { error: error.message || `An error occurred during ${provider} sign in` };
    }
  };

  const verifyOTP = async (email: string, token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'signup'
      });

      if (error) {
        console.error('Verify OTP error:', error.message);
        return { error: error.message };
      }

      return {};
    } catch (error: any) {
      console.error('Verify OTP error:', error.message);
      return { error: error.message || 'Une erreur est survenue lors de la vérification du code OTP' };
    }
  };

  const resendOTP = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email
      });

      if (error) {
        console.error('Resend OTP error:', error.message);
        return { error: error.message };
      }

      return {};
    } catch (error: any) {
      console.error('Resend OTP error:', error.message);
      return { error: error.message || 'Une erreur est survenue lors de l\'envoi du code OTP' };
    }
  };

  const value = {
    user,
    session,
    loading,
    isAdmin,
    signIn,
    signUp,
    signOut,
    signInWithProvider,
    verifyOTP,
    resendOTP
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}