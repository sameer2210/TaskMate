import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("TaskMate");

    console.log("Connected to DB:", db.databaseName);

    const settings = await db
      .collection("settings")
      .findOne({ _id: "default-settings" });

    console.log("Settings found:", settings);

    if (!settings) {
      // Return empty settings structure if none found
      return res.status(200).json({
        boardData: { todo: [], inProgress: [], done: [] },
        activityLog: [],
      });
    }

    res.status(200).json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}
