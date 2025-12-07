const { MongoClient } = require('mongodb');

async function runGetStarted() {
  // Replace the uri string with your connection string
  const uri = 'mongodb+srv://vijigishup:Vijigishu04@cluster0.ygt9i.mongodb.net/';
  const client = new MongoClient(uri);

  try {
    const database = client.db('task_manager');
    const movies = database.collection('tasks');

  } finally {
    await client.close();
  }
}
runGetStarted().catch(console.dir);
