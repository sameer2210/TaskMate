import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed md:relative z-10">
      <div className="p-6 text-xl font-bold border-b border-gray-700">Sidebar</div>
      <nav className="flex flex-col space-y-2 mt-4 px-4">
        <Link href="/" className="hover:bg-gray-700 px-4 py-2 rounded">Home</Link>
        <Link href="/dashboard" className="hover:bg-gray-700 px-4 py-2 rounded">Dashboard</Link>
        <Link href="/settings" className="hover:bg-gray-700 px-4 py-2 rounded">Settings</Link>
        <Link href="/profile" className="hover:bg-gray-700 px-4 py-2 rounded">Profile</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
