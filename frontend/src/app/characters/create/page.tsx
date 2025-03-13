'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import StepWizard from 'react-step-wizard';
import { Container, Card } from 'react-bootstrap';
import RaceStep from '@/app/components/character-creation/RaceStep';
import ClassStep from '@/app/components/character-creation/ClassStep';
import BackgroundStep from '@/app/components/character-creation/BackgroundStep';
import AbilityScoresStep from '@/app/components/character-creation/AbilityScoresStep';
import SkillsStep from '@/app/components/character-creation/SkillsStep';
import NameAndAvatarStep from '@/app/components/character-creation/NameAndAvatarStep';
import { apiRoutes } from '@/app/api/apiRoutes';
import { useNavigate } from '@/app/utils/navigation';
import { CharacterFormInputs } from '@/app/utils/types';
import { SUCCESS_CHAR_CREATE_MESSAGES } from '@/app/utils/constants';
import MessageDialog from '@/app/components/widgets/MessageDialog';
import ReturnButton from '@/app/components/widgets/ReturnButton';

const CreateCharacterWizard = () => {
  const methods = useForm({
    defaultValues: {
      race: '',
      class: '',
      background: '',
      skills: [] as string[],
      abilityScores: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      },
      level: 1,
      name: '',
      image: null,
    },
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { goToDashboard } = useNavigate();

  const onSubmit = async (data: CharacterFormInputs) => {
    setLoading(true);
    try {
      const formData = new FormData();

      if (typeof data.skills === 'string') {
        data.skills = (data.skills as string).split(',').map((s) => s.trim());
      }

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'abilityScores' && typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      const apiResponse = await fetch(apiRoutes.characters.all, {
        method: 'POST',
        body: formData,
      });

      if (!apiResponse.ok) {
        throw new Error('Failed to create character');
      }

      setSuccess(true);
    } catch (error) {
      setErrorMessage('Failed to create character.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <Container
        fluid
        className="d-flex flex-column justify-content-center bg-gradient-to-br from-blue-100 to-blue-200 p-0 h-100"
      >
        <ReturnButton />
        <Card
          className="mx-auto my-2 w-100 h-100 bg-white shadow-lg"
          style={{ maxWidth: '900px', padding: '30px', borderRadius: '12px' }}
        >
          <h1 className="text-center">D&amp;D Character Creation</h1>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <StepWizard className="overflow-hidden">
              <RaceStep nextStep={() => {}} />
              <ClassStep nextStep={() => {}} previousStep={() => {}} />
              <BackgroundStep nextStep={() => {}} previousStep={() => {}} />
              <AbilityScoresStep nextStep={() => {}} previousStep={() => {}} />
              <SkillsStep nextStep={() => {}} previousStep={() => {}} />
              <NameAndAvatarStep previousStep={() => {}} />
            </StepWizard>
          </form>
          {loading && <div className="mt-3 text-center">Loading...</div>}

          <MessageDialog
            open={success}
            onClose={() => setSuccess(false)}
            title={SUCCESS_CHAR_CREATE_MESSAGES.TITLE}
            message={SUCCESS_CHAR_CREATE_MESSAGES.DESCRIPTION}
            buttonText="Return to Dashboard"
            navigateTo={goToDashboard}
            type="success"
          />

          <MessageDialog
            open={!!errorMessage}
            onClose={() => setErrorMessage('')}
            title="Error"
            message="Failed to create character. Please try again."
            buttonText="Close"
            type="error"
          />
        </Card>
      </Container>
    </FormProvider>
  );
};

export default CreateCharacterWizard;
