import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import { SidebarProvider, Sidebar, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/app-sidebar';

export const metadata: Metadata = {
  title: 'D&D Connect',
  description: 'Connect with D&D characters',
  icons: {
    icon: '/assets/D&D-2.png',
    apple: '/assets/D&D-2.png',
  },
  alternates: {
    canonical: 'https://dndconnect.xyz',
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

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="bg-[#0c1015]">
        <AuthProvider>
          <SidebarProvider defaultOpen={false}>
            <div className="relative flex min-h-screen">
              <Sidebar collapsible="offcanvas">
                <AppSidebar />
              </Sidebar>
              <SidebarTrigger />
              <div className="relative z-10 flex-1">{children}</div>
            </div>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
