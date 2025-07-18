// import Image from "next/image";
// import { useState } from "react";

// const KanbanDashboard = () => {
//   const [tasks, setTasks] = useState({
//     todo: [
//       {
//         id: "task-1",
//         title: "Design Homepage",
//         description:
//           "Create wireframes and mockups for the new homepage layout",
//         assignedUser: {
//           name: "Alice Johnson",
//           avatar: "https://i.pravatar.cc/150?img=1",
//           initials: "AJ",
//         },
//         createdAt: new Date().toISOString(),
//       },
//       {
//         id: "task-2",
//         title: "API Integration",
//         description:
//           "Integrate third-party payment gateway with the existing system",
//         assignedUser: {
//           name: "Bob Smith",
//           avatar: "https://i.pravatar.cc/150?img=2",
//           initials: "BS",
//         },
//         createdAt: new Date().toISOString(),
//       },
//     ],
//     inProgress: [
//       {
//         id: "task-3",
//         title: "Database Migration",
//         description:
//           "Migrate user data from old system to new PostgreSQL database",
//         assignedUser: {
//           name: "Carol Davis",
//           avatar: "https://i.pravatar.cc/150?img=3",
//           initials: "CD",
//         },
//         createdAt: new Date().toISOString(),
//       },
//     ],
//     done: [
//       {
//         id: "task-4",
//         title: "User Authentication",
//         description:
//           "Implement JWT-based authentication system with password reset",
//         assignedUser: {
//           name: "David Wilson",
//           avatar: "https://i.pravatar.cc/150?img=4",
//           initials: "DW",
//         },
//         createdAt: new Date().toISOString(),
//       },
//     ],
//   });

//   const [users] = useState([
//     {
//       name: "Alice Johnson",
//       avatar: "https://i.pravatar.cc/150?img=1",
//       initials: "AJ",
//     },
//     {
//       name: "Bob Smith",
//       avatar: "https://i.pravatar.cc/150?img=2",
//       initials: "BS",
//     },
//     {
//       name: "Carol Davis",
//       avatar: "https://i.pravatar.cc/150?img=3",
//       initials: "CD",
//     },
//     {
//       name: "David Wilson",
//       avatar: "https://i.pravatar.cc/150?img=4",
//       initials: "DW",
//     },
//     {
//       name: "Emma Brown",
//       avatar: "https://i.pravatar.cc/150?img=5",
//       initials: "EB",
//     },
//   ]);

//   const [activityLog, setActivityLog] = useState([
//     {
//       id: 1,
//       message: 'Task "User Authentication" moved to Done',
//       timestamp: new Date().toISOString(),
//       type: "move",
//     },
//     {
//       id: 2,
//       message: 'Task "Database Migration" assigned to Carol Davis',
//       timestamp: new Date().toISOString(),
//       type: "assign",
//     },
//     {
//       id: 3,
//       message: 'Task "API Integration" created',
//       timestamp: new Date().toISOString(),
//       type: "create",
//     },
//   ]);

//   const [showActivityPanel, setShowActivityPanel] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [toast, setToast] = useState(null);
//   const [draggedTask, setDraggedTask] = useState(null);

//   const columnConfig = {
//     todo: {
//       title: "Todo",
//       color: "bg-slate-100",
//       borderColor: "border-slate-300",
//       textColor: "text-slate-600",
//     },
//     inProgress: {
//       title: "In Progress",
//       color: "bg-blue-50",
//       borderColor: "border-blue-300",
//       textColor: "text-blue-600",
//     },
//     done: {
//       title: "Done",
//       color: "bg-emerald-50",
//       borderColor: "border-emerald-300",
//       textColor: "text-emerald-600",
//     },
//   };

//   const addActivityLog = (message, type = "move") => {
//     const newActivity = {
//       id: Date.now(),
//       message,
//       timestamp: new Date().toISOString(),
//       type,
//     };
//     setActivityLog((prev) => [newActivity, ...prev].slice(0, 20));
//   };

//   const showToast = (message, type = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const handleDragStart = (e, task, sourceColumn) => {
//     setDraggedTask({ task, sourceColumn });
//     e.dataTransfer.effectAllowed = "move";
//     e.dataTransfer.setData("text/html", e.target.outerHTML);
//     e.target.style.opacity = "0.5";
//   };

