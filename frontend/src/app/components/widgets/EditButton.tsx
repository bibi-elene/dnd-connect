interface EditButtonProps {
  onClick: () => void;
  label?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick, label = 'Edit' }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600 transition"
    >
      {label}
    </button>
  );
};

export default EditButton;
