"use server";

import { prisma } from "@/db";
import { redirect } from "next/navigation";

export async function deleteTodo(id: string) {
  try {
    const todo = await prisma.todo.findUnique({ where: { id } });
    
    if (!todo) {
      console.error(`Todo with id ${id} not found`);
      return;
    }

    await prisma.todo.delete({ where: { id } });
    redirect("/");
  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
}
