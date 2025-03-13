import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Wrench, Rocket } from 'lucide-react';

const Roadmap = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-white font-bold text-center mb-6">Project Roadmap</h1>

      {/* Technologies Used */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            Technologies Used
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Frontend:</strong> Next.js (React, TypeScript, Tailwind CSS, ShadCN UI)
            </li>
            <li>
              <strong>State Management:</strong> React Hook Form for form handling
            </li>
            <li>
              <strong>Backend:</strong> Nest.js with PostgreSQL & TypeORM
            </li>
            <li>
              <strong>Authentication:</strong> JWT & Protected Routes
            </li>
            <li>
              <strong>Real-Time Features:</strong> Socket.io (Chat & Live Updates)
            </li>
            <li>
              <strong>File Uploads:</strong> Native FS Storage
            </li>
            <li>
              <strong>Hosting:</strong> Vercel for frontend, Railway for backend
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Current Features */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="w-6 h-6 text-yellow-500" />
            Current Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              🎭 <strong>Character Creation:</strong> Select race, class, background, skills, and
              ability scores
            </li>
            <li>
              📜 <strong>Character Editing:</strong> Update character details with validation &
              image uploads
            </li>
            <li>
              💬 <strong>Live Chat:</strong> Real-time chat using Socket.io
            </li>
            <li>
              📂 <strong>Profile & Dashboard:</strong> View, edit, and manage characters
            </li>
            <li>
              🔐 <strong>Authentication:</strong> JWT-based login & protected routes
            </li>
            <li>
              📊 <strong>Interactive UI:</strong> Smooth animations & responsive design
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Future Plans */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-blue-500" />
            Future Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              🎨 <strong>Custom Character Portraits:</strong> AI-generated & user-uploaded avatars
            </li>
            <li>
              🗺️ <strong>World Building Tools:</strong> Maps, lore, and campaign management
            </li>
            <li>
              🎲 <strong>Dice Roller & Combat System:</strong> In-app dice rolls and battle tracking
            </li>
            <li>
              🔗 <strong>Social Integration:</strong> Party creation & collaborative storytelling
            </li>
            <li>
              📱 <strong>Mobile Optimization:</strong> PWA & better mobile experience
            </li>
          </ul>

          <div>
            This project was created with sole purpose of having a digital app for a famous Board
            Game - Dungeons and Dragons. Most ima
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Roadmap;
