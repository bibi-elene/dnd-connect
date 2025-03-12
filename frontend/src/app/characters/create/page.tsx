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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SUCCESS_CHAR_CREATE_MESSAGES } from '@/app/utils/constants';

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
          formData.append(key, JSON.stringify(value)); // Convert object to JSON string
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
      <Container fluid className="d-flex flex-column justify-content-center bg-white p-0 h-100">
        <Card className="mx-auto my-2 w-100 h-100" style={{ maxWidth: '900px', padding: '30px' }}>
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
          {errorMessage && (
            <Dialog open={true} onOpenChange={() => {}}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Error</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4">
                  <p className="text-sm text-gray-700 text-center">{errorMessage}</p>
                  <Button className="w-full" onClick={() => setErrorMessage('')}>
                    Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          {success && (
            <Dialog open={true} onOpenChange={() => {}}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    {SUCCESS_CHAR_CREATE_MESSAGES.TITLE}
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4">
                  <p className="text-sm text-gray-700 text-center">
                    {SUCCESS_CHAR_CREATE_MESSAGES.DESCRIPTION}
                  </p>
                  <Button className="w-full" onClick={() => goToDashboard()}>
                    Return to Dashboard
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </Card>
      </Container>
    </FormProvider>
  );
};

export default CreateCharacterWizard;
