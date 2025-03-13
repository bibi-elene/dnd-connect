'use client';

import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import Loading from '@/app/components/widgets/Loading';
import { CharacterFormInputs } from '@/app/utils/types';
import Image from 'next/image';
import { useNavigate } from '@/app/utils/navigation';
import { apiRoutes } from '@/app/api/apiRoutes';
import data from '@/app/data/data.json';
import './EditCharacter.styles.scss';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { MAX_SKILLS_ALLOWED } from '@/app/utils/constants';
import MessageDialog from '@/app/components/widgets/MessageDialog';
import ReturnButton from '@/app/components/widgets/ReturnButton';

const EditCharacter = () => {
  const { id } = useParams();
  const { goToCharacters } = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isDirty },
  } = useForm<CharacterFormInputs>();

  const [loading, setLoading] = useState(true);
  const [loadingEditSave, setLoadingEditSave] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [originalUploadedImage, setOriginalUploadedImage] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiRoutes.characters.character(Number(id)), {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Failed to fetch character details');

        const characterData = await response.json();

        Object.entries(characterData).forEach(([key, value]) => {
          if (key === 'image' && value) {
            const base64String = (value as string).split(',')[1];
            const byteCharacters = atob(base64String);
            const byteNumbers = Array.from(byteCharacters).map((char) => char.charCodeAt(0));
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });

            const file = new File([blob], 'character-image.jpg', { type: 'image/jpeg' });
            setUploadedImage(file);
            setOriginalUploadedImage(file);
            const imageUrl = URL.createObjectURL(blob);
            setPreviewImage(imageUrl);
          } else if (key === 'skills' && Array.isArray(value)) {
            setValue('skills', value);
          } else if (key === 'abilityScores') {
            setValue('abilityScores', value as Record<string, number>);
          } else {
            setValue(key as keyof CharacterFormInputs, value as string);
          }
        });
      } catch (error) {
        setShowErrorDialog(true);
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id, setValue]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFileError(null);
    const maxFileSize = 2 * 1024 * 1024; // 2MB
    setUploadedImage(file);
    if (file && file.size > maxFileSize) {
      setFileError('File size should not exceed 2MB.');
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      if (originalUploadedImage) {
        const imageUrl = URL.createObjectURL(originalUploadedImage);
        setPreviewImage(imageUrl);
        setUploadedImage(originalUploadedImage);
      } else {
        setPreviewImage(null);
      }
    }
  };

  const onSubmit = async (data: CharacterFormInputs) => {
    setLoadingEditSave(true);
    const formData = new FormData();

    if (typeof data.skills === 'string') {
      data.skills = (data.skills as string).split(',').map((s: any) => s.trim());
    }

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'id') {
        if (key === 'abilityScores' && typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else if (Array.isArray(value)) {
          formData.append(key, `{${value.join(',')}}`);
        } else {
          formData.append(key, value as string);
        }
      }
    });

    if (uploadedImage) {
      formData.append('image', uploadedImage);
    }

    try {
      const response = await fetch(apiRoutes.characters.character(Number(id)), {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to update character');

      setShowSuccessDialog(true);
    } catch (error) {
      setShowErrorDialog(true);
    } finally {
      setLoadingEditSave(false);
    }
  };

  if (loading) {
    return (
      <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
        <Loading message="Loading character details..." size="lg" />
      </Container>
    );
  }

  // Disable save if no changes or file error
  const isButtonDisabled = !!fileError || (!isDirty && uploadedImage === originalUploadedImage);

  return (
    <Container fluid className="min-vh-100 p-2 d-flex align-items-center">
      <ReturnButton />
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={5}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4">Edit Character</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <Row>
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="text-xl font-semibold">Name</Form.Label>
                      <Form.Control
                        type="text"
                        isInvalid={!!errors.name}
                        {...register('name', { required: true })}
                      />
                      <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="text-xl font-semibold">Class</Form.Label>
                      <Form.Select
                        isInvalid={!!errors.class}
                        {...register('class', { required: true })}
                      >
                        <option value="">Select Class</option>
                        {data.classes.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Class is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="text-xl font-semibold">Race</Form.Label>
                      <Form.Select
                        isInvalid={!!errors.race}
                        {...register('race', { required: true })}
                      >
                        <option value="">Select Race</option>
                        {data.species.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">Race is required</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="text-xl font-semibold">Background</Form.Label>
                      <Form.Select
                        isInvalid={!!errors.background}
                        {...register('background', { required: true })}
                      >
                        <option value="">Select Background</option>
                        {data.characterBackgrounds.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Background is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Form.Group className="mb-4">
                      <Form.Label className="text-xl font-semibold">
                        Skills (Select up to 2)
                      </Form.Label>
                      <div className="d-flex flex-wrap gap-2">
                        {data.characterSkills.map((skill) => (
                          <Form.Check
                            key={skill}
                            type="checkbox"
                            label={skill}
                            value={skill}
                            checked={watch('skills')?.includes(skill)}
                            className="text-xs"
                            onChange={(e) => {
                              let selectedSkills = watch('skills') || [];

                              if (e.target.checked) {
                                if (selectedSkills.length < MAX_SKILLS_ALLOWED) {
                                  selectedSkills = [...selectedSkills, skill];
                                }
                              } else {
                                selectedSkills = selectedSkills.filter((s) => s !== skill);
                              }

                              setValue('skills', selectedSkills, { shouldDirty: true });
                              trigger('skills');
                            }}
                          />
                        ))}
                      </div>
                      {errors.skills && <div className="text-danger">Select exactly 2 skills.</div>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Form.Group className="mb-4">
                      <Form.Label className="text-xl font-semibold">Ability Scores</Form.Label>
                      <Row>
                        {Object.keys(data.defaultAbilityScores).map((ability) => (
                          <Col key={ability} xs={6}>
                            <Form.Label className="mb-0 text-xs">
                              {ability.toUpperCase()}
                            </Form.Label>
                            <Form.Control
                              type="number"
                              min="1"
                              max="30"
                              defaultValue={
                                watch(`abilityScores.${ability}`) ||
                                data.defaultAbilityScores[
                                  ability as keyof typeof data.defaultAbilityScores
                                ]
                              }
                              isInvalid={
                                !!errors.abilityScores?.[
                                  ability as keyof typeof errors.abilityScores
                                ]
                              }
                              {...register(`abilityScores.${ability}`, {
                                required: false,
                                min: 1,
                                max: 30,
                              })}
                            />
                          </Col>
                        ))}
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Form.Group className="mb-4">
                      <Form.Label className="text-xl font-semibold">Level</Form.Label>
                      <Form.Control
                        type="number"
                        isInvalid={!!errors.level}
                        {...register('level', { required: true, min: 1 })}
                      />
                      <Form.Control.Feedback type="invalid">
                        Level is required and must be at least 1
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Form.Group className="mb-4">
                      <Form.Label>Upload Avatar</Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        isInvalid={!!fileError}
                      />
                      {fileError && <div className="text-danger">{fileError}</div>}
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  type="submit"
                  disabled={isButtonDisabled}
                  className="w-100 save-edit mt-2"
                  variant={isButtonDisabled ? 'secondary' : 'primary'}
                >
                  {loadingEditSave ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        {previewImage && (
          <Col xs={12} md={6} lg={4} className="mt-2">
            <Card className="shadow-lg">
              <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title>Character Preview</Card.Title>
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={300}
                  height={400}
                  className="align-self-center"
                  loading="lazy"
                />
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      <MessageDialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        title="Character Updated!"
        message="Your character has been successfully updated."
        buttonText="Return to Characters"
        navigateTo={goToCharacters}
        type="success"
      />

      <MessageDialog
        open={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        title="Error"
        message="Failed to update character. Please try again."
        buttonText="Close"
        type="error"
      />
    </Container>
  );
};

export default function EditCharacterPage() {
  return (
    <ProtectedRoute>
      <EditCharacter />
    </ProtectedRoute>
  );
}
