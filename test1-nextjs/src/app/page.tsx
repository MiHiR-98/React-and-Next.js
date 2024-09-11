import {Todos} from "../components/Todos"; // Import the Client Component
import { prisma } from "@/db"; // Prisma should be used in server components only
import { determineColor, determineTextColor } from "./utilities/determinePriorityColor";

async function getTodos() {
  const todos = await prisma.todo.findMany();
  return todos.map((todo) => ({
    ...todo,
    priority: {
      value: todo.priority,
      label: todo.priority,
      color: determineColor(todo.priority),
      textColor: determineTextColor(todo.priority),
    },
  }));
}

export default async function Home() {
  const todos = await getTodos(); // Fetch todos on the server side
  return <Todos initialTodos={todos} />; // Pass the todos to the Client Component
}
