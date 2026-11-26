export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};
export const initialTasks: Task[] = [
  {
    id: 1,
    title: "Complete React Native assignment",
    description: "Finish the Task Manager app",
    completed: false,
  },
  {
    id: 2,
    title: "Study TypeScript",
    description: "Practice types and interfaces",
    completed: false,
  },
  {
    id: 3,
    title: "Prepare for university",
    description: "Review lecture materials on UNINET",
    completed: true,
  },
];