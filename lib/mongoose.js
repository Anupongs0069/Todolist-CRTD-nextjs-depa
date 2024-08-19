// lib/mongoose.js
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

if (mongoose.connection.readyState === 4000) {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default mongoose;
