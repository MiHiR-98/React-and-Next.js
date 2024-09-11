"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

export function Header() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <>
      <header className="bg-slate-800 flex items-center gap-3 p-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0">
          <Image
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            className="h-8 w-8"
            width={32}
            height={32}
            priority
          />
        </div>
        <nav className="ml-4 w-full flex gap-3 justify-between">
            <div className="ml-4 flex gap-3">
        <Link
          href="/"
          className={`text-slate-300 px-2 py-1 rounded ${
            pathname === "/"
              ? "bg-emerald-500 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          Home
        </Link>
        <Link
          href="/new"
          className={`text-slate-300 px-2 py-1 rounded ${
            pathname === "/new"
              ? "bg-emerald-500 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          New
        </Link>

            </div>

        <div className="relative ml-4 flex items-center">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 text-slate-300 hover:text-white"
        >
          <Image
            alt={user.name}
            src={user.imageUrl}
            className="h-8 w-8 rounded-full"
            width={32}
            height={32}
          />
          <span>{user.name}</span>
        </button>
        {dropdownOpen && (
          <div className="absolute left-0 top-[100%] bg-gray-800 text-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              {userNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-sm hover:bg-gray-700"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
        </nav>

        {/* <Link
        href=".."
        className="text-slate-300 px-2 py-1 rounded hover:bg-slate-700 outline-none "
      >
        Home
      </Link>
      <Link
        className="text-slate-300 px-2 py-1 rounded hover:bg-slate-700 outline-none"
        href="/new"
      >
        New
      </Link> */}
      </header>
    </>
  );
}
