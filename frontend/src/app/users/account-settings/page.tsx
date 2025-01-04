'use client';

import { Form, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/app/context/AuthContext';
import ReturnButtons from '@/app/components/widgets/ReturnButtons';

interface AccountSettingsFormInputs {
  username: string;
  email: string;
}

const AccountSettings: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<AccountSettingsFormInputs>();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setValue('username', user.username);
      setValue('email', user.email || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data: AccountSettingsFormInputs) => {
    try {
      setSuccessMessage('Account details updated successfully!');
      setErrorMessage('');
      console.log('Submitted Data:', data);
    } catch (error) {
      setErrorMessage('Failed to update account settings. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container className="min-vh-100 d-flex align-items-center justify-content-center">
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center"
    >
      <ReturnButtons withDashboardButton={false} buttonText='Home'/>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="shadow p-4">
            <Card.Body>
              <h2 className="text-center mb-4 text-lg">Account Settings</h2>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    {...register('username', { required: 'Username is required' })}
                    placeholder="Enter your username"
                  />
                  {errors.username && (
                    <Form.Text className="text-danger">{errors.username.message}</Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <Form.Text className="text-danger">{errors.email.message}</Form.Text>
                  )}
                </Form.Group>
                <div className="d-flex">
                  <button
                    type="submit"
                    disabled={!isDirty}
                    className={`w-full py-2 rounded text-white ${
                      !isDirty ? 'bg-gray-400 cursor-not-allowed' : 'primary-custom-button'
                    }`}
                  >
                    Save Changes
                  </button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountSettings;
