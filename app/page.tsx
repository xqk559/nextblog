import { ObjectId } from 'bson';

export default function Home() {
  
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = "mongodb+srv://xqk559:zU46UV72xEoyOQVW@blogdatabase.gjdztb0.mongodb.net/?retryWrites=true&w=majority&appName=blogdatabase";

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  let userName: string = '';

  const getUserData = async () => {
    try {
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      const db = client.db("sample_mflix");
      const coll = db.collection("users");
      const cursor = coll.find({ name : 'Ned Stark' });
      await cursor.forEach((element: any) => userName = element.name);
      
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
    
    return userName;
    };
  
  const name = getUserData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div class="text-purple">
        This ought to be purple
      </div>
      {name}
    </main>
  );
}
