import "server-only"

import { MongoClient, ServerApiVersion, Db, Collection, Document } from "mongodb"

if (!process.env.DB_URI) {
  throw new Error("Mongo URI not found!")
}

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

async function connectToDatabase() {
  // If we have both cached client and db, return them
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    // Connect to MongoDB if not already connected
    if (!cachedClient) {
      cachedClient = await client.connect()
      console.log(">>>> Connected to MongoDB <<<<")
    }
    
    // Get the database instance
    cachedDb = cachedClient.db("bloggers_blog_db")
    
    return { client: cachedClient, db: cachedDb }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    // Reset cached values on error
    cachedClient = null
    cachedDb = null
    throw error
  }
}

export async function getCollection<T extends Document>(
  collectionName: string
): Promise<Collection<T>> {
  const { db } = await connectToDatabase()
  return db.collection<T>(collectionName)
}