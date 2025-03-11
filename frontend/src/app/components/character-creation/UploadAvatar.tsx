import { useState } from 'react';
import { Form } from 'react-bootstrap';

interface AvatarUploadProps {
  onUpload: (file: File | null, preview: string | null) => void;
}

const AvatarUpload = ({ onUpload }: AvatarUploadProps) => {
  const [fileError, setFileError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFileError(null);

    const maxFileSize = 2 * 1024 * 1024; // 2MB

    if (file && file.size > maxFileSize) {
      setFileError('File size should not exceed 2MB.');
      onUpload(null, null);
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        onUpload(file, imageData);
      };
      reader.readAsDataURL(file);
    } else {
      onUpload(null, null);
    }
  };

  return (
    <Form.Group className="h-100">
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
  );
};

export default AvatarUpload;
