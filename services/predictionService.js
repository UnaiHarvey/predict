// services/predictionService.js
'use strict';

const Prediction = require('../models/predictionModel');

async function guardarPrediccion(dataId, features, prediction) {
  try {
    const record = await Prediction.create({
      dataId,
      features,
      prediction
    });

    return record;  // contiene _id
  } catch (err) {
    throw new Error("Error al guardar la predicción: " + err.message);
  }
}

module.exports = {
  guardarPrediccion
};
