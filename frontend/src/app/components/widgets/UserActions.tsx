interface UserActionProps {
  onViewAll: () => void;
  onCreate?: () => void;
}

const UserActions: React.FC<UserActionProps> = ({ onViewAll, onCreate }) => (
  <div className="mb-5">
    <button
      onClick={onViewAll}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
    >
      View All Users
    </button>
    {onCreate && (
      <button
        onClick={onCreate}
        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition ml-3"
      >
        Create New User
      </button>
    )}
  </div>
);

export default UserActions;
