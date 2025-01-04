import { FaPencilAlt } from 'react-icons/fa';

interface EditButtonProps {
  onEdit: () => void;
  label?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ onEdit }) => {
  return (
    <button className="edit-button" title="Edit" onClick={onEdit}>
      <FaPencilAlt />
    </button>
  );
};

export default EditButton;
