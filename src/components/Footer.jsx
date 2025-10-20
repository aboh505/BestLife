import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-auto border-t border-yellow-500">
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
            <h4 className="font-bold mb-4 text-yellow-400">Navigation</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-white">Accueil</Link></li>
              <li><Link href="/produits" className="hover:text-white">Produits</Link></li>
              <li><Link href="/about" className="hover:text-white">A propos</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-yellow-400">Liens utiles</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/profil" className="hover:text-white">Politique de confidentialité</Link></li>
              <li><Link href="/commande" className="hover:text-white">Conditions d'utilisation</Link></li>
              <li><Link href="/login" className="hover:text-white"> Mentions légales</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-yellow-400">Contact</h4>
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
