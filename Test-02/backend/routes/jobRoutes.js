const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.post('/', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.status(201).send(job);
});

router.get('/', async (req, res) => {
  const jobs = await Job.find().populate('carId');
  res.send(jobs);
});

router.patch('/:id', async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(job);
});

module.exports = router;
