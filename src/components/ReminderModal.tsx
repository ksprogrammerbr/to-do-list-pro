import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onSetReminder: (taskId: string, reminderTime: string) => void;
}

const ReminderModal = ({
  isOpen,
  onClose,
  task,
  onSetReminder,
}: ReminderModalProps) => {
  const [reminderTime, setReminderTime] = useState(
    format(new Date(), "yyyy-MM-dd'T'HH:mm")
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Definir Lembrete</h2>
        <p className="text-gray-600 mb-4">
          Definir lembrete para: {task.title}
        </p>
        <input
          type="datetime-local"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onSetReminder(task.id, reminderTime);
              onClose();
            }}
            className="px-4 py-2 bg-primary-400 text-white rounded-lg hover:bg-primary-300"
          >
            Definir Lembrete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;
