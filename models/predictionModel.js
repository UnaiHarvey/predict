// models/predictionModel.js
'use strict';

const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  dataId: { type: String, required: false },
  features: { type: [Number], required: true },
  prediction: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Esto crea la colección 'predictions' automáticamente
module.exports = mongoose.model('Prediction', predictionSchema);
