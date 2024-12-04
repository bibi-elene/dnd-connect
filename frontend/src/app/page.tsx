export default function Home() {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url('/assets/tavern.jpg')`, // Correct path to your image
        backgroundSize: "cover", // Ensures the image covers the whole screen
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        backgroundPosition: "center", // Centers the image on the screen
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <h1 className="relative text-6xl font-bold text-white">
        Welcome to D&D Connect!
      </h1>
    </div>
  );
}
