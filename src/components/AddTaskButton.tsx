import { FiPlus } from "react-icons/fi";

interface AddTaskButtonProps {
  onClick: () => void;
}

const AddTaskButton = ({ onClick }: AddTaskButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-primary-400 text-white p-4 rounded-full shadow-lg hover:bg-primary-300 transition-colors duration-200 group"
    >
      <FiPlus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
    </button>
  );
};

export default AddTaskButton;
