import express from 'express';
import mongoose from 'mongoose';
import mocksRouter from './routes/mocks.router.js';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());

dotenv.config();


app.use('/api/mocks', mocksRouter);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a Mongo');
    app.listen(8080, () => console.log('Servidor corriendo en puerto 8080'));
  })
  .catch(err => console.error('Error al conectar a Mongo:', err));
