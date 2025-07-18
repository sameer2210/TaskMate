import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session, status } = useSession();

  const SignoutHandler = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className=" bg-gradient-to-tr from-slate-200 to-slate-300 shadow-sm px-8 py-7 flex justify-between items-center hover:border-b border-indigo-700 tracking-tight">
      <h1></h1>
      <nav>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <ul className="flex items-center space-x-8">
            <li>
              <span className="text-gray-700 ">
                Hello, {session.user?.name || session.user?.email}
              </span>
            </li>
            <li>
              <button
                onClick={SignoutHandler}
                className="text-red-500 font-mono font-semibold hover:underline"
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
