"use server";

import { prisma } from "@/db";
import { revalidatePath } from "next/cache";

export async function updatePriority(
    id: string,
    priority: { value: string; label: string; color: string; textColor: string }
  ) {
  
    const serializedPriority = JSON.stringify(priority);
  
    await prisma.todo.update({
      where: { id },
      data: { priority: serializedPriority },
    });
    revalidatePath("/");
  }