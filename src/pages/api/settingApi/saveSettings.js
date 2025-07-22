import { connectToDatabase } from "@/lib/mongodb";
import { toast } from "react-toastify";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { boardData, users, activityLog } = req.body;

    const client = await connectToDatabase();
    const db = client.db(); // default DB: TaskMate (from URI)

    const result = await db.collection("settings").updateOne(
      { _id: "default-settings" }, // constant ID
      {
        $set: {
          boardData,
          users,
          activityLog,
          updatedAt: new Date(),
        },
      },
      { upsert: true } // if not found, insert new
    );

    res.status(200).json({ message: "Settings saved successfully", result });
    toast.success("Settings saved successfully!");
  } catch (error) {
    console.error("Error saving settings:", error);
    toast.error("Failed to save settings. Please try again.");
    res.status(500).json({ message: "Internal Server Error", error });
  }
}
