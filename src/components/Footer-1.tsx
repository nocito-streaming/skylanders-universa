import { Heart, Github, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0B63D6] via-[#8A2BE2] to-[#FF7A00] flex items-center justify-center">
                <span className="text-white text-sm font-black">S</span>
              </div>
              <span className="text-white">Skylanders Universe</span>
            </div>
            <p className="text-sm">
              L'encyclopédie la plus complète sur Skylanders — personnages, portails, objets et guides.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Personnages</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Jeux</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Objets Magiques</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Portails</a></li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="text-white mb-4">Ressources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Guides & Soluces</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog & Actualités</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-white mb-4">Restez connecté</h3>
            <div className="flex gap-3 mb-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-gray-400">
              Abonnez-vous pour ne rien manquer
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2024 Skylanders Universe. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            Créé avec <Heart className="w-4 h-4 text-red-500 fill-red-500" /> pour les fans de Skylanders
          </p>
        </div>
      </div>
    </footer>
  );
}
