"use server";

import { prisma } from "@/db";
import { redirect } from "next/navigation";

export async function filterTodo(priority: string) {
    
    const filteredTodos = await prisma.todo.findMany({
        where: {
            priority: {
                equals: priority,
            }
        }
    });
    
    return filteredTodos
}