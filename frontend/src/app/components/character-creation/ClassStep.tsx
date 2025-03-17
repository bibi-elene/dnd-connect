'use client';

import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ClassStepProps {
  nextStep: () => void;
  previousStep: () => void;
}

const ClassStep: React.FC<ClassStepProps> = ({ nextStep, previousStep }) => {
  const { setValue, watch } = useFormContext();
  const [classesList, setClassesList] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const selectedClass = watch('class');

  // 🚀 Fetch class data from API AFTER page transition
  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/classes');
        const data = await response.json();
        setClassesList(data.classes);
      } catch (error) {
        console.error('Error fetching class data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    if (classesList.length > 0 && !selectedClass) {
      setValue('class', classesList[0].name);
    }
  }, [setValue, selectedClass, classesList]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-xl font-semibold">Loading classes...</p>
      </div>
    );
  }

  if (classesList.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-xl font-semibold text-red-500">
          Error: No class data available.
        </p>
      </div>
    );
  }

  const currentClass = classesList[currentIndex];

  const handleSelect = (className: string) => {
    setValue('class', className);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    const newIndex =
      direction === 'left'
        ? (currentIndex + 1) % classesList.length
        : (currentIndex - 1 + classesList.length) % classesList.length;

    setCurrentIndex(newIndex);
    handleSelect(classesList[newIndex].name);
  };

  const selectByThumbnail = (index: number) => {
    setCurrentIndex(index);
    handleSelect(classesList[index].name);
  };

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="mb-4 text-center text-2xl font-bold">Step 2: Choose Your Class</h2>
      <p className="mb-6 text-center text-gray-600">
        Use the arrows or click an avatar to select a class.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Left: Main Preview with Arrows */}
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
                src={currentClass.img}
                alt={currentClass.name}
                className="w-full h-full object-cover"
                width={200}
                height={200}
                loading="lazy"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold">{currentClass.name}</h3>
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
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {classesList.map((cls, index) => (
              <div
                key={cls.name}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => selectByThumbnail(index)}
              >
                <Image
                  src={cls.img}
                  alt={cls.name}
                  className={`w-12 md:w-14 h-12 md:h-14 rounded-full object-cover transition-all ${
                    index === currentIndex
                      ? 'border-4 border-blue-500'
                      : 'border-2 border-transparent'
                  }`}
                  width={100}
                  height={100}
                  loading="lazy"
                />
                <span className="mt-1 text-xs text-gray-700">{cls.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <Button type="button" onClick={previousStep}>
          Back
        </Button>
        <Button type="button" onClick={nextStep}>
          Next
        </Button>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{currentClass.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <Image
              src={currentClass.img}
              alt={currentClass.name}
              className="w-32 h-32 object-contain rounded-md"
              width={100}
              height={100}
              loading="lazy"
            />
            <p className="text-sm text-gray-700 text-center">{currentClass.description}</p>
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

export default ClassStep;
