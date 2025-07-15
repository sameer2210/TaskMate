import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navigation = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>;
    };
    const SignoutHandler = async () => {
        await signOut({ callbackUrl: "/" });
    };

    return (
        <nav className="flex gap-5 mt-10">
            <Link href="/">Home</Link>
            {session ? (
                <>
                    <Link href="/profile">Profile</Link>
                    <Link href="/dashboard">Dashboard</Link>
                    <button onClick={SignoutHandler}>Signout</button>
                </>
            ) : (
                <>
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>
                </>
            )}
        </nav>
    );
};

export default Navigation;
