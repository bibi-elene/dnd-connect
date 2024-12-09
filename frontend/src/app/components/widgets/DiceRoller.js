import React, { useEffect, useRef } from "react";
import DiceBox from "@3d-dice/dice-box";
import './DiceRoller.css'

const DiceRoller = () => {
    const diceBoxRef = useRef(null);

  useEffect(() => {
    const setupDiceBox = async () => {
      const diceBox = new DiceBox({
        assetPath: "/assets/dice-box/", // Required path to static assets
        container: "#dice-box", // The container for the dice box
        id: "dice-canvas", // ID of the canvas element
        gravity: 1,
        mass: 1,
        friction: 0.8,
        restitution: 0,
        angularDamping: 0.4,
        linearDamping: 0.4,
        spinForce: 4,
        throwForce: 5,
        startingHeight: 8,
        settleTimeout: 5000,
        offscreen: true,
        delay: 10,
        lightIntensity: 1,
        enableShadows: true,
        shadowTransparency: 0.8,
        theme: "default",
        themeColor: "#2e8555",
        scale: 6,
        onRollComplete: (results) => {
          console.log("Roll results:", results);
        },
      });

      await diceBox.init(); // Initialize the DiceBox
      diceBoxRef.current = diceBox;
    };

    setupDiceBox();

    // return () => {
    //   // Cleanup on component unmount
    //   diceBoxRef.current?.clear();
    //   diceBoxRef.current = null;
    // };
  }, []);

  const rollDice = () => {
    if (diceBoxRef.current) {
      diceBoxRef.current.roll("2d6"); // Roll two 6-sided dice
    }
  };

  return (
    <div>
      <div id="dice-box" style={{ width: "100%", height: "300px" }} />
      <button
        onClick={rollDice}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
      >
        Roll Dice
      </button>
    </div>
  );
};

export default DiceRoller;
