import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  try {
    const { name, email, password } = req.body;
    console.log("Incoming request:", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const client = await connectToDatabase();
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword
    });

    res
      .status(201)
      .json({ message: "User created!", userId: result.insertedId });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
