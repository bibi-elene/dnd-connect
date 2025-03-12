'use client';

import { useState } from 'react';
import Image from 'next/image';
import data from '@/app/data/metadata/classes.json';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import ReturnButton from '@/app/components/widgets/ReturnButton';

interface CharacterClass {
  name: string;
  img: string;
  description: string;
  traits: string[];
}

const CharacterClassesPage = () => {
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleShow = (cls: CharacterClass) => {
    setSelectedClass(cls);
    setIsSheetOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-black">
      <ReturnButton />

      {/* Background with Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/adventure2.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-white px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-center">
          Discover Your Destiny
        </h1>
        <p className="text-lg text-gray-300 text-center max-w-2xl mt-4">
          Choose a class and embark on an unforgettable journey. Each class holds unique strengths
          and playstyles—find the one that calls to you.
        </p>

        {/* Character Class Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 max-w-6xl">
          {data.classes.map((cls, idx) => (
            <Card
              key={idx}
              className="bg-gray-900/50 border border-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleShow(cls)}
            >
              <Image
                src={cls.img}
                alt={cls.name}
                width={400}
                height={250}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-semibold text-white">{cls.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm text-center">
                  {cls.description.slice(0, 80)}...
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="secondary" className="text-white" onClick={() => handleShow(cls)}>
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Sheet for Class Details */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="bg-gray-900 h-full text-white w-[85vw] sm:w-[450px] overflow-scroll">
          {selectedClass && (
            <>
              <SheetHeader>
                <SheetTitle className="text-2xl text-white">{selectedClass.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <Image
                  src={selectedClass.img}
                  alt={selectedClass.name}
                  width={100}
                  height={100}
                  className="w-full rounded-lg max-h-[400px]"
                />
                <p className="text-gray-300 text-sm">{selectedClass.description}</p>
                <div>
                  <h3 className="text-lg font-semibold text-white">Traits:</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedClass.traits.map((trait, index) => (
                      <Badge key={index} variant="secondary">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CharacterClassesPage;
