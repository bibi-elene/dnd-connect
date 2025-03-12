'use client';

import { motion, useMotionValue, animate } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import data from '@/app/data/metadata/backgrounds.json';
import { useIsMobile } from '@/hooks/use-mobile';

const IconMap = LucideIcons as unknown as Record<
  string,
  (props: { className?: string }) => JSX.Element
>;

interface BackgroundStepProps {
  nextStep: () => void;
  previousStep: () => void;
}

const BackgroundStep: React.FC<BackgroundStepProps> = ({ nextStep, previousStep }) => {
  const { setValue, watch } = useFormContext();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedBackground = watch('background');
  const backgrounds = data.backgrounds;
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (!selectedBackground && backgrounds.length > 0) {
      setValue('background', backgrounds[0].name);
    }
  }, [setValue, selectedBackground, backgrounds]);

  const handleSelect = (bgName: string, index: number) => {
    setValue('background', bgName);
    setSelectedIndex(index);
  };

  const isMobile = useIsMobile();
  // Set a fixed width for each carousel item and visible area
  const itemWidth = 80; // px width
  const visibleItems = isMobile ? 3 : 8;
  const carouselWidth = visibleItems * itemWidth;
  const maxOffset = -(backgrounds.length * itemWidth - carouselWidth);

  // Scroll 4 items left/right
  const handleArrowLeft = () => {
    const newX = Math.min(x.get() + itemWidth * 4, 0);
    animate(x, newX, { type: 'spring', stiffness: 300, damping: 30 });
  };

  const handleArrowRight = () => {
    const newX = Math.max(x.get() - itemWidth * 4, maxOffset);
    animate(x, newX, { type: 'spring', stiffness: 300, damping: 30 });
  };

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
          <div className="relative w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center shadow-lg">
            {(() => {
              const bg = backgrounds[selectedIndex];
              const IconComponent = bg?.icon && IconMap[bg.icon] ? IconMap[bg.icon] : HelpCircle;
              return <IconComponent className="w-24 h-24 text-blue-500" />;
            })()}
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold">{backgrounds[selectedIndex].name}</h3>
            <p className="text-sm text-gray-600">{backgrounds[selectedIndex].description}</p>
          </div>
        </div>

        {/* Draggable Carousel with Arrows */}
        <div className="w-full flex justify-center relative">
          <button
            onClick={handleArrowLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="overflow-hidden py-1" style={{ width: carouselWidth }}>
            <motion.div
              ref={carouselRef}
              drag="x"
              dragConstraints={{ left: maxOffset, right: 0 }}
              style={{ x, display: 'flex' }}
              className="space-x-4"
            >
              {backgrounds.map((bg, index) => {
                const IconComponent = bg?.icon && IconMap[bg.icon] ? IconMap[bg.icon] : HelpCircle;
                return (
                  <motion.div
                    key={bg.name}
                    onClick={() => handleSelect(bg.name, index)}
                    className="flex flex-col items-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ minWidth: itemWidth }}
                  >
                    <div
                      className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all bg-gray-100 ${
                        index === selectedIndex
                          ? 'border-4 border-blue-500'
                          : 'border-2 border-transparent'
                      }`}
                    >
                      <IconComponent className="w-8 h-8 text-blue-500" />
                    </div>
                    <span className="mt-1 text-xs text-gray-700">{bg.name}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          <button
            onClick={handleArrowRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
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
