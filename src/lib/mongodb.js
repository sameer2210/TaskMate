import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI_PRODUCTION;
// const uri = "mongodb://localhost:27017/TaskMate";
const options = {};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function connectToDatabase() {
  const client = await clientPromise;
  return client;
}
