import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <p className="p-6">Loading...</p>;

  if (!session || !session.user) {
    return (
      <div className="p-4 sm:p-6 max-w-xl mx-auto shadow-2xl rounded ">
        <h1 className="text-xl font-semibold text-red-500">
          Session not found
        </h1>
        <p>Please try logging in again.</p>
      </div>
    );
  }
  return (
    <div className="p-4 mt-3 sm:p-6 max-w-xl bg-teal-50 mx-auto shadow-2xl rounded ">
      <h1 className="text-lg">Name: {session.user.name}</h1>
      <p className="text-lg">Email: {session.user.email}</p>

      <p className="text-sm text-gray-500 mt-2">
        Session Expires: {session.expires}
      </p>
    </div>
  );
};

export default Profile;
