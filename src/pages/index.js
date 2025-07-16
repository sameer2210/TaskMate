import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Head>
        <title>TaskMate | Organize Your Work</title>
        <meta
          name="description"
          content="Collaborative Kanban board for task management"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-900 relative overflow-hidden">
        {/* Hero Section */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center px-6 text-center pt-16 pb-20 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
                Productivity
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Experience the future of task management with our intelligent
              Kanban board. Collaborate seamlessly, track progress effortlessly,
              and achieve more together.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/register"
                className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-2xl shadow-2xl hover:from-pink-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 hover:shadow-pink-500/25 flex items-center gap-2"
              >
                <span className="text-lg font-semibold">Start Free Trial</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>

              <Link
                href="/login"
                className="px-8 py-4 border-2 border-white/30 text-white rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 text-lg font-semibold hover:border-white/50"
              >
                Sign In
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Smart Organization
                </h3>
                <p className="text-gray-300">
                  Intelligent task categorization and priority management
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Team Collaboration
                </h3>
                <p className="text-gray-300">
                  Real-time updates and seamless team coordination
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-300 to-teal-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Progress Tracking
                </h3>
                <p className="text-gray-300">
                  Visual analytics and performance insights
                </p>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* To Do Column */}
                  <div className="bg-gradient-to-b from-red-500/20 to-red-600/20 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-4 flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      To Do
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                        <p className="text-white text-sm">
                          Design new homepage
                        </p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                        <p className="text-white text-sm">
                          Review user feedback
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* In Progress Column */}
                  <div className="bg-gradient-to-b from-yellow-500/20 to-yellow-600/20 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-4 flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      In Progress
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                        <p className="text-white text-sm">
                          Implement authentication
                        </p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                        <p className="text-white text-sm">
                          Database optimization
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Done Column */}
                  <div className="bg-gradient-to-b from-green-500/20 to-green-600/20 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-4 flex items-center">
                      <div className="w-3 h-3 bg-teal-500 rounded-full mr-2"></div>
                      Done
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                        <p className="text-white text-sm">Project setup</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                        <p className="text-white text-sm">User research</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
