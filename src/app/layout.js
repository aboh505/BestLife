import "./globals.css";
import { Roboto } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import { PanierProvider } from '@/context/PanierContext';
import LayoutWrapper from '@/components/LayoutWrapper';

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "BestLife - Boutique de Téléphones Premium",
  description: "Découvrez les meilleurs téléphones aux meilleurs prix",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${roboto.className} antialiased flex flex-col min-h-screen`}>
        <AuthProvider>
          <PanierProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </PanierProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
