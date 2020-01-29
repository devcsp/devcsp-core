import * as Yup from 'yup';
import Job from '../models/Job';
import jobStatus from '../constants/jobStatus';

class JobController {
  async store(req, res) {}

  async getJobByStatus(req, res) {
    const { status } = req.query;

    if (!status) {
      return res.status(400).json({ error: 'Missing job status.' });
    }

    if (!(status in jobStatus)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }

    const jobs = await Job.find({ status });
    return res.json(jobs);
  }
}

export default new JobController();
