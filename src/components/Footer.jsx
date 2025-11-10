import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white mt-auto border-t-4 border-yellow-600">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-40 h-16 mb-15">
                <Image 
                  src="/logo1.png" 
                  alt="BestLife Logo" 
                  width={160}
                  height={64}
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-gray-400 mt-5">
              Votre boutique de téléphones premium en ligne
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-yellow-600">Navigation</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-yellow-600 transition">Accueil</Link></li>
              <li><Link href="/produits" className="hover:text-yellow-600 transition">Produits</Link></li>
              <li><Link href="/about" className="hover:text-yellow-600 transition">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-600 transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-yellow-600">Liens utiles</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/profil" className="hover:text-yellow-600 transition">Politique de confidentialité</Link></li>
              <li><Link href="/commande" className="hover:text-yellow-600 transition">Conditions d'utilisation</Link></li>
              <li><Link href="/login" className="hover:text-yellow-600 transition"> Mentions légales</Link></li>
              <li><Link href="/faq" className="hover:text-yellow-600 transition">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-yellow-600">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📞 +237 699 27 29 93</li>
              <li>📞 +237 2 42 21 30 28</li>
              <li>📍 Douala, Cameroun

              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 best life. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
