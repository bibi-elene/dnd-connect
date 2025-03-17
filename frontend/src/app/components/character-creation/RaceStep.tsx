'use client';

import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';

interface RaceStepProps {
  nextStep: () => void;
}

const RaceStep: React.FC<RaceStepProps> = ({ nextStep }) => {
  const { setValue, watch } = useFormContext();
  const [speciesList, setSpeciesList] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const selectedRace = watch('race');

  // Fetch species data dynamically
  useEffect(() => {
    const fetchSpecies = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/species');
        const data = await response.json();
        setSpeciesList(data.species);
      } catch (error) {
        console.error('Error fetching species data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecies();
  }, []);

  useEffect(() => {
    if (speciesList.length > 0 && !selectedRace) {
      setValue('race', speciesList[0].name);
    }
  }, [setValue, selectedRace, speciesList]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-xl font-semibold">Loading species...</p>
      </div>
    );
  }

  if (speciesList.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-xl font-semibold text-red-500">
          Error: No species data available.
        </p>
      </div>
    );
  }

  const currentRace = speciesList[currentIndex];

  const handleSelect = (raceName: string) => {
    setValue('race', raceName);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    const newIndex =
      direction === 'left'
        ? (currentIndex + 1) % speciesList.length
        : (currentIndex - 1 + speciesList.length) % speciesList.length;

    setCurrentIndex(newIndex);
    handleSelect(speciesList[newIndex].name);
  };

  const selectByThumbnail = (index: number) => {
    setCurrentIndex(index);
    handleSelect(speciesList[index].name);
  };

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="mb-4 text-center text-2xl font-bold">Step 1: Choose Your Race</h2>
      <p className="mb-6 text-center text-gray-600">
        Use the arrows or click an avatar to select a race.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center justify-center w-full md:w-2/3 mb-6 md:mb-0">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleSwipe('right')}
            className="mr-2 p-2"
          >
            <ChevronLeft size={24} />
          </Button>

          <div
            className="w-[200px] md:w-[340px] h-[320px] md:h-[380px] bg-white shadow-md border border-gray-200 flex flex-col overflow-hidden cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="w-full h-3/4 flex items-center justify-center">
              <Image
                src={currentRace.img}
                alt={currentRace.name}
                className="w-full h-full object-cover"
                width={200}
                height={200}
                loading="lazy"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold">{currentRace.name}</h3>
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handleSwipe('left')}
            className="ml-2 p-2"
          >
            <ChevronRight size={24} />
          </Button>
        </div>

        <div className="w-full md:w-1/3">
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {speciesList.map((race, index) => (
              <div
                key={race.name}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => selectByThumbnail(index)}
              >
                <Image
                  src={race.img}
                  alt={race.name}
                  className={`w-12 md:w-14 h-12 md:h-14 bg-black rounded-full object-cover transition-all ${index === currentIndex ? 'border-4 border-blue-500' : 'border-2 border-transparent'}`}
                  width={100}
                  height={100}
                  loading="lazy"
                />
                <span className="mt-1 text-xs text-gray-700">{race.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button type="button" onClick={nextStep}>
          Next
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{currentRace.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <Image
              src={currentRace.img}
              alt={currentRace.name}
              className="w-32 h-32 object-contain rounded-md"
              width={100}
              height={100}
              loading="lazy"
            />
            <p className="text-sm text-gray-700 text-center">{currentRace.description}</p>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default RaceStep;
