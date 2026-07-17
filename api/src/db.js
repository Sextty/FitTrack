import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB || "fittrack";

let clientPromise;

export function getClient() {
  if (!clientPromise) clientPromise = new MongoClient(uri).connect();
  return clientPromise;
}

export async function workouts() {
  const client = await getClient();
  return client.db(dbName).collection("workouts");
}
