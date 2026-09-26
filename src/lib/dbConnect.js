import { MongoClient } from 'mongodb';
const client = new MongoClient(process.env.MONGO_URI);

const db_Name = process.env.DB_NAME

  export async function connectToMongoDB() {
  try {
    await client.connect();

    console.log("You successfully connected to MongoDB!");

    return client;
    
  } catch (err) {
    console.dir(err);
  }
}

export const dbConnect =(collectionName)=>{
    return client.db(db_Name).collection(collectionName)
}