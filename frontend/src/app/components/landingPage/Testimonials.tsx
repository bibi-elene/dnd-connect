const Testimonials = () => {
  return (
    <section className="relative py-20 text-white overflow-hidden">
      {/* Bottom fading shadow */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Tales from the Tavern</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div
            className="p-6 bg-[#132f5a] bg-cover bg-center rounded-lg shadow-md hover:shadow-lg transition flex flex-col items-center text-center"
            style={{
              backgroundImage: "url('/assets/vector-blob.svg')",
            }}
          >
            <div className="text-5xl mb-4">🧝‍♀️</div>
            <p className="text-gray-300 italic mb-4">
              "Never again did we lose track of a side quest! D&D Connect is as essential as my
              longsword."
            </p>
            <div className="text-sm text-gray-400">— Elara, Elf Ranger</div>
          </div>

          {/* Card 2 */}
          <div
            className="p-6 bg-[#132f5a] bg-cover bg-center rounded-lg shadow-md hover:shadow-lg transition flex flex-col items-center text-center"
            style={{
              backgroundImage: "url('/assets/vector-blob-reverse.svg')",
            }}
          >
            <div className="text-5xl mb-4">🧔‍♂️</div>
            <p className="text-gray-300 italic mb-4">
              "This kept our group together across time zones. No session left behind!"
            </p>
            <div className="text-sm text-gray-400">— Durgan, Dwarf Fighter</div>
          </div>

          {/* Card 3 */}
          <div
            className="p-6 bg-[#132f5a] bg-cover bg-center rounded-lg shadow-md hover:shadow-lg transition flex flex-col items-center text-center"
            style={{
              backgroundImage: "url('/assets/vector-blob.svg')",
            }}
          >
            <div className="text-5xl mb-4">🧙‍♀️</div>
            <p className="text-gray-300 italic mb-4">
              "I once lost a quest log in the abyss. Thanks to D&D Connect, that’s history."
            </p>
            <div className="text-sm text-gray-400">— Lady Myra, Sorceress of Stormhold</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
