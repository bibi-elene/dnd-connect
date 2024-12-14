'use client';

import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import Loading from '@/app/components/widgets/Loading';
import { CharacterFormInputs } from '@/app/utils/types';
import Image from 'next/image';
import { backgroundOptions, classOptions, raceOptions, skillsOptions } from '@/app/utils/constants';
import ReturnButtons from '@/app/components/widgets/ReturnButtons';
import { useNavigate } from '@/app/utils/navigation';
import { apiRoutes } from '@/app/api/apiRoutes';

const EditCharacter = () => {
  const { id } = useParams();
  const { goToCharacters } = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<CharacterFormInputs>();

  const [loading, setLoading] = useState(true);
  const [loadingEditSave, setLoadingEditSave] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [originalUploadedImage, setOriginalUploadedImage] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiRoutes.characters.character(Number(id)), {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch character details');
        }

        const data = await response.json();
        Object.entries(data).forEach(([key, value]) => {
          if (key === 'image' && value) {
            const base64String = (value as string).split(',')[1];
            const byteCharacters = atob(base64String);
            const byteNumbers = Array.from(byteCharacters).map((char) => char.charCodeAt(0));
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });

            const file = new File([blob], 'character-image.jpg', {
              type: 'image/jpeg',
            });
            setUploadedImage(file);
            setOriginalUploadedImage(file);
            const imageUrl = URL.createObjectURL(blob);
            setPreviewImage(imageUrl);
          } else {
            setValue(key as keyof CharacterFormInputs, value as string);
          }
        });
      } catch (error) {
        setErrorMessage('Failed to load character details.');
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
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
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

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'id') formData.append(key, value);
    });

    if (uploadedImage) {
      formData.append('image', uploadedImage);
    }

    try {
      const response = await fetch(apiRoutes.characters.character(Number(id)), {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update character');
      }

      setSuccessMessage('Character updated successfully!');
      goToCharacters();
    } catch (error) {
      setErrorMessage('Failed to update character.');
      console.error('Error:', error);
    } finally {
      setLoadingEditSave(false);
    }
  };

  if (loading) {
    return (
      <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
        <Loading message="Loading character details..." size="lg" />
      </Container>
    );
  }

  const isButtonDisabled = !!fileError || (!isDirty && uploadedImage === originalUploadedImage);

  return (
    <Container fluid className="min-vh-100 p-4 d-flex align-items-center bg-light">
      <Col xs="auto" className=" z-index-3">
        <ReturnButtons fallbackUrl="/characters" />
      </Col>
      <Row className="w-100 mt-5 pt-5 justify-content-center">
        <Col md={6} lg={4} sm={8} className="mt-2">
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-2">Edit Character</Card.Title>
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
                  <Form.Label>Class</Form.Label>
                  <Form.Select
                    isInvalid={!!errors.class}
                    {...register('class', { required: true })}
                  >
                    <option value="">Select Class</option>
                    {classOptions.map((option) => (
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
                    {raceOptions.map((option) => (
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
                    {backgroundOptions.map((option) => (
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
                    {skillsOptions.map((option) => (
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
                  disabled={isButtonDisabled}
                  className="w-100"
                  variant={isButtonDisabled ? 'secondary' : 'primary'}
                >
                  {loadingEditSave ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        {previewImage && (
          <Col md={6} lg={4} sm={8} className="text-center mt-2">
            <Card>
              <Card.Body className="d-flex flex-column">
                <Card.Title>Character Preview</Card.Title>
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={300}
                  height={400}
                  className="align-self-center"
                  loading='lazy'
                />
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default EditCharacter;
