import { FaPencilAlt } from 'react-icons/fa';

interface EditButtonProps {
  onClick: () => void;
  label?: string;
}

const EditButton: React.FC<EditButtonProps> = () => {
  return (
    <button className="edit-button" title="Edit">
      <FaPencilAlt />
    </button>
  );
};

export default EditButton;
