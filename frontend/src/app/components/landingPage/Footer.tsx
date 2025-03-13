import Link from 'next/link';
import { Mail, Linkedin, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 text-center">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Developer Info */}
        <div className="flex justify-center align-center mt-2">
          <p className="text-sm">
            Built by <span className="font-semibold">Elene Bibilashvili</span>
          </p>
        </div>

        <div className="flex gap-6 mt-2">
          <Link href="mailto:bibi.elene21@gmail.com" target="_blank" className="hover:opacity-80">
            <Mail className="w-5 h-5 text-gray-400 hover:text-blue-500 transition" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/bibi-elene/"
            target="_blank"
            className="hover:opacity-80"
          >
            <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-500 transition" />
          </Link>
          <Link
            href="https://www.instagram.com/bb.elene/"
            target="_blank"
            className="hover:opacity-80"
          >
            <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-500 transition" />
          </Link>
          <Link
            href="https://www.facebook.com/ekki.ros"
            target="_blank"
            className="hover:opacity-80"
          >
            <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-600 transition" />
          </Link>
        </div>

        {/* Credits */}
        <p className="text-xs opacity-70 mt-4 md:mt-0">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
