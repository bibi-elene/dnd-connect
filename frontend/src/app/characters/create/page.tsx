'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { CharacterFormInputs } from '@/app/utils/types';
import Image from 'next/image';
import ReturnButtons from '@/app/components/widgets/ReturnButtons';
import { useNavigate } from '@/app/utils/navigation';
import { apiRoutes } from '@/app/api/apiRoutes';
import data from '@/app/data/data.json';

const CreateCharacter = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CharacterFormInputs>();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { goToDashboard } = useNavigate();

  const selectedClass = watch('class');
  const selectedRace = watch('race');
  const name = watch('name');
  const background = watch('background');
  const skills = watch('skills');
  const level = watch('level');

  const allFieldsValid =
    name && selectedClass && selectedRace && background && skills && level && !fileError;

  const defaultImagePath =
    (data.metadata.avatars as Record<string, Record<string, string>>)[selectedClass]?.[
      selectedRace
    ] || '/assets/default_character.jpeg';

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
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const onSubmit = async (data: CharacterFormInputs) => {
    setLoading(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (uploadedImage) {
        formData.append('image', uploadedImage);
      } else {
        const response = await fetch(defaultImagePath);
        const blob = await response.blob();
        formData.append('image', blob, 'default_character_image.jpeg');
      }

      const apiResponse = await fetch(apiRoutes.characters.all, {
        method: 'POST',
        body: formData,
      });

      if (!apiResponse.ok) {
        throw new Error('Failed to create character');
      }

      setSuccessMessage('Character created successfully!');
      goToDashboard();
    } catch (error) {
      setErrorMessage('Failed to create character.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="min-vh-100 p-4 d-flex align-items-center">
      <Col xs="auto" className="z-index-3">
        <ReturnButtons fallbackUrl="/dashboard" />
      </Col>
      <Row className="w-100 mt-5 pt-5 justify-content-center">
        <Col md={6} lg={4} sm={8} className="mt-2">
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-2">Create Character</Card.Title>
              {errorMessage && (
                <Alert variant="danger" className="text-center">
                  {errorMessage}
                </Alert>
              )}
              {successMessage && (
                <Alert variant="success" className="text-center">
                  {successMessage}
                </Alert>
              )}
              <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <Form.Group className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    isInvalid={!!errors.name}
                    {...register('name', { required: true })}
                  />
                  <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Class</Form.Label> <a href="/">Not sure? Check here </a>
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
                  <Form.Control.Feedback type="invalid">Class is required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Race</Form.Label>
                  <Form.Select isInvalid={!!errors.race} {...register('race', { required: true })}>
                    <option value="">Select Race</option>
                    {data.species.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">Race is required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Background</Form.Label>
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
                <Form.Group className="mb-2">
                  <Form.Label>Skills</Form.Label>
                  <Form.Select
                    isInvalid={!!errors.skills}
                    {...register('skills', { required: true })}
                  >
                    <option value="">Select Skills</option>
                    {data.characterSkills.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">Skills are required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Level</Form.Label>
                  <Form.Control
                    type="number"
                    isInvalid={!!errors.level}
                    {...register('level', { required: true, min: 1 })}
                  />
                  <Form.Control.Feedback type="invalid">
                    Level is required and must be at least 1
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2">
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
                <Button
                  type="submit"
                  disabled={!allFieldsValid || loading}
                  className="w-100"
                  variant={!allFieldsValid || loading ? 'secondary' : 'primary'}
                >
                  {loading ? <Spinner animation="border" size="sm" /> : 'Create Character'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        {previewImage || defaultImagePath ? (
          <Col md={6} lg={4} sm={8} className="text-center mt-2">
            <Card>
              <Card.Body className="d-flex flex-column">
                <Card.Title>Character Preview</Card.Title>
                <Image
                  src={previewImage || defaultImagePath}
                  alt="Preview"
                  width={300}
                  height={400}
                  className="align-self-center"
                  loading="lazy"
                />
              </Card.Body>
            </Card>
          </Col>
        ) : null}
      </Row>
    </Container>
  );
};

export default CreateCharacter;
