import { motion } from 'motion/react';
import { Construction, ArrowLeft } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description: string;
  onNavigate: (page: string) => void;
}

export function ComingSoon({ title, description, onNavigate }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-24 h-24 bg-gradient-to-br from-[#0B63D6] via-[#8A2BE2] to-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
        >
          <Construction className="w-12 h-12 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-gray-900 mb-4">{title}</h1>
          <p className="text-xl text-gray-600 mb-8">
            {description}
          </p>
          <p className="text-gray-500 mb-8">
            Cette section est en cours de développement et sera bientôt disponible. 
            Revenez régulièrement pour découvrir les nouveautés !
          </p>

          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B63D6] text-white rounded-lg hover:bg-[#0B63D6]/90 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à l'accueil
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-3 gap-4"
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 bg-gray-100 rounded-xl animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
