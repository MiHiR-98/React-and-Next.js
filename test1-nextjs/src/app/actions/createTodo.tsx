"use server";

import { prisma } from "@/db";
import { redirect } from "next/navigation";

export async function createTodo(data: FormData) {
  const title = data.get("title")?.toString();
  const description = data.get("description")?.toString();
  const priority = data.get("priority")?.toString();

  if (!title || !description || !priority) {
    return {error: "All fields are required"};
  }

  await prisma.todo.create({
    data: {
      title,
      description,
      complete: false,
      priority,
    },
  });

  // Redirect to the homepage after the todo is created
  redirect("/");
}
