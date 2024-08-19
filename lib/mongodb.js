// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // รับค่าจาก environment variables
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let clientPromise;

if (process.env.NODE_ENV === 'development') {
  clientPromise = globalThis.mongo || (globalThis.mongo = client.connect());
} else {
  clientPromise = client.connect();
}

export default clientPromise;
