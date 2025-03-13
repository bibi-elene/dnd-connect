import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface AbilityScoresStepProps {
  nextStep: () => void;
  previousStep: () => void;
}

const abilities = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];

const AbilityScoresStep: React.FC<AbilityScoresStepProps> = ({ nextStep, previousStep }) => {
  const { register, setValue, getValues, watch } = useFormContext();

  // Set default scores of 10 if not already set.
  useEffect(() => {
    abilities.forEach((ability) => {
      const key = ability.toLowerCase();
      if (getValues(key) === undefined) {
        setValue(key, 10);
      }
    });
  }, [setValue, getValues]);

  // Roll a random ability score between 8 and 18.
  const rollAbilityScore = () => Math.floor(Math.random() * 11) + 8;

  const rollAll = () => {
    abilities.forEach((ability) => {
      const key = `abilityScores.${ability.toLowerCase()}`;
      setValue(key, rollAbilityScore());
    });
  };

  // Watch current ability values.
  const abilityScores = abilities.map((ability) => ({
    name: ability,
    score: watch(ability.toLowerCase()) ?? 10,
  }));

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="mb-4 text-center text-2xl font-bold">Step 5: Set Your Ability Scores</h2>
      <p className="mb-6 text-center text-gray-600">
        Adjust your ability scores manually or roll for random values.
      </p>

      {/* Grid layout: 3 columns on md screens, stacking on smaller */}
      <div className="grid grid-cols-3 gap-4">
        {abilityScores.map(({ name }) => (
          <div key={name} className="flex flex-col items-center border rounded-md p-4">
            <span className="font-semibold mb-2">{name}</span>
            <input
              type="number"
              min="1"
              max="30"
              {...register(`abilityScores.${name.toLowerCase()}`, { valueAsNumber: true })}
              className="w-16 border rounded px-2 py-1 text-center"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Button variant="outline" onClick={rollAll}>
          Roll All
        </Button>
      </div>

      <div className="mt-6 flex justify-between">
        <Button type="button" onClick={previousStep}>
          Back
        </Button>
        <Button type="button" onClick={nextStep}>
          Next
        </Button>
      </div>
    </motion.div>
  );
};

export default AbilityScoresStep;
