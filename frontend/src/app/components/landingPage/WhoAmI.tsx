// components/landingPage/WhoAmI.jsx
import React from 'react';
import { motion } from 'framer-motion'; // For animations

const WhoAmI = () => {
  const headerVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    hover: { scale: 1.05, color: '#f472b6' },
  };

  const itemVariants = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    hover: { x: 10, transition: { duration: 0.3 } },
  };

  return (
    <section className="relative bg-#0c1015 py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Left Banner */}
          <div className="md:w-1/3 hidden md:block relative">
            <div className="h-full bg-gradient-to-b from-pink-500 to-cyan-500 p-6 flex items-center justify-center transform -skew-y-6 shadow-lg">
              <div className="text-white text-4xl font-bold tracking-wider uppercase transform skew-y-6">
                <span className="block hover:translate-y-[-10px] transition-transform duration-300 cursor-pointer">
                  Who
                </span>
                <span className="block hover:translate-y-[-10px] transition-transform duration-300 cursor-pointer">
                  I
                </span>
                <span className="block hover:translate-y-[-10px] transition-transform duration-300 cursor-pointer">
                  Am
                </span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="md:w-2/3 p-8 md:p-12 bg-black/20 backdrop-blur-lg rounded-r-2xl shadow-xl border border-white/10">
            {/* Section Header */}
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold text-white mb-8 relative inline-block cursor-pointer"
              variants={headerVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              Who Am I?
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-cyan-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </motion.h2>

            {/* Content Blocks */}
            <div className="space-y-8">
              <motion.div
                className="group relative"
                variants={itemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                <h3 className="text-2xl font-semibold text-white group-hover:text-pink-400 transition-colors duration-300 cursor-pointer">
                  The Story Architect
                </h3>
                <p className="text-gray-300 mt-2 text-lg cursor-pointer">
                  I build worlds where heroes rise and legends are born. Every campaign I craft is a
                  doorway to epic adventures waiting to unfold.
                </p>
                <div className="absolute -left-4 top-0 h-full w-1 bg-cyan-500 transform scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100 cursor-pointer" />
              </motion.div>

              <motion.div
                className="group relative"
                variants={itemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                <h3 className="text-2xl font-semibold text-white group-hover:text-pink-400 transition-colors duration-300 cursor-pointer">
                  The Code Sorcerer
                </h3>
                <p className="text-gray-300 mt-2 text-lg cursor-pointer">
                  With a flick of my digital wand, I conjure tools that make your quests seamless
                  and unforgettable. Magic meets tech in my realm.
                </p>
                <div className="absolute -left-4 top-0 h-full w-1 bg-cyan-500 transform scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100" />
              </motion.div>

              <motion.div
                className="group relative"
                variants={itemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                <h3 className="text-2xl font-semibold text-white group-hover:text-pink-400 transition-colors duration-300 cursor-pointer">
                  The Party Catalyst
                </h3>
                <p className="text-gray-300 mt-2 text-lg cursor-pointer">
                  I’m the spark that brings your crew together—organizing chaos, amplifying fun, and
                  ensuring every roll counts.
                </p>
                <div className="absolute -left-4 top-0 h-full w-1 bg-cyan-500 transform scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100 cursor-pointer" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoAmI;
