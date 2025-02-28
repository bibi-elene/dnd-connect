import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import type { Metadata } from 'next';
import { Montserrat, Cinzel_Decorative } from 'next/font/google';

export const metadata: Metadata = {
  title: 'D&D Connect',
  description: 'Connect with D&D characters',
  icons: {
    icon: '/assets/D&D-2.png',
    apple: '/assets/D&D-2.png',
  },
  openGraph: {
    title: 'D&D Connect',
    description: 'Join the ultimate D&D community!',
    url: 'https://www.dndconnect.com',
    siteName: 'D&D Connect',
    images: [
      {
        url: '/assets/D&D-2.png',
        width: 800,
        height: 600,
        alt: 'D&D Connect logo2',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'D&D Connect',
    description: 'Join the ultimate D&D community!',
    images: ['/assets/D&D-2.png'],
  },
};

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cinzelDecorative.variable}`}>
      <link rel="preload" as="image" href="/assets/tavern.jpg" />
      <body>
        <AuthProvider>
          <div className="relative min-h-screen">
            <div className="relative z-10">{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
