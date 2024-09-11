"use client";

import { useEffect, useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

const priorities = [
  {
    value: "high",
    label: "High",
    color: "bg-red-500",
    textColor: "text-white",
  },
  {
    value: "medium",
    label: "Medium",
    color: "bg-yellow-500",
    textColor: "text-black",
  },
  {
    value: "low",
    label: "Low",
    color: "bg-green-500",
    textColor: "text-white",
  },
];
type PrioritySelectorProps = {
  priority: string | undefined;
  onChange: (priority: { value: string; label: string; color: string; textColor: string}) => void;
};

export function PrioritySelector({
  priority,
  onChange,
}: PrioritySelectorProps) {
  const [selected, setSelected] = useState(
    priorities.find((p) => p.value === priority) || priorities[0]
  );

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  return (
    <Listbox
      value={selected}
      onChange={(newSelection) => setSelected(newSelection)}
    >
      <Label className="block leading-6 text-black">Priority:</Label>
      <div className="relative">
        <ListboxButton
          className={`relative w-40 cursor-default rounded-md py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 ${selected.color} ${selected.textColor}`}
        >
          <span className="flex items-center">
            <span className="block truncate px-2 text-black">{selected.label}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-black"
            />
          </span>
        </ListboxButton>

        <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-40 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {priorities.map((priority) => (
            <ListboxOption
              key={priority.value}
              value={priority}
              className={`group relative cursor-pointer select-none py-2 pl-3 pr-9  data-[focus]:bg-indigo-600 data-[focus]:text-white`}
            >
              <span className="ml-3 block truncate font-normal text-black group-data-[selected]:font-semibold">
                {priority.label}
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}


