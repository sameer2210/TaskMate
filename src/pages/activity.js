import { useEffect, useState } from "react";

export default function ActivityPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(""); // State for timestamp

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("/api/activityApi");
        const data = await res.json();

        // Ensure logs are an array
        const logsArray = Array.isArray(data.logs) ? data.logs : [];
        setLogs(logsArray.slice(0, 20)); // Only show last 20
      } catch (error) {
        console.error("Error fetching activity logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();

    // Set timestamp on client side with consistent locale
    setCurrentTime(new Date().toLocaleTimeString("en-US"));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-black to-emerald-950 bg-clip-text text-transparent mb-2">
            Activity Dashboard
          </h1>
          <p className="text-slate-600 text-lg">
            Recent activity logs and updates
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-xl overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-950 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold ">
                    Recent Activity
                  </h2>
                  <p className="text-emerald-900 text-sm">Last 20 entries</p>
                </div>
              </div>
              <div className="bg-white/90 px-4 py-2 rounded-full">
                <span className=" text-sm font-medium">
                  {logs.length} {logs.length === 1 ? "entry" : "entries"}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 ">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent mb-4"></div>
                <p className="text-slate-600 font-medium">
                  Loading activity logs...
                </p>
                <p className="text-slate-400 text-sm">Please wait a moment</p>
              </div>
            ) : logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="text-slate-600 font-medium text-lg mb-2">
                  No activity yet
                </p>
                <p className="text-slate-400 text-sm">
                  Activity logs will appear here once available
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
                {logs.map((log, index) => (
                  <div
                    key={log._id || log.id}
                    className="group relative bg-gradient-to-r from-slate-50 to-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 hover:scale-[1.01]"
                  >
                    {/* Activity Indicator */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-r-full opacity-60 group-hover:opacity-100 transition-opacity"></div>

                    {/* Log Number */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-semibold">
                      {index + 1}
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div className="text-slate-800 font-medium leading-relaxed pr-12">
                        {log.message}
                      </div>

                      <div className="flex items-center space-x-2 text-slate-500">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12,6 12,12 16,14"></polyline>
                        </svg>
                        <span className="text-sm font-medium">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-400 text-sm">
            Activity logs are automatically updated • Last refresh:{" "}
            {currentTime || "Loading..."}
          </p>
        </div>
      </div>
    </div>
  );
}
