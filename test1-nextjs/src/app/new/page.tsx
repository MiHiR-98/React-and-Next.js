"use client";

import { PrioritySelector } from "@/components/PrioritySelector";
import { useState } from "react";
import { createTodo } from "../actions/createTodo";

export default function Page() {
  const [selectedPriority, setSelectedPriority] = useState("medium");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePriorityChange = (newPriority: {
    value: string;
    label: string;
  }) => {
    setSelectedPriority(newPriority.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const result = await createTodo(formData);

    if (result?.error) {
      setErrorMessage(result.error);
    } else {
      setErrorMessage(null);
      // Optionally redirect or clear the form
    }
  };

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <form onSubmit={handleSubmit} className="flex gap-2 flex-col">
          <h1 className="text-2xl text-black">Add New Item</h1>
          <label htmlFor="title" className="text-black">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="border border-black bg-transparent text-black rounded px-2 py-1 outline-none"
          />

          <label htmlFor="description" className="text-black">
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            className="border border-black bg-transparent text-black rounded-md px-3 py-2 outline-none w-full resize-none"
          />

          <PrioritySelector
            priority={selectedPriority}
            onChange={handlePriorityChange}
          />
          <input type="hidden" name="priority" value={selectedPriority} />

          <div className="flex mt-2">
            <button
              type="submit"
              className="border border-black text-black px-2 py-1 rounded bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 outline-none"
            >
              Create
            </button>
          </div>
        </form>

        {errorMessage && (
          <div className="fixed bottom-4 right-4 bg-red-200 px-6 py-4 rounded-md text-lg flex items-center max-w-lg">
            <svg
              viewBox="0 0 24 24"
              className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
            >
              <path
                fill="currentColor"
                d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
              />
            </svg>
            <span className="text-red-800">{errorMessage}</span>
          </div>
        )}
      </div>
    </>
  );
}