//   const handleDragEnd = (e) => {
//     e.target.style.opacity = "";
//     setDraggedTask(null);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = "move";
//   };

//   const handleDrop = (e, targetColumn) => {
//     e.preventDefault();
//     if (!draggedTask || draggedTask.sourceColumn === targetColumn) return;

//     const { task, sourceColumn } = draggedTask;

//     setTasks((prev) => ({
//       ...prev,
//       [sourceColumn]: prev[sourceColumn].filter((t) => t.id !== task.id),
//       [targetColumn]: [...prev[targetColumn], task],
//     }));

//     addActivityLog(
//       `Task "${task.title}" moved from ${columnConfig[sourceColumn].title} to ${columnConfig[targetColumn].title}`
//     );
//     showToast(`Task moved to ${columnConfig[targetColumn].title}!`);
//   };

//   const reassignTask = (taskId, newUser, columnId) => {
//     setTasks((prev) => ({
//       ...prev,
//       [columnId]: prev[columnId].map((task) =>
//         task.id === taskId ? { ...task, assignedUser: newUser } : task
//       ),
//     }));

//     const task = tasks[columnId].find((t) => t.id === taskId);
//     addActivityLog(
//       `Task "${task.title}" reassigned to ${newUser.name}`,
//       "assign"
//     );
//     showToast(`Task reassigned to ${newUser.name}!`);
//   };

//   const filteredTasks = Object.keys(tasks).reduce((acc, columnId) => {
//     acc[columnId] = tasks[columnId].filter(
//       (task) =>
//         task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         task.description.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     return acc;
//   }, {});

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-200 to-slate-300 p-4">
//       {/* Header remains unchanged */}

