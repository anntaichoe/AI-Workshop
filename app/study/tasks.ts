// Reads and adds study tasks in the Supabase "tasks" table. The table's
// row level security rules make sure each account only sees its own rows.

import { supabase } from "./supabase-auth";

export type Task = {
  id: string;
  title: string;
};

export async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await supabase()
    .from("tasks")
    .select("id, title")
    .order("created_at", { ascending: true });
  if (error) throw new Error(`Could not load your tasks: ${error.message}`);
  return data;
}

export async function addTask(title: string): Promise<Task> {
  const { data, error } = await supabase()
    .from("tasks")
    .insert({ title })
    .select("id, title")
    .single();
  if (error) throw new Error(`Could not add the task: ${error.message}`);
  return data;
}
