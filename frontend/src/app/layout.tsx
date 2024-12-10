import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'D&D Connect',
  description: 'Connect with D&D characters',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
