const Testimonials = () => {
  return (
    <section className="py-20 bg-[#10151e] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-4xl font-bold text-center mb-12"
          style={{ fontFamily: 'Cinzel Decorative' }}
        >
          Tales from the Tavern
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-[#1a1f29] rounded-lg shadow-md hover:shadow-lg transition flex flex-col items-center text-center">
            <div className="text-5xl mb-4">🧝‍♀️</div>
            <p className="text-gray-300 italic mb-4">
              "Never again did we lose track of a side quest! D&D Connect is as essential as my
              longsword."
            </p>
            <div className="text-sm text-gray-400">— Elara, Elf Ranger</div>
          </div>

          <div className="p-6 bg-[#1a1f29] rounded-lg shadow-md hover:shadow-lg transition flex flex-col items-center text-center">
            <div className="text-5xl mb-4">🧔‍♂️</div>
            <p className="text-gray-300 italic mb-4">
              "This kept our group together across time zones. No session left behind!"
            </p>
            <div className="text-sm text-gray-400">— Durgan, Dwarf Fighter</div>
          </div>

          <div className="p-6 bg-[#1a1f29] rounded-lg shadow-md hover:shadow-lg transition flex flex-col items-center text-center">
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
