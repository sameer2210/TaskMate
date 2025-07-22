import Button from "@/components/ui/Button";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Settings = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedUser: "",
    status: "todo",
  });

  const [boardData, setBoardData] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [activityLog, setActivityLog] = useState([]);

  const users = [
    {
      name: "Alice Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      initials: "AJ",
    },
    {
      name: "Bob Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
      initials: "BS",
    },
    {
      name: "Carol Davis",
      avatar: "https://i.pravatar.cc/150?img=3",
      initials: "CD",
    },
    {
      name: "David Wilson",
      avatar: "https://i.pravatar.cc/150?img=4",
      initials: "DW",
    },
    {
      name: "Emma Brown",
      avatar: "https://i.pravatar.cc/150?img=5",
      initials: "EB",
    },
  ];

  // Load existing data from DB on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settingApi/getSettings");
        const data = await res.json();
        if (res.ok) {
          setBoardData(
            data.boardData || { todo: [], inProgress: [], done: [] }
          );
          setActivityLog(data.activityLog || []);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = () => {
    const userObj = users.find((u) => u.name === newTask.assignedUser);
    if (!userObj) return alert("Assigned user not found!");

    const task = {
      id: `task-${Date.now()}`,       // Unique task ID
      title: newTask.title,
      description: newTask.description,
      assignedUser: userObj,
      createdAt: new Date().toISOString(),
    };

    // Add task to selected status column
    setBoardData((prev) => ({
      ...prev,
      [newTask.status]: [...prev[newTask.status], task],
    }));

    // Log the creation
    setActivityLog((prev) => [
      {
        id: Date.now(),
        message: `Task "${task.title}" created and added to ${newTask.status}`,
        timestamp: new Date().toISOString(),
        type: "create",
      },
      ...prev,
    ]);

    // Reset form
    setNewTask({
      title: "",
      description: "",
      assignedUser: "",
      status: "todo",
    });
    toast.success("Task added successfully click Save Button || Add new Task");
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/settingApi/saveSettings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boardData, users, activityLog }),
      });

      const data = await res.json();
      if (res.ok) {
        // alert(" Data saved to MongoDB!");
        toast.success("Data saved!");
      } else {
        // alert(" Failed to save data.");
        toast.info("Failed to save data!");
        console.error(data);
      }
    } catch (error) {
      console.error("Error:", error);
      // alert("Something went wrong!");
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-8">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r  to-teal-900 px-6 py-5 rounded-t-2xl">
            <h1 className="text-xl font-bold">Create a New Task</h1>
            <p className="text-sm text-emerald-900">
              Fill the details and assign the task
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTask();
            }}
            className="space-y-6 p-8"
          >
            <div>
              <label className="block text-sm text-slate-700 mb-1 font-medium">
                Task Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter task title"
                value={newTask.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-1 font-medium">
                Task Description
              </label>
              <textarea
                name="description"
                placeholder="Write task description..."
                value={newTask.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                rows="3"
                required
              />
            </div>

            <div className="flex justify-around">
              <div>
                <label className="block  text-sm text-slate-700 mb-1 font-medium">
                  Assign User
                </label>
                <select
                  name="assignedUser"
                  value={newTask.assignedUser}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-b-2 border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                  required
                >
                  <option value="">-- Select User --</option>
                  {users.map((user) => (
                    <option key={user.initials} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1 font-medium">
                  Status
                </label>
                <select
                  name="status"
                  value={newTask.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-b-2 border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                >
                  <option value="todo">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>

            <Button type="submit">➕ Add Task</Button>
          </form>
        </div>

        <Button onClick={handleSave}>💾 Save All Data</Button>
      </div>
    </div>
  );
};

export default Settings;
