// import { MongoClient } from "mongodb";

// const uri = "mongodb://localhost:27017/TaskMate";
// const options = {};

// let client;
// let clientPromise;

// if (!global._mongoClientPromise) {
//   client = new MongoClient(uri, options);
//   global._mongoClientPromise = client.connect();
// }
// clientPromise = global._mongoClientPromise;

// export async function connectToDatabase() {
//   const client = await clientPromise;
//   return client;
// }

//---------------------------------------------------------------------------------------------------

import { MongoClient } from "mongodb";
export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://sameerkhan27560:3DHNZZjzye9Rjogp@cluster1.gxqbocb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"

  );
  return client;
}
