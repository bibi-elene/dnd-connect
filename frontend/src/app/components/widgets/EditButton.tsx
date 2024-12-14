import { Button } from 'react-bootstrap';

interface EditButtonProps {
  onClick: () => void;
  label?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick, label = 'Edit' }) => {
  return (
    <Button variant="outline-primary" size="sm" onClick={onClick}>
      {label}
    </Button>
  );
};

export default EditButton;
