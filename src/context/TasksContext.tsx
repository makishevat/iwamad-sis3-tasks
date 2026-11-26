import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { type Task, initialTasks } from "../data/tasks";

// Тип контекста
type TasksContextValue = {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
};

// Создание контекста
const TasksContext = createContext<TasksContextValue | null>(null);

// Провайдер
export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Добавление задачи
  const addTask = (title: string, description: string): void => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Удаление задачи
  const deleteTask = (id: number): void => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };
  const toggleTask = (id: number): void => {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  );
};

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, toggleTask }}>
      {children}
    </TasksContext.Provider>
  );
}

// Пользовательский хук
export function useTasks(): TasksContextValue {
  const ctx = useContext(TasksContext);

  if (!ctx) {
    throw new Error("useTasks must be used inside <TasksProvider>");
  }

  return ctx;
}

