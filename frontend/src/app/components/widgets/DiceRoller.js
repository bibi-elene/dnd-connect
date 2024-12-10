import React, { useEffect, useRef } from "react";
import DiceBox from "@3d-dice/dice-box";
import './DiceRoller.css'

const DiceRoller = () => {
    const diceBoxRef = useRef(null);

  useEffect(() => {
  const setupDiceBox = async () => {
    const container = document.querySelector("#dice-box");

    
    if (container) {
      container.innerHTML = ""; 
    }

    const diceBox = new DiceBox({
      assetPath: "/assets/dice-box/",
      container: "#dice-box",
      id: "dice-canvas",
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
      theme: "default",
      themeColor: "#852e33",
      scale: 10,
      onRollComplete: (results) => {
        console.log("Roll results:", results);
      },
    });

    await diceBox.init(); 
    diceBoxRef.current = diceBox;
  };

  setupDiceBox();

  return () => {
    diceBoxRef.current?.clear(); 
    diceBoxRef.current = null;
  };
}, []);


  const rollDice = () => {
    if (diceBoxRef.current) {
      diceBoxRef.current.roll("2d20"); 
    }
  };

  return (
    <div className="dice-box-container">
      <div id="dice-box" />
      <button
        onClick={rollDice}
        className="absolute roll-dice-button text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
        style={{ fontFamily: 'Cinzel Decorative' }}

      >
        Roll
      </button>
    </div>
  );
};

export default DiceRoller;
