const MoodLogCard = ({ mood, onDelete }) => {
  return (
    <div className="p-4 rounded-lg border shadow-sm flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-2xl">{mood.emoji}</span>
        <p className="text-lg">{mood.type}</p>
      </div>
      <button
        onClick={() => onDelete(mood.id)}
        className="text-red-500 hover:text-red-600"
      >
        <Trash className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MoodLogCard;