//       <div className="max-w-7xl mx-auto relative">
//         <div className="flex gap-6 overflow-x-auto pb-4">
//           {/* Kanban Board */}
//           <div
//             className={`flex-1 transition-all duration-300 ${
//               showActivityPanel ? "lg:pr-80" : ""
//             }`}
//           >
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {Object.entries(columnConfig).map(([columnId, config]) => (
//                 <div
//                   key={columnId}
//                   className={`${config.color} rounded-xl p-6 shadow-lg border-2 ${config.borderColor} min-h-[600px] transition-all duration-200`}
//                   onDragOver={handleDragOver}
//                   onDrop={(e) => handleDrop(e, columnId)}
//                 >
//                   <h2
//                     className={`text-xl font-semibold mb-4 ${config.textColor} flex items-center gap-2`}
//                   >
//                     <span
//                       className={`w-3 h-3 rounded-full ${config.borderColor.replace(
//                         "border-",
//                         "bg-"
//                       )}`}
//                     />
//                     {config.title}
//                     <span className="text-sm bg-white px-2 py-1 rounded-full">
//                       {filteredTasks[columnId]?.length || 0}
//                     </span>
//                   </h2>

//                   <div className="space-y-4 min-h-[500px]">
//                     {filteredTasks[columnId]?.map((task) => (
//                       <div
//                         key={task.id}
//                         draggable
//                         onDragStart={(e) => handleDragStart(e, task, columnId)}
//                         onDragEnd={handleDragEnd}
//                         className="bg-white rounded-lg p-4 shadow-md border border-slate-200 hover:shadow-lg transition-all cursor-move hover:scale-102 active:scale-98"
//                       >
//                         <div className="mb-3">
//                           <h3 className="font-semibold text-slate-800 mb-2">
//                             {task.title}
//                           </h3>
//                           <p className="text-sm text-slate-600 line-clamp-2">
//                             {task.description}
//                           </p>
//                         </div>

//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-2">
//                             <div className="relative w-8 h-8">
//                               <Image
//                                 src={task.assignedUser.avatar}
//                                 alt={task.assignedUser.name}
//                                 fill
//                                 className="rounded-full object-cover"
//                               />
//                             </div>
//                             <span className="text-sm text-slate-600">
//                               {task.assignedUser.name}
//                             </span>
//                           </div>

//                           <div className="relative group">
//                             <button className="p-1 rounded hover:bg-slate-100 transition-colors">
//                               <svg
//                                 className="w-4 h-4 text-slate-500"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
//                                 />
//                               </svg>
//                             </button>

//                             <div className="absolute right-0 top-8 bg-slate-100 rounded-lg shadow-lg border border-slate-200 py-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity z-10">
//                               <div className="px-3 py-1 text-xs text-slate-500 border-b">
//                                 Reassign to:
//                               </div>
//                               {users.map((user) => (
//                                 <button
//                                   key={user.name}
//                                   onClick={() =>
//                                     reassignTask(task.id, user, columnId)
//                                   }
//                                   className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2"
//                                 >
//                                   <div className="relative w-6 h-6">
//                                     <Image
//                                       src={user.avatar}
//                                       alt={user.name}
//                                       fill
//                                       className="rounded-full object-cover"
//                                     />
//                                   </div>
//                                   <span className="text-sm">{user.name}</span>
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Activity Log Panel */}
//         {showActivityPanel && (
//           <div className="fixed right-4 top-4 bottom-4 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-20 animate-in slide-in-from-right duration-300">
//             <div className="p-4 border-b border-slate-200 bg-slate-50">
//               <div className="flex items-center justify-between">
//                 <h3 className="font-semibold text-slate-800">Activity Log</h3>
//                 <button
//                   onClick={() => setShowActivityPanel(false)}
//                   className="p-1 rounded hover:bg-slate-200 transition-colors"
//                 >
//                   <svg
//                     className="w-5 h-5 text-slate-500"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             <div className="overflow-y-auto h-full pb-20">
//               {activityLog.map((activity, index) => (
//                 <div
//                   key={activity.id}
//                   className="p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors animate-in fade-in duration-300"
//                   style={{ animationDelay: `${index * 50}ms` }}
//                 >
//                   <div className="flex items-start gap-3">
//                     <div
//                       className={`w-2 h-2 rounded-full mt-2 ${
//                         activity.type === "move"
//                           ? "bg-blue-500"
//                           : activity.type === "assign"
//                           ? "bg-emerald-500"
//                           : "bg-slate-500"
//                       }`}
//                     />
//                     <div className="flex-1">
//                       <p className="text-sm text-slate-800">
//                         {activity.message}
//                       </p>
//                       <p className="text-xs text-slate-500 mt-1">
//                         {new Date(activity.timestamp).toLocaleTimeString()}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Toast Notifications */}
//       {toast && (
//         <div className="fixed bottom-4 right-4 bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg z-30 animate-in slide-in-from-bottom duration-300">
//           <div className="flex items-center gap-2">
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//             {toast.message}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default KanbanDashboard;

//---------------------------------------------------------------------------------------------------------

import Image from "next/image";
import { useState, useEffect } from "react";

const KanbanDashboard = () => {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  const [users, setUsers] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/getSettings");
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

  const [showActivityPanel, setShowActivityPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);

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
      await fetch("/api/saveSettings", {
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

      // Save reassignment to DB
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

      fetch("/api/saveSettings", {
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
      {/* Header remains unchanged */}

      <div className="max-w-7xl mx-auto relative">
        <div className="flex gap-6 overflow-x-auto pb-4">
          {/* Kanban Board */}
          <div
            className={`flex-1 transition-all duration-300 ${
              showActivityPanel ? "lg:pr-80" : ""
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                        <div className="mb-3">
                          <h3 className="font-semibold text-slate-800 mb-2">
                            {task.title}
                          </h3>
                          <p className="text-sm text-slate-600 line-clamp-2">
                            {task.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="relative w-8 h-8">
                              <Image
                                src={task.assignedUser.avatar}
                                alt={task.assignedUser.name}
                                fill
                                className="rounded-full object-cover"
                              />
                            </div>
                            <span className="text-sm text-slate-600">
                              {task.assignedUser.name}
                            </span>
                          </div>

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
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Log Panel */}
        {showActivityPanel && (
          <div className="fixed right-4 top-4 bottom-4 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-20 animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Activity Log</h3>
                <button
                  onClick={() => setShowActivityPanel(false)}
                  className="p-1 rounded hover:bg-slate-200 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="overflow-y-auto h-full pb-20">
              {activityLog.map((activity, index) => (
                <div
                  key={activity.id}
                  className="p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors animate-in fade-in duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "move"
                          ? "bg-blue-500"
                          : activity.type === "assign"
                          ? "bg-emerald-500"
                          : "bg-slate-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-slate-800">
                        {activity.message}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg z-30 animate-in slide-in-from-bottom duration-300">
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
  );
};

export default KanbanDashboard;
