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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedSkill = watch('skills');

  const handleSelect = (skillName: string, index: number) => {
    setValue('skills', skillName);
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (!selectedSkill) {
      setValue('skills', skillsData[0].name);
    }
  }, [setValue, selectedSkill, skillsData]);

  const currentSkill = skillsData[selectedIndex];

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto h-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="mb-4 text-center text-2xl font-bold">Step 6: Choose Your Skill</h2>
      <p className="mb-6 text-center text-gray-600">
        Select a skill that best represents your character's expertise.
      </p>

      {/* Main Preview */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center shadow-md">
          <span className="text-4xl font-bold text-gray-700">{currentSkill.name.charAt(0)}</span>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold">{currentSkill.name}</h3>
          <p className="text-sm text-gray-600">{currentSkill.description}</p>
        </div>
      </div>

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
                index === selectedIndex ? 'border-4 border-blue-500' : 'border-2 border-transparent'
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
        <Button type="button" onClick={nextStep} disabled={!selectedSkill}>
          Next
        </Button>
      </div>
    </motion.div>
  );
};

export default SkillsStep;
