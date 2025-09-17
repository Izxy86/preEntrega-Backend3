import { Router } from 'express';
import { generateMockUsers } from '../utils/user.mocking.js';
import { generateMockPets } from '../utils/pet.mocking.js';
import UserModel from '../dao/models/user.model.js';
import PetModel from '../dao/models/pet.model.js';

const router = Router();

// GET /mockingpets
router.get('/mockingpets', (req, res) => {
  const pets = generateMockPets(100);
  res.status(200).json(pets);
});

// GET /mockingusers
router.get('/mockingusers', (req, res) => {
  const users = generateMockUsers(50);
  res.status(200).json(users);
});

// POST /generateData
router.post('/generateData', async (req, res) => {
  const { users: numUsers, pets: numPets } = req.body;

  if (!numUsers || !numPets) {
    return res.status(400).json({ error: 'Debes especificar el número de usuarios y mascotas.' });
  }

  try {
    const usersToInsert = generateMockUsers(numUsers);
    await UserModel.insertMany(usersToInsert);

    const petsToInsert = generateMockPets(numPets);
    await PetModel.insertMany(petsToInsert);

    res.status(201).json({
      message: `${numUsers} usuarios y ${numPets} mascotas generados e insertados con éxito.`,
    });
  } catch (error) {
    console.error('Error al generar e insertar datos:', error);
    res.status(500).json({ error: 'Error al generar e insertar datos.' });
  }
});

export default router;
