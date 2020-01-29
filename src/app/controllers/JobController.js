import * as Yup from 'yup';
import Job from '../models/Job';
import jobStatus from '../constants/jobStatus';

class JobController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      company: Yup.string().required(),
      contactEmail: Yup.string().required(),
      contactPhone: Yup.string().required(),
    });

    const isValidSchema = await schema.isValid(req.body);
    if (!isValidSchema) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const jobCreated = await Job.create(req.body);
    return res.json(jobCreated);
  }

  async updateJob(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      company: Yup.string(),
      contactEmail: Yup.string(),
      contactPhone: Yup.string(),
      status: Yup.string().oneOf([
        jobStatus.AVAILABLE,
        jobStatus.CLOSED,
        jobStatus.CLOSED,
        jobStatus.CLOSED_BY_HIRING,
        jobStatus.WAITING_CONFIRMATION,
      ]),
    });

    const isValidSchema = await schema.isValid(req.body);
    if (!isValidSchema) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({ error: 'Missing jobId.' });
    }

    const jobToUpdate = await Job.findById(jobId);
    if (!jobToUpdate) {
      return res.status(400).json({ error: 'Job not found.' });
    }

    await jobToUpdate.updateOne(req.body);
    return res.json();
  }

  async getJobById(req, res) {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({ error: 'Missing jobId.' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).error({ error: 'Job not found. ' });
    }

    return res.json(job);
  }

  async getJobByStatus(req, res) {
    const { status } = req.query;

    if (!status) {
      const allJobs = await Job.find();
      return res.json(allJobs);
    }

    if (!(status in jobStatus)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }

    const jobsByStatus = await Job.find({ status });
    return res.json(jobsByStatus);
  }

  async updateJobViews(req, res) {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({ error: 'Missin jobId.' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({ error: 'Job not found.' });
    }

    job.views += 1;
    await job.save();

    return res.json();
  }
}

export default new JobController();
