import Image from "next/image";
import { useState, useEffect } from "react";

const KanbanDashboard = () => {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  const [users, setUsers] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/settingApi/getSettings");
        const data = await res.json();

        setTasks(data.boardData);
        setUsers(data.users);
        setActivityLog(data.activityLog);
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };

    fetchData();
  }, []);

  const columnConfig = {
    todo: {
      title: "Todo",
      color: "bg-slate-100",
      borderColor: "border-slate-300",
      textColor: "text-slate-600",
    },
    inProgress: {
      title: "In Progress",
      color: "bg-blue-50",
      borderColor: "border-blue-300",
      textColor: "text-blue-600",
    },
    done: {
      title: "Done",
      color: "bg-emerald-50",
      borderColor: "border-emerald-300",
      textColor: "text-emerald-600",
    },
  };

  const addActivityLog = (message, type = "move") => {
    const newActivity = {
      id: Date.now(),
      message,
      timestamp: new Date().toISOString(),
      type,
    };
    setActivityLog((prev) => [newActivity, ...prev].slice(0, 20));
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDragStart = (e, task, sourceColumn) => {
    setDraggedTask({ task, sourceColumn });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "";
    setDraggedTask(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, targetColumn) => {
    e.preventDefault();
    if (!draggedTask || draggedTask.sourceColumn === targetColumn) return;

    const { task, sourceColumn } = draggedTask;

    const updatedTasks = {
      ...tasks,
      [sourceColumn]: tasks[sourceColumn].filter((t) => t.id !== task.id),
      [targetColumn]: [...tasks[targetColumn], task],
    };

    setTasks(updatedTasks);

    const logMessage = `Task "${task.title}" moved from ${columnConfig[sourceColumn].title} to ${columnConfig[targetColumn].title}`;
    const newLog = {
      id: Date.now(),
      message: logMessage,
      timestamp: new Date().toISOString(),
      type: "move",
    };

    const updatedActivityLog = [newLog, ...activityLog].slice(0, 20);
    setActivityLog(updatedActivityLog);
    showToast(`Task moved to ${columnConfig[targetColumn].title}!`);

    try {
      await fetch("/api/settingApi/saveSettings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          boardData: updatedTasks,
          users,
          activityLog: updatedActivityLog,
        }),
      });
    } catch (error) {
      console.error("Error saving task update:", error);
    }
  };

  const reassignTask = (taskId, newUser, columnId) => {
    setTasks((prev) => {
      const updated = {
        ...prev,
        [columnId]: prev[columnId].map((task) =>
          task.id === taskId ? { ...task, assignedUser: newUser } : task
        ),
      };

      const task = prev[columnId].find((t) => t.id === taskId);
      const message = `Task "${task.title}" reassigned to ${newUser.name}`;
      const newLog = {
        id: Date.now(),
        message,
        timestamp: new Date().toISOString(),
        type: "assign",
      };

      const updatedLog = [newLog, ...activityLog].slice(0, 20);
      setActivityLog(updatedLog);
      showToast(`Task reassigned to ${newUser.name}!`);

      fetch("/api/settingApi/saveSettings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          boardData: updated,
          users,
          activityLog: updatedLog,
        }),
      });

      return updated;
    });
  };

  const deleteTask = async (taskId, columnId) => {
    const task = tasks[columnId].find((t) => t.id === taskId);
    if (!task) return;

    const updatedTasks = {
      ...tasks,
      [columnId]: tasks[columnId].filter((t) => t.id !== taskId),
    };

    setTasks(updatedTasks);

    const logMessage = `Task "${task.title}" deleted from ${columnConfig[columnId].title}`;
    const newLog = {
      id: Date.now(),
      message: logMessage,
      timestamp: new Date().toISOString(),
      type: "delete",
    };

    const updatedActivityLog = [newLog, ...activityLog].slice(0, 20);
    setActivityLog(updatedActivityLog);
    showToast(`Task "${task.title}" deleted!`);

    try {
      await fetch("/api/settingApi/saveSettings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          boardData: updatedTasks,
          users,
          activityLog: updatedActivityLog,
        }),
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const filteredTasks = Object.keys(tasks).reduce((acc, columnId) => {
    acc[columnId] = tasks[columnId].filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-slate-300 p-4">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex gap-6 overflow-x-auto pb-4">
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow scroll-smooth">
              {Object.entries(columnConfig).map(([columnId, config]) => (
                <div
                  key={columnId}
                  className={`${config.color} rounded-xl p-6 shadow-lg border-2 ${config.borderColor} min-h-[600px] transition-all duration-200`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, columnId)}
                >
                  <h2
                    className={`text-xl font-semibold mb-4 ${config.textColor} flex items-center gap-2`}
                  >
                    <span
                      className={`w-3 h-3 rounded-full ${config.borderColor.replace(
                        "border-",
                        "bg-"
                      )}`}
                    />
                    {config.title}
                    <span className="text-sm bg-white px-2 py-1 rounded-full">
                      {filteredTasks[columnId]?.length || 0}
                    </span>
                  </h2>

                  <div className="space-y-4 min-h-[500px]">
                    {filteredTasks[columnId]?.map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task, columnId)}
                        onDragEnd={handleDragEnd}
                        className="bg-white rounded-lg p-4 shadow-md border border-slate-200 hover:shadow-lg transition-all cursor-move hover:scale-102 active:scale-98"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-slate-800">
                            {task.title}
                          </h3>
                          <button
                            onClick={() => deleteTask(task.id, columnId)}
                            className="p-1 rounded hover:bg-red-100 transition-colors"
                            title="Delete task"
                          >
                            <svg
                              className="w-4 h-4 text-red-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1zm-7 4h18"
                              />
                            </svg>
                          </button>
                        </div>

                        <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                          {task.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="relative w-8 h-8">
                              <Image
                                src={task.assignedUser.avatar}
                                alt={task.assignedUser.name}
                                fill
                                sizes="32px"
                                className="rounded-full object-cover"
                              />
                            </div>
                            <span className="text-sm text-slate-600">
                              {task.assignedUser.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="relative group">
                              <button className="p-1 rounded hover:bg-slate-100 transition-colors">
                                <svg
                                  className="w-4 h-4 text-slate-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                  />
                                </svg>
                              </button>

                              <div className="absolute right-0 top-8 bg-slate-100 rounded-lg shadow-lg border border-slate-200 py-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <div className="px-3 py-1 text-xs text-slate-500 border-b">
                                  Reassign to:
                                </div>
                                {users.map((user) => (
                                  <button
                                    key={user.name}
                                    onClick={() =>
                                      reassignTask(task.id, user, columnId)
                                    }
                                    className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2"
                                  >
                                    <div className="relative w-6 h-6">
                                      <Image
                                        src={user.avatar}
                                        alt={user.name}
                                        fill
                                        sizes="32px"
                                        className="rounded-full object-cover"
                                      />
                                    </div>
                                    <span className="text-sm">{user.name}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {toast && (
          <div className="fixed bottom-4 right-4 bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg z-30 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {toast.message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanDashboard;
