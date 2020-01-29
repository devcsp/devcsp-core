import mongoose from 'mongoose';
import jobStatus from '../constants/jobStatus';

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: jobStatus.AVAILABLE,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Job', JobSchema);
