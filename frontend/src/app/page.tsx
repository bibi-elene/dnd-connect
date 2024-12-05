import JoinUsButton from './components/widgets/JoinButton';

export default function Home() {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url('/assets/tavern.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for Dark Background */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative text-center">
        <h1 className="text-6xl font-bold text-white">
          Welcome to D&D Connect!
        </h1>
        <JoinUsButton />
      </div>
    </div>
  );
}
