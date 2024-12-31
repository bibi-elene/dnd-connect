import { useEffect, useRef, useState } from 'react';
import DiceBox from '@3d-dice/dice-box';
import { Container, Button, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import './DiceRoller.styles.scss';
import data from '@/app/data/data.json';
import { FaDiceD20 } from 'react-icons/fa';

interface DiceCookieProps {
  isDiceVisible: boolean;
}
const DiceRoller: React.FC<DiceCookieProps> = ({ isDiceVisible }) => {
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
    <Container fluid className={!isDiceVisible ? `d-none` : ''}>
      <div className="dice-box-container">
        <div id="dice-box"></div>
      </div>
      <div className="d-flex mb-4 dice-buttons align-items-center">
        <div className="mb-2 flex">
          <DropdownButton
            id="dice-type-dropdown"
            title={`${selectedDiceType}`}
            variant="outline-light"
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
            variant="outline-light"
            className="dice-button mb-2"
          >
            {[...Array(10).keys()].map((count) => (
              <Dropdown.Item key={count + 1} onClick={() => setSelectedDiceCount(count + 1)}>
                {count + 1}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>

        <button onClick={rollDice} disabled={!isDiceBoxReady} className="roll-dice-button">
          <FaDiceD20 />
        </button>
      </div>
      <Modal
        show={showModal}
        onHide={() => {
          clearResults();
        }}
        centered
        backdrop="static"
        dialogClassName="dice-result-modal"
      >
        <Modal.Body>
          <p className="roll-result-text">You rolled</p>
          {rollResults.length > 0 && <p className="fw-bold display-6">{rollResults.join(', ')}</p>}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="primary"
            className="btn-re-roll"
            onClick={rollDice}
            disabled={!isDiceBoxReady}
          >
            Re-roll
          </Button>
          <Button variant="danger" className="btn-clear-results" onClick={clearResults}>
            Clear
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DiceRoller;
