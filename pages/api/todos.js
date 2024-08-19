// pages/api/todos.js
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbName = 'myDatabase'; // เปลี่ยนเป็นชื่อฐานข้อมูลของคุณ

async function handler(req, res) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('todos');

  switch (req.method) {
    case 'GET':
      const todos = await collection.find({}).toArray();
      res.status(200).json(todos);
      break;
    case 'POST':
      const { text } = req.body;
      const result = await collection.insertOne({ text, completed: false });
      res.status(201).json(result.insertedId[0]);
      break;
    case 'PUT':
      const { id, newText, completed } = req.body;
      await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { text: newText, completed } }
      );
      res.status(200).json({ message: 'Todo updated' });
      break;
    case 'DELETE':
      const { deleteId } = req.body;
      await collection.deleteOne({ _id: new ObjectId(deleteId) });
      res.status(200).json({ message: 'Todo deleted' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
