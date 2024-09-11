"use client";

import { useState } from "react";
import { TodoItem } from "./TodoItem";
import { toggleTodo } from "../app/actions/toggleTodo";
import { deleteTodo } from "../app/actions/deleteTodo";
import { Example } from "./DeleteConfirmationBox";

export function Todos({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [filteredTodos, setFilteredTodos] = useState(initialTodos);
  const [filter, setFilter] = useState("all");
  const [selectedTodos, setSelectedTodos] = useState(new Set());
  const [open, setOpen] = useState(false); // State to control modal
  const [currentTodoId, setCurrentTodoId] = useState(null); // State to track the current todo ID
  const [showSuccess, setShowSuccess] = useState(false)

  const handleFilterChange = (priority) => {
    setFilter(priority);
    setFilteredTodos(
      priority === "all"
        ? todos
        : todos.filter((todo) => todo.priority.value === priority)
    );
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
      setFilteredTodos(
        updatedTodos.filter(
          (todo) => filter === "all" || todo.priority.value === filter
        )
      );
      setSelectedTodos((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleToggleTodo = async (id: string, complete: boolean) => {
    try {
      await toggleTodo(id, complete);
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, complete } : todo
      );
      setTodos(updatedTodos);
      setFilteredTodos(
        updatedTodos.filter(
          (todo) => filter === "all" || todo.priority.value === filter
        )
      );
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  const handleSelectTodo = (id: string) => {
    setSelectedTodos((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const handleDeleteSelected = () => {
    selectedTodos.forEach((id) => handleDelete(id));
    setSelectedTodos(new Set()); // Clear selection after deletion
  };

  const openDeleteModal = (id) => {
    setCurrentTodoId(id);
    setOpen(true);
  };

  return (
    <div className="mx-auto max-w-4xl relative">
      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-200 p-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg fixed right-4 bottom-2">
          <svg viewBox="0 0 24 24" className="text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
            <path fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
          </svg>
          <span className="text-green-800">The item has been deleted successfully.</span>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === "low" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("low")}
        >
          Low
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === "medium" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("medium")}
        >
          Medium
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === "high" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("high")}
        >
          High
        </button>
      </div>

      <ul className="flex flex-col gap-2 text-black">
        {filteredTodos.length === 0 && "No Todos"}
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            complete={todo.complete}
            priority={todo.priority}
            createdAt={todo.createdAt.toISOString()}
            toggleTodo={handleToggleTodo}
            deleteTodo={() => openDeleteModal(todo.id)} // Open modal with the specific todo ID
            selectTodo={handleSelectTodo}
            isSelected={selectedTodos.has(todo.id)}
          />
        ))}
      </ul>

      {selectedTodos.size > 0 && (
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleDeleteSelected}
        >
          Delete Selected Todos
        </button>
      )}

      {/* Render the Example modal and pass handleDelete and currentTodoId */}
      {open && (
        <Example
          open={open}
          setOpen={setOpen}
          handleDelete={handleDelete}
          todoId={currentTodoId}
        />
      )}
    </div>
  );
}
