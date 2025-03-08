'use client';

import { useEffect, useRef, useState } from 'react';
import DiceBox from '@3d-dice/dice-box';
import { Container, Button as RbButton, Dropdown, DropdownButton } from 'react-bootstrap';
import './DiceRoller.styles.scss';
import data from '@/app/data/data.json';
import { FaDiceD20 } from 'react-icons/fa';

// Import shadcn UI dialog components and button
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const DiceRoller = () => {
  const diceBoxRef = useRef<DiceBox | null>(null);
  const [isDiceBoxReady, setIsDiceBoxReady] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDiceType, setSelectedDiceType] = useState('d20');
  const [selectedDiceCount, setSelectedDiceCount] = useState(2);
  const [rollResults, setRollResults] = useState<number[]>([]);

  useEffect(() => {
    let isMounted = true;

    const setupDiceBox = async () => {
      try {
        const container = document.querySelector('#dice-box');
        if (!container) return;
        container.innerHTML = '';

        const diceBox = new DiceBox({
          assetPath: '/assets/dice-box/',
          container: '#dice-box',
          id: 'dice-canvas',
          gravity: 1,
          mass: 1,
          friction: 0.8,
          restitution: 0,
          angularDamping: 0.4,
          linearDamping: 0.4,
          spinForce: 4,
          throwForce: 5,
          startingHeight: 20,
          settleTimeout: 5000,
          offscreen: true,
          delay: 10,
          lightIntensity: 1,
          enableShadows: true,
          shadowTransparency: 0.8,
          theme: 'default',
          themeColor: '#3b82f6',
          scale: 6,
          onRollComplete: (results) => {
            setRollResults(results.map((result) => result.value));
            setShowModal(true);
          },
        });

        await diceBox.init();

        if (isMounted) {
          diceBoxRef.current = diceBox;
          setIsDiceBoxReady(true);
        }
      } catch (error) {
        console.error('Failed to initialize DiceBox:', error);
      }
    };

    setupDiceBox();

    return () => {
      isMounted = false;
      if (diceBoxRef.current) {
        diceBoxRef.current.clear();
        diceBoxRef.current = null;
      }
    };
  }, []);

  const rollDice = () => {
    setShowModal(false);
    if (isDiceBoxReady && diceBoxRef.current) {
      const rollString = `${selectedDiceCount}${selectedDiceType}`;
      diceBoxRef.current.roll(rollString);
    }
  };

  const clearResults = () => {
    if (isDiceBoxReady && diceBoxRef.current) {
      diceBoxRef.current.clear();
      setRollResults([]);
      setShowModal(false);
    }
  };

  return (
    <Container fluid>
      <div className="dice-box-container">
        <div id="dice-box"></div>
      </div>
      <div className="d-flex mb-4 dice-buttons align-items-center">
        <div className="mb-2 flex">
          <DropdownButton
            id="dice-type-dropdown"
            title={selectedDiceType}
            variant="dark"
            className="dice-button mb-2 me-2"
          >
            {data.dices.map((dice) => (
              <Dropdown.Item key={dice} onClick={() => setSelectedDiceType(dice)}>
                {dice}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          <DropdownButton
            id="dice-count-dropdown"
            title={`${selectedDiceCount}`}
            variant="dark"
            className="dice-button mb-2"
          >
            {[...Array(10).keys()].map((count) => (
              <Dropdown.Item key={count + 1} onClick={() => setSelectedDiceCount(count + 1)}>
                {count + 1}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>

        <RbButton onClick={rollDice} disabled={!isDiceBoxReady} className="roll-dice-button">
          <FaDiceD20 />
        </RbButton>
      </div>

      {/* Shadcn Dialog for Roll Results */}
      <Dialog
        open={showModal}
        onOpenChange={(open) => {
          if (!open) clearResults();
        }}
      >
        <DialogContent className="w-full max-w-sm p-4 rounded-md shadow-lg bg-[#1a1f29] border border-[#3b82f6] text-white">
          <DialogHeader className="pb-1">
            <DialogTitle className="text-xl font-bold text-white">🎲 Roll Results</DialogTitle>
            <DialogDescription className="text-sm text-gray-400">
              Here's what you rolled:
            </DialogDescription>
          </DialogHeader>

          {rollResults.length > 0 && (
            <p className="text-2xl font-bold text-center my-4 text-blue-400">
              {rollResults.join(', ')}
            </p>
          )}

          <DialogFooter className="flex justify-center gap-3">
            <Button
              onClick={rollDice}
              disabled={!isDiceBoxReady}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Re-roll
            </Button>
            <Button
              onClick={clearResults}
              className="bg-[#1a1f29] border border-blue-600 text-blue-400 hover:bg-[#273040] px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Clear
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default DiceRoller;
