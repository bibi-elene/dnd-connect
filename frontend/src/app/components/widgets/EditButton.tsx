import { Button } from 'react-bootstrap';

interface EditButtonProps {
  onClick: () => void;
  label?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick, label = 'Edit' }) => {
  return (
    <Button
      variant="primary"
      className="btn-sm rounded btn-md-lg shadow rounded-lg bg-green-500 hover:bg-green-600 transition px-4 py-2"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default EditButton;
