import { useEffect, useRef, useState } from 'react';
import DiceBox from '@3d-dice/dice-box';
import { Container, Button, Spinner, Dropdown, DropdownButton, Row, Col } from 'react-bootstrap';
import './DiceRoller.styles.scss';
import { diceTypes } from '@/app/utils/constants';

interface DiceCookieProps {
  isDiceVisible: boolean;
}
const DiceRoller: React.FC<DiceCookieProps> = ({ isDiceVisible }) => {
  const diceBoxRef = useRef<DiceBox | null>(null);
  const [isDiceBoxReady, setIsDiceBoxReady] = useState(false);
  const [selectedDiceType, setSelectedDiceType] = useState('d20');
  const [selectedDiceCount, setSelectedDiceCount] = useState(2);
  const [rollResults, setRollResults] = useState<number[]>([]);

  useEffect(() => {
    let isMounted = true;

    const setupDiceBox = async () => {
      try {
        const container = document.querySelector('#dice-box');
        if (!container) {
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
            if (isMounted) {
              setRollResults(results.map((result) => result.value));
            }
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
      const rollString = `${selectedDiceCount}${selectedDiceType}`;
      diceBoxRef.current.roll(rollString);
    }
  };

  const clearResults = () => {
    if (isDiceBoxReady && diceBoxRef.current) {
      diceBoxRef.current.clear();
      setRollResults([]);
    }
  };

  return (
    <>
      <Container fluid className={!isDiceVisible ? `d-none` : ''}>
        <div className="dice-box-container">
          <div id="dice-box" className="w-100 h-100"></div>
        </div>
        <div className="d-flex mb-4 dice-buttons align-items-center">
          <Row className="align-items-center mb-2">
            <Col xs="auto">
              <DropdownButton
                id="dice-type-dropdown"
                title={`${selectedDiceType}`}
                variant="outline-light"
                className="dice-button mb-2"
              >
                {diceTypes.map((dice) => (
                  <Dropdown.Item key={dice} onClick={() => setSelectedDiceType(dice)}>
                    {dice}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>

            <Col xs="auto">
              <DropdownButton
                id="dice-count-dropdown"
                title={`${selectedDiceCount}`}
                variant="outline-light"
                className="dice-button mb-2"
              >
                {[...Array(10).keys()].map((count) => (
                  <Dropdown.Item key={count + 1} onClick={() => setSelectedDiceCount(count + 1)}>
                    {count + 1}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Row>

          <Button
            onClick={rollDice}
            disabled={!isDiceBoxReady}
            className="roll-dice-button"
            variant="dark"
          >
            Roll Dice
          </Button>
        </div>
        <Row className="roll-results mt-3">
          <Col xs={4} md={4} lg={4} className="text-center text-white rounded shadow">
            <h5 className="fw-bold">Result: {rollResults.join(', ') || ''}</h5>
            <Button variant="danger" onClick={clearResults}>
              Clear
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DiceRoller;
