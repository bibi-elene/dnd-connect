import { Button } from 'react-bootstrap';

interface EditButtonProps {
  onClick: () => void;
  label?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick, label = 'Edit' }) => {
  return (
    <Button
      variant="dark"
      className="btn-sm rounded btn-md-lg shadow bg-gray hover-opacity-100 opacity-50 rounded-lg transition px-4 py-2"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default EditButton;
