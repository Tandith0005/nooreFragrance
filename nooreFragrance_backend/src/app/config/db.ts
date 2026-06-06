import { MongoClient, ServerApiVersion } from "mongodb";
import { envVars } from "./envVars";


const uri = envVars.DATABASE_URL;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectDB() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log(error);
  }
}