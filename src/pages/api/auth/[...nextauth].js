import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt", //  modern approach
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        console.log(" Login Attempt:", email, password);

        if (!email || !password) {
          throw new Error("All fields are required.");
        }

        const client = await connectToDatabase();
        const db = client.db("TaskMate");

        console.log(" Connected to DB:", db.databaseName); // log DB name

        const users = await db.collection("users").find().toArray();
        console.log(" Users in DB:", users);

        const user = await db
          .collection("users")
          .findOne({ email: email.toLowerCase() });
        console.log(" User Found:", user);

        // const user = await db.collection("users").findOne({ email });

        if (!user) {
          throw new Error("No user found with this email.");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid credentials.");
        }

        //  Only return the data you want to store in the session
        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
