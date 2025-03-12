'use client';

import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import data from '@/app/data/metadata/skills.json';

interface SkillsStepProps {
  nextStep: () => void;
  previousStep: () => void;
}

const SkillsStep: React.FC<SkillsStepProps> = ({ nextStep, previousStep }) => {
  const { setValue, watch } = useFormContext();
  const selectedSkills: string[] = watch('skills') || [];
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const handleSelect = (skillName: string, index: number) => {
    let updatedSkills = [...selectedSkills];
    let updatedIndexes = [...selectedIndexes];

    if (updatedSkills.includes(skillName)) {
      updatedSkills = updatedSkills.filter((s) => s !== skillName);
      updatedIndexes = updatedIndexes.filter((i) => i !== index);
    } else {
      if (updatedSkills.length < 2) {
        updatedSkills.push(skillName);
        updatedIndexes.push(index);
      }
    }

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
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {data.skills.map((skill, index) => (
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
