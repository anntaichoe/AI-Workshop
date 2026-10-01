"use client";

import { useEffect, useState } from "react";
import { addTask, fetchTasks, type Task } from "./tasks";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setError("");
    setBusy(true);
    try {
      const task = await addTask(trimmed);
      setTasks((current) => [...current, task]);
      setTitle("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="study-tasks">
      <h2>Your tasks</h2>

      <form className="study-add" onSubmit={handleAdd}>
        <label htmlFor="new-task" className="study-hidden">
          New task
        </label>
        <input
          id="new-task"
          type="text"
          placeholder="e.g. Review 20 flashcards"
          maxLength={500}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" disabled={busy || !title.trim()}>
          {busy ? "Adding…" : "Add"}
        </button>
      </form>

      {error && (
        <p className="study-error" role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <p>Loading tasks…</p>
      ) : tasks.length === 0 ? (
        <p className="study-empty">No tasks yet.</p>
      ) : (
        <ul className="study-list">
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
