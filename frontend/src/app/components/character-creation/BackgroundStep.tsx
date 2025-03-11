'use client';

import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import data from '@/app/data/data.json';

interface BackgroundStepProps {
  nextStep: () => void;
  previousStep: () => void;
}

const backgrounds: Array<{ name: string; description: string; img: string }> = [
  {
    name: 'Noble',
    description: 'You come from a wealthy and influential family with a storied past.',
    img: '/assets/adventure.jpg',
  },
  {
    name: 'Acolyte',
    description:
      'You spent your childhood in service of a temple, learning the ways of the divine.',
    img: '/assets/adventure.jpg',
  },
  {
    name: 'Folk-Hero',
    description: 'A commoner who rose to local fame by standing up against injustice.',
    img: '/assets/adventure.jpg',
  },
  {
    name: 'Thief',
    description:
      'Skilled in stealth and subterfuge, you learned the art of the heist at an early age.',
    img: '/assets/adventure.jpg',
  },
];

const BackgroundStep: React.FC<BackgroundStepProps> = ({ nextStep, previousStep }) => {
  const { setValue, watch } = useFormContext();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedBackground = watch('background');

  // Detailed backgrounds data

  const handleSelect = (bgName: string, index: number) => {
    setValue('background', bgName);
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (!selectedBackground) {
      setValue('background', backgrounds[0].name);
    }
  }, [setValue, selectedBackground, backgrounds]);

  const currentBackground = backgrounds[selectedIndex];

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="mb-4 text-center text-2xl font-bold">Step 4: Choose Your Background</h2>
      <p className="mb-6 text-center text-gray-600">
        Select a background that best fits your character’s story.
      </p>

      <div className="flex flex-col items-center space-y-6">
        {/* Main Preview */}
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg">
            <Image
              src={currentBackground.img}
              alt={currentBackground.name}
              layout="fill"
              className="object-cover"
            />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold">{currentBackground.name}</h3>
            <p className="text-sm text-gray-600">{currentBackground.description}</p>
          </div>
        </div>

        {/* Icons Grid */}
        <div className="grid grid-cols-4 gap-4">
          {backgrounds.map((bg, index) => (
            <div
              key={bg.name}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleSelect(bg.name, index)}
            >
              <div
                className={`relative w-16 h-16 rounded-full overflow-hidden transition-all ${
                  index === selectedIndex
                    ? 'border-4 border-blue-500'
                    : 'border-2 border-transparent'
                }`}
              >
                <Image src={bg.img} alt={bg.name} layout="fill" className="object-cover" />
              </div>
              <span className="mt-1 text-xs text-gray-700">{bg.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <Button type="button" onClick={previousStep}>
          Back
        </Button>
        <Button type="button" onClick={nextStep} disabled={!selectedBackground}>
          Next
        </Button>
      </div>
    </motion.div>
  );
};

export default BackgroundStep;
