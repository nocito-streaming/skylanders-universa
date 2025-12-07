import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { pagesImages } from '../data/images-config';

interface HeroSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  cta: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    title: 'Bienvenue dans la Skylanders Universe',
    description: "L'encyclopédie la plus complète sur Skylanders — personnages, portails, objets et guides.",
    image: pagesImages.hero[0],
    cta: 'Explorer les Personnages',
  },
  {
    id: 2,
    title: 'Découvre tous les personnages',
    description: 'Plus de 100 Skylanders à explorer, avec leurs compétences, stats et variantes.',
    image: pagesImages.hero[1],
    cta: 'Voir la Collection',
  },
  {
    id: 3,
    title: 'Guides et Astuces',
    description: 'Trouve toutes les soluces, astuces et secrets pour devenir un maître des Skylanders.',
    image: pagesImages.hero[2],
    cta: 'Accéder aux Guides',
  },
];

interface HeroProps {
  onCTAClick: () => void;
}

export function Hero({ onCTAClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-2xl bg-gray-900">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <ImageWithFallback
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>

          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring' }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white mb-6"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Nouvelle mise à jour</span>
                </motion.div>

                <h1 className="text-white mb-4">
                  {slides[currentSlide].title}
                </h1>

                <p className="text-xl text-gray-200 mb-8">
                  {slides[currentSlide].description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onCTAClick}
                  className="px-8 py-4 bg-gradient-to-r from-[#0B63D6] to-[#8A2BE2] text-white rounded-lg shadow-2xl hover:shadow-blue-500/50 transition-shadow"
                >
                  {slides[currentSlide].cta}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors z-10"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors z-10"
        aria-label="Slide suivant"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}