// server.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/auth', authRouter);

// Cargar certificados
const key = fs.readFileSync(path.join(__dirname, 'certs', 'key.pem'));
const cert = fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'));

const port = process.env.PORT || 8443;
https.createServer({ key, cert }, app)
  .listen(port, '0.0.0.0', () => {
    console.log(`✅ HTTPS server running on https://0.0.0.0:${port}`);
    console.log(`👉 Accede desde otra PC: https://<TU_IP>:${port}`);
  });