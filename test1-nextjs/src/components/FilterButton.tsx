"use client";

import { filterTodo } from "@/app/actions/filterTodo";
import { Todo } from "@prisma/client";
import { useState } from "react";
import { TodoItem } from "./TodoItem";

export function FilterButton() {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const handleFilter = async (priority: {
    value: string;
    label: string;
    color: string;
    textColor: string;
  }) => {
    const filtered = await filterTodo(priority.value);
    setFilteredTodos(filtered);
  };

  console.log(filteredTodos)

  // function createFilteredTodo() {
  //   filteredTodos.map(todo => (
  //     <TodoItem key={todo.id} {...todo} />
  //   ))
  // }

  return (
    <>
      <div className="flex items-center flex-wrap gap-4 absolute z-10 right-0 -top-9 divide-y-0">
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={() =>
            handleFilter({
              value: "low",
              label: "low",
              color: "bg-green-500",
              textColor: "text-green-500",
            })
          }
        >
          Low
        </button>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={() =>
            handleFilter({
              value: "medium",
              label: "medium",
              color: "bg-yellow-500",
              textColor: "text-yellow-500",
            })
          }
        >
          Medium
        </button>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={() =>
            handleFilter({
              value: "high",
              label: "high",
              color: "bg-red-500",
              textColor: "text-red-500",
            })
          }
        >
          High
        </button>
      </div>

      {/* Render the filtered todos */}
      {/* <ul>
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul> */}
    </>
  );
}
