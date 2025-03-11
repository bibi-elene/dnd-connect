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

const CreateCharacterWizard = () => {
  const methods = useForm({
    defaultValues: {
      race: '',
      class: '',
      background: '',
      skills: '',
      level: 1,
      name: '',
      image: null,
    },
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: CharacterFormInputs) => {
    setLoading(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const apiResponse = await fetch(apiRoutes.characters.all, {
        method: 'POST',
        body: formData,
      });

      if (!apiResponse.ok) {
        throw new Error('Failed to create character');
      }
      console.log(apiResponse, 'api response');
      setSuccessMessage('Character created successfully!');
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
        <Card className="mx-auto my-10 w-100 h-100" style={{ maxWidth: '900px', padding: '30px' }}>
          <h1 className="text-center">D&amp;D Character Creation</h1>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <StepWizard initialStep={1} className="overflow-hidden">
              <RaceStep nextStep={() => {}} />
              <ClassStep nextStep={() => {}} previousStep={() => {}} />
              <BackgroundStep nextStep={() => {}} previousStep={() => {}} />
              <AbilityScoresStep nextStep={() => {}} previousStep={() => {}} />
              <SkillsStep nextStep={() => {}} previousStep={() => {}} />
              <NameAndAvatarStep previousStep={() => {}} />
            </StepWizard>
          </form>
          {loading && <div className="mt-3 text-center">Loading...</div>}
          {errorMessage && <div className="mt-3 text-center text-red-500">{errorMessage}</div>}
          {successMessage && (
            <div className="mt-3 text-center text-green-500">{successMessage}</div>
          )}
        </Card>
      </Container>
    </FormProvider>
  );
};

export default CreateCharacterWizard;
