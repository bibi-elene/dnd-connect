'use client';

import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface SkillsStepProps {
  nextStep: () => void;
  previousStep: () => void;
}

const skillsData = [
  {
    name: 'History',
    description: 'Your knowledge of historical events is vast.',
  },
  {
    name: 'Athletics',
    description: 'You excel in physical endeavors.',
  },
  {
    name: 'Survival',
    description: 'You are adept at enduring harsh environments.',
  },
  {
    name: 'Performance',
    description: 'You have a talent for captivating an audience.',
  },
];

const SkillsStep: React.FC<SkillsStepProps> = ({ nextStep, previousStep }) => {
  const { setValue, watch } = useFormContext();
  const selectedSkills: string[] = watch('skills') || [];
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const handleSelect = (skillName: string, index: number) => {
    let updatedSkills = [...selectedSkills];
    let updatedIndexes = [...selectedIndexes];

    if (updatedSkills.includes(skillName)) {
      // If already selected, remove it
      updatedSkills = updatedSkills.filter((s) => s !== skillName);
      updatedIndexes = updatedIndexes.filter((i) => i !== index);
    } else {
      if (updatedSkills.length < 2) {
        // Only allow adding if less than 2 skills are selected
        updatedSkills.push(skillName);
        updatedIndexes.push(index);
      }
    }
    console.log(selectedSkills, 'skilllls');
    setValue('skills', updatedSkills);
    setSelectedIndexes(updatedIndexes);
  };

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto h-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="mb-4 text-center text-2xl font-bold">Step 6: Choose Your Skills</h2>
      <p className="mb-6 text-center text-gray-600">
        Select <span className="font-bold">two</span> skills that best represent your character's
        expertise.
      </p>

      {/* Skills Grid */}
      <div className="grid grid-cols-4 gap-4">
        {skillsData.map((skill, index) => (
          <div
            key={skill.name}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleSelect(skill.name, index)}
          >
            <div
              className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all bg-gray-100 ${
                selectedIndexes.includes(index)
                  ? 'border-4 border-blue-500'
                  : 'border-2 border-transparent'
              } ${
                selectedSkills.length >= 2 && !selectedIndexes.includes(index)
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              <span className="text-xl font-bold text-gray-700">{skill.name.charAt(0)}</span>
            </div>
            <span className="mt-1 text-xs text-gray-700">{skill.name}</span>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <Button type="button" onClick={previousStep}>
          Back
        </Button>
        <Button type="button" onClick={nextStep} disabled={selectedSkills.length !== 2}>
          Next
        </Button>
      </div>
    </motion.div>
  );
};

export default SkillsStep;
