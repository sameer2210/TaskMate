import { getSession, useSession } from "next-auth/react";
import React from "react";

const Profile = () => {
    const { data: session, status } = useSession();

    return (
        <div>
            <h1>Profile</h1>
            <p>Email: {session?.user?.email}</p>
        </div>
    );
};

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    return {
        props: { session },
    };
}

export default Profile;
