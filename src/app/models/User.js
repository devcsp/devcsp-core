import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    select: true,
    required: true,
  },
  role: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async (next) => {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

export default mongoose.model('User', UserSchema);
