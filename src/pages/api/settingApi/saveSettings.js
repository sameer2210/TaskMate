import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { boardData, users, activityLog } = req.body;

    // Validate input data
    if (!boardData || typeof boardData !== "object") {
      return res.status(400).json({ message: "Invalid boardData" });
    }

    if (!Array.isArray(activityLog)) {
      return res.status(400).json({ message: "Invalid activityLog" });
    }

    console.log("Saving settings:", { boardData, users, activityLog });

    const client = await connectToDatabase();
    const db = client.db("TaskMate");

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

    console.log("Settings saved successfully:", result);
    res.status(200).json({ message: "Settings saved successfully", result });
  } catch (error) {
    console.error("Error saving settings:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}
