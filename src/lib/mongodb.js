import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/TaskMate";
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

//---------------------------------------------------------------------------------------------------

// import { MongoClient } from "mongodb";

// let cached = global.mongo || { conn: null, promise: null };

// export async function connectToDatabase() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     const uri = "mongodb+srv://sameerkhan27560:3DHNZZjzye9Rjogp@cluster1.gxqbocb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
//     if (!uri) throw new Error("MONGODB_URI is not defined");

//     cached.promise = MongoClient.connect(uri, {
//       tls: true,                                      //  Ensures SSL for MongoDB Atlas
//     }).then((client) => client);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// if (process.env.NODE_ENV !== "production") global.mongo = cached;
