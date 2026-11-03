import express from "express";

const app = express();
app.use(express.json());

let tasks = [
  {
    id: 1,
    taskName: "Login Page",
    assignedTo: "Rahul",
    status: "Pending",
    priority: "High",
  },
  {
    id: 2,
    taskName: "Dashboard",
    assignedTo: "Amit",
    status: "Completed",
    priority: "Medium",
  },
  {
    id: 3,
    taskName: "Testing",
    assignedTo: "Priya",
    status: "Pending",
    priority: "Low",
  },
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  let task = tasks.find((t) => t.id == req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

app.post("/tasks", (req, res) => {
  let task = req.body;
  if (
    task.id === undefined ||
    !task.taskName ||
    !task.assignedTo ||
    !task.status ||
    !task.priority
  )
    return res.status(400).json({ message: "All fields required" });
  if (tasks.some((t) => t.id == task.id))
    return res.status(409).json({ message: "ID already exists" });
  tasks.push(task);
  res.status(201).json({ message: "Task added successfully", task });
});

app.put("/tasks/:id", (req, res) => {
  let index = tasks.findIndex((t) => t.id == req.params.id);
  if (index == -1) return res.status(404).json({ message: "Task not found" });
  tasks[index] = { ...req.body, id: Number(req.params.id) };
  res.json({ message: "Task updated successfully", task: tasks[index] });
});

app.delete("/tasks/:id", (req, res) => {
  let index = tasks.findIndex((t) => t.id == req.params.id);
  if (index == -1) return res.status(404).json({ message: "Task not found" });
  tasks.splice(index, 1);
  res.json({ message: "Task deleted successfully" });
});

app.listen(4000, () => {
  console.log("Express Server running at http://localhost:4000");
});
