// server.js
// Entry point del servicio PREDICT

const express = require("express");
const path = require("path");
const mongoose = require("mongoose"); // <-- (AÑADIDO)
const predictRoutes = require("./routes/predictRoutes");
const { initModel } = require("./services/tfModelService");

const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());

// Servir la carpeta del modelo TFJS (model/model.json + pesos)
const modelDir = path.resolve(__dirname, "model");
app.use("/model", express.static(modelDir));

// Rutas del servicio PREDICT
app.use("/", predictRoutes);

// Conexión a MongoDB (persistencia de predicciones)
// (CORREGIDO: eliminación de opciones obsoletas)
mongoose.connect("mongodb://localhost:27017/predictdb")
  .then(() => console.log("[PREDICT] MongoDB conectado"))
  .catch(err => console.error("[PREDICT] Error al conectar MongoDB:", err));

// Arranque del servidor + carga del modelo
app.listen(PORT, async () => {
  const serverUrl = `http://localhost:${PORT}`;
  console.log(`[PREDICT] Servicio escuchando en ${serverUrl}`);

  try {
    await initModel(serverUrl);
  } catch (err) {
    console.error("Error al inicializar modelo:", err);
    process.exit(1);
  }
});
