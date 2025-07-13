import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-200 shadow-sm px-6 py-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">TaskMate</h1>
      <nav>
        <ul className="flex space-x-6">
          <li><Link href="/login" className="hover:underline">Login</Link></li>
          <li><Link href="/register" className="hover:underline">Register</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
