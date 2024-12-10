import { useEffect, useRef, useState } from 'react';
import DiceBox from '@3d-dice/dice-box';
import './DiceRoller.styles.scss';

const DiceRoller = () => {
  const diceBoxRef = useRef<DiceBox | null>(null);
  const [isDiceBoxReady, setIsDiceBoxReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const setupDiceBox = async () => {
      try {
        const container = document.querySelector('#dice-box');
        if (!container) {
          console.error('DiceBox container not found');
          return;
        }

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
          themeColor: '#852e33',
          scale: 10,
          onRollComplete: (results) => {
            console.log('Roll results:', results);
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
    if (isDiceBoxReady && diceBoxRef.current) {
      diceBoxRef.current.roll('2d20');
    }
  };

  return (
    <div className="dice-box-container">
      <div id="dice-box" />
      <button
        onClick={rollDice}
        disabled={!isDiceBoxReady}
        className="roll-dice-button main-button px-4 py-2"
      >
        {isDiceBoxReady ? 'Roll Dice' : '...'}
      </button>
    </div>
  );
};

export default DiceRoller;
