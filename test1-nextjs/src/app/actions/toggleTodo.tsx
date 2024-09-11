"use server";

import { prisma } from "@/db";
import { revalidatePath } from "next/cache";

export async function toggleTodo(id: string, complete: boolean) {
  try {
    await prisma.todo.update({ where: { id }, data: { complete } });
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to toggle todo:", error);
  }
}
