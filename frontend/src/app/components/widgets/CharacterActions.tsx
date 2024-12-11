interface CharacterActionsProps {
  onViewAll: () => void;
  onCreate?: () => void;
}

const CharacterActions: React.FC<CharacterActionsProps> = ({ onViewAll, onCreate }) => (
  <div className="mb-5">
    <button
      onClick={onViewAll}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
    >
      View All Characters
    </button>
    {onCreate && (
      <button
        onClick={onCreate}
        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition ml-3"
      >
        Create New Character
      </button>
    )}
  </div>
);

export default CharacterActions;
