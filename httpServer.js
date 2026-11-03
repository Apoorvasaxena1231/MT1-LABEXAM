import http from "http";
import fs from "fs";

// Employee task array
let tasks = [
  {
    id: 1,
    taskName: "Develop Login Page",
    assignedTo: "Rahul Sharma",
    status: "Pending",
  },
  {
    id: 2,
    taskName: "Create Dashboard",
    assignedTo: "Amit Kumar",
    status: "Completed",
  },
];

// Create HTTP Server
const server = http.createServer((req, res) => {
  // 1. Home Route
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end("<h1>Welcome to Employee Task Management</h1>");
  }

  // 2. Get All Tasks
  else if (req.url === "/tasks" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(tasks));
  }

  // 3. About Route
  else if (req.url === "/about" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });

    res.end("Employee Task Management Application");
  }

  // 4. Read HTML using FS Module
  else if (req.url === "/home" && req.method === "GET") {
    fs.readFile("./public/index.html", (err, data) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });

        res.end("Error reading HTML file");
      } else {
        res.writeHead(200, {
          "Content-Type": "text/html",
        });

        res.end(data);
      }
    });
  }

  // 5. Add Task using POST
  else if (req.url === "/add-task" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const task = JSON.parse(body);

        if (
          task.id === undefined ||
          !task.taskName ||
          !task.assignedTo ||
          !task.status
        ) {
          res.writeHead(400, {
            "Content-Type": "application/json",
          });

          res.end(
            JSON.stringify({
              message: "All required fields are necessary",
            })
          );

          return;
        }

        tasks.push(task);

        res.writeHead(201, {
          "Content-Type": "application/json",
        });

        res.end(
          JSON.stringify({
            message: "Task added successfully",
            task: task,
          })
        );
      } catch (error) {
        res.writeHead(400, {
          "Content-Type": "application/json",
        });

        res.end(
          JSON.stringify({
            message: "Invalid JSON data",
          })
        );
      }
    });
  }

  // 6. Invalid Route
  else {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });

    res.end("404 - Page Not Found");
  }
});

// Start Server
server.listen(3000, () => {
  console.log("HTTP Server running at http://localhost:3000");
});
