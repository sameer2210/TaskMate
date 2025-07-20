// pages/api/activityApi.js
import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await connectToDatabase();
    const db = client.db("TaskMate");

    // Get the single document with _id: "default-settings"
    const settingsDoc = await db.collection("settings").findOne({ _id: "default-settings" });

    if (!settingsDoc || !Array.isArray(settingsDoc.activityLog)) {
      return res.status(404).json({ logs: [] }); // no activity yet
    }

    // Sort by timestamp DESC
    const sortedLogs = settingsDoc.activityLog
      .slice()
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.status(200).json({ logs: sortedLogs.slice(0, 20) }); // ✅ Return under `logs`
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
