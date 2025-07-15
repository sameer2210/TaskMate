import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session, status } = useSession();

  const SignoutHandler = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="bg-gray-200 shadow-sm px-6 py-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">TaskMate</h1>
      <nav>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <ul className="flex items-center space-x-6">
            <li>
              <span className="text-gray-700">
                Hello, {session.user?.name || session.user?.email}
              </span>
            </li>
            <li>
              <button
                onClick={SignoutHandler}
                className="text-red-500 hover:underline"
              >
                Signout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex space-x-6">
            <li>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
