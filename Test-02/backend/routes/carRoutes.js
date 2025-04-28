const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

router.post('/', async (req, res) => {
  const car = new Car(req.body);
  await car.save();
  res.status(201).send(car);
});

router.get('/', async (req, res) => {
  const cars = await Car.find();
  res.send(cars);
});

module.exports = router;
