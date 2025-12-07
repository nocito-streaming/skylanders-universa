import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Github, Info, Loader2, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, defaultMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'verify-email'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, signInWithProvider, verifyOTP, resendOTP } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    if (mode === 'signup' && !displayName) {
      toast.error('Veuillez entrer votre nom d\'affichage');
      return;
    }

    if (password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error);
        } else {
          toast.success('Connexion réussie !');
          setEmail('');
          setPassword('');
          onClose();
        }
      } else {
        const { error, needsVerification } = await signUp(email, password, displayName);
        if (error) {
          toast.error(error);
        } else if (needsVerification) {
          toast.success('Un code de vérification a été envoyé à votre email');
          setMode('verify-email');
        } else {
          toast.success('Compte créé avec succès !');
          setEmail('');
          setPassword('');
          setDisplayName('');
          onClose();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Veuillez entrer un code à 6 chiffres');
      return;
    }

    setLoading(true);

    try {
      const { error } = await verifyOTP(email, verificationCode);
      if (error) {
        toast.error(error);
      } else {
        toast.success('Email vérifié avec succès !');
        setEmail('');
        setPassword('');
        setDisplayName('');
        setVerificationCode('');
        setMode('signin');
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    try {
      const { error } = await resendOTP(email);
      if (error) {
        toast.error(error);
      } else {
        toast.success('Nouveau code envoyé !');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProviderSignIn = async (provider: 'google' | 'github' | 'discord') => {
    setLoading(true);

    try {
      let result;
      if (provider === 'google') {
        // Google avec sélection obligatoire du compte
        result = await signInWithProvider(provider, {
          redirectTo: window.location.origin,
          options: {
            queryParams: { prompt: 'select_account' }
          }
        });
      } else {
        // Autres providers
        result = await signInWithProvider(provider, {
          redirectTo: window.location.origin
        });
      }

      const { data, error } = result;

      if (error) {
        toast.error(error.message || 'Erreur OAuth');
      }
      // La redirection OAuth gère la navigation, pas besoin de fermer le modal
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative bg-white dark:bg-card rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-800"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-gray-900 dark:text-white mb-2">
                {mode === 'verify-email' ? 'Vérifier votre email' : mode === 'signin' ? 'Connexion' : 'Créer un compte'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {mode === 'verify-email'
                  ? 'Entrez le code envoyé à votre email'
                  : mode === 'signin'
                  ? 'Accédez à votre collection Skylanders'
                  : 'Rejoignez la communauté Skylanders'}
              </p>
            </div>

            {mode === 'verify-email' ? (
              // OTP Verification Form
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-2">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <p className="mb-1">Un code à 6 chiffres a été envoyé à :</p>
                    <p className="font-medium">{email}</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="verificationCode">Code de vérification</Label>
                  <div className="relative mt-1">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="verificationCode"
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      required
                      maxLength={6}
                      className="pl-10 text-center text-2xl tracking-widest"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading || verificationCode.length !== 6}>
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Vérifier mon email'}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={loading}
                    className="text-sm text-[#0B63D6] hover:underline disabled:opacity-50"
                  >
                    Renvoyer le code
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setVerificationCode('');
                    }}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    Modifier l'email
                  </button>
                </div>
              </form>
            ) : (
              <>
            {/* OAuth buttons */}
            <div className="space-y-3 mb-6">
              <Button
                type="button"
                variant="outline"
                className="w-full relative bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
                onClick={() => handleProviderSignIn('google')}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continuer avec Google
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
                onClick={() => handleProviderSignIn('github')}
                disabled={loading}
              >
                <Github className="w-5 h-5 mr-2" />
                Continuer avec GitHub
              </Button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-card text-gray-500 dark:text-gray-400">Ou par email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signin' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    <strong>Première visite ?</strong> Cliquez sur "S'inscrire" ci-dessous pour créer votre compte.
                  </p>
                </div>
              )}

              {mode === 'signup' && (
                <div>
                  <Label htmlFor="displayName">Nom d'affichage</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="displayName"
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Votre nom"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="pl-10"
                  />
                </div>
                {mode === 'signup' && (
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum 6 caractères
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (mode === 'signin' ? 'Se connecter' : 'Créer mon compte')}
              </Button>
            </form>

            {/* Toggle mode */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                className="text-sm text-[#0B63D6] hover:underline"
              >
                {mode === 'signin'
                  ? "Pas encore de compte ? S'inscrire"
                  : 'Déjà un compte ? Se connecter'}
              </button>
            </div>

            {/* OAuth notice */}
            {mode === 'signup' && (
              <p className="text-xs text-gray-500 text-center mt-6">
                En créant un compte, vous acceptez nos conditions d'utilisation
              </p>
            )}
            </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}