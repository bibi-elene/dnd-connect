import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'D&D Connect',
  description: 'Connect with D&D characters',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="relative min-h-screen">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10">{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
