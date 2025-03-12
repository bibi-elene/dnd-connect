'use client';

import { useState } from 'react';
import Image from 'next/image';
import data from '@/app/data/metadata/species.json';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import ReturnButton from '@/app/components/widgets/ReturnButton';

interface CharacterRace {
  name: string;
  img: string;
  description: string;
  traits: string[];
}

const CharacterRacesPage = () => {
  const [selectedRace, setSelectedRace] = useState<CharacterRace | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleShow = (race: CharacterRace) => {
    setSelectedRace(race);
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
          Discover Your Ancestry
        </h1>
        <p className="text-lg text-gray-300 text-center max-w-2xl mt-4">
          Choose a species and explore its unique history, abilities, and strengths. Each race holds
          a different destiny—find yours.
        </p>

        {/* Character Race Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 max-w-6xl">
          {data.species.map((race, idx) => (
            <Card
              key={idx}
              className="bg-gray-900/50 border border-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleShow(race)}
            >
              <Image
                src={race.img}
                alt={race.name}
                width={400}
                height={250}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-semibold text-white">{race.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm text-center">
                  {race.description.slice(0, 80)}...
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="secondary" className="text-white" onClick={() => handleShow(race)}>
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Sheet for Race Details */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="bg-gray-900 text-white w-[85vw] sm:w-[450px] overflow-y-auto h-[90vh] rounded-lg p-6">
          {selectedRace && (
            <>
              <SheetHeader>
                <SheetTitle className="text-2xl text-white">{selectedRace.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <Image
                  src={selectedRace.img}
                  alt={selectedRace.name}
                  width={400}
                  height={200}
                  className="w-full rounded-lg"
                />
                <p className="text-gray-300 text-sm">{selectedRace.description}</p>
                <div>
                  <h3 className="text-lg font-semibold text-white">Traits:</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedRace.traits.map((trait, index) => (
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

export default CharacterRacesPage;
