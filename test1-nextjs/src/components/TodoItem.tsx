"use client";

import { useState } from "react";
import moment from 'moment';


type TodoItemProps = {
  id: string;
  title: string;
  description: string | null;
  complete: boolean;
  priority: { value: string; label: string; color: string; textColor: string };
  createdAt: string;
  toggleTodo: (id: string, complete: boolean) => void;
  deleteTodo: (id: string) => void;
  selectTodo: (id: string) => void;
  isSelected: boolean;
};

export function TodoItem({
  id,
  title,
  description,
  complete,
  priority,
  createdAt,
  toggleTodo,
  deleteTodo,
  selectTodo,
  isSelected,
}: TodoItemProps) {
  const [showDelete, setShowDelete] = useState(false);

  const dateTimeAgo = moment(new Date(createdAt)).fromNow();

  const handleDelete = () => {
    console.log("TodoItem:", id);
    deleteTodo(id);
    // setShowDelete(false); // Close the dialog after deletion
  };

  const handleToggle = () => {
    toggleTodo(id, !complete);
  };

  const handleSelect = () => {
    selectTodo(id);
  };

  return (
    <>
      <li
        key={id}
        style={{ borderLeftColor: priority?.color }}
        className={`relative flex justify-between gap-x-6 px-3 py-5 rounded-md bg-white shadow-lg border-l-8 ${
          isSelected ? "bg-gray-200" : ""
        }`}
        onClick={handleSelect}
      >
        <div className="flex min-w-0 gap-x-4">
          <input
            id={id}
            type="checkbox"
            className="cursor-pointer peer"
            defaultChecked={complete}
          />
          <div
            className={`min-w-0 flex-auto cursor-pointer ${
              complete ? "line-through text-green-500" : "text-gray-900"
            }`}
            onClick={handleToggle}
          >
            <p className={`font-semibold leading-6`}>{title}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {description}
            </p>
          </div>
        </div>

        <p className="text-sm italic text-slate-700">Created: {dateTimeAgo}</p>

        <button
          type="button"
          className="text-xs bg-black text-white px-1 absolute right-0 top-0 hover:bg-red-600 outline-none"
          onClick={(e) => {
            e.stopPropagation();
            deleteTodo(id);
          }}
        >
          X
        </button>
      </li>

      {/* {showDelete && (
        <DeleteConfirmationBox
          open={showDelete}
          callbackFn={(shouldDelete) => {
            if (shouldDelete) {
              handleDelete();
            } else {
              setShowDelete(false); // Close dialog if cancel is clicked
            }
          }}
        />
      )} */}
    </>
  );
}
