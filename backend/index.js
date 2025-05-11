<<<<<<< HEAD
import express from 'express';
import dotenv from 'dotenv';
import pool from './db.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Route de test
app.get('/', (req, res) => {
  res.send('API is running 🚀, on est trop bon , on y va zoom');
});

// GET /users : Récupérer tous les utilisateurs
app.get('/users', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM users');
      res.json(rows);
    } catch (err) {
      console.error('Erreur SQL :', err); // 🔍 Détail de l'erreur
      res.status(500).json({ error: 'Database error' });
    }
  });
  
// POST /users : Ajouter un nouvel utilisateur
app.post('/users', async (req, res) => {
  const { nom, prenom } = req.body;
  if (!nom || !prenom) {
    return res.status(400).json({ error: 'Le nom et le prénom sont requis.' });
  }

  try {
    await pool.query(
      'INSERT INTO users (nom, prenom) VALUES ($1, $2)',
      [nom, prenom]
    );
    res.status(201).json({ message: 'Utilisateur ajouté avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erreur lors de l\'insertion en base de données' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
=======
import express from 'express';
import dotenv from 'dotenv';
import pool from './db.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Route de test
app.get('/', (req, res) => {
  res.send('API is running 🚀, on est trop bon , waya waya ya pas waya waya ept');
});

// GET /users : Récupérer tous les utilisateurs
app.get('/users', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM users');
      res.json(rows);
    } catch (err) {
      console.error('Erreur SQL :', err); // 🔍 Détail de l'erreur
      res.status(500).json({ error: 'Database error' });
    }
  });
  
// POST /users : Ajouter un nouvel utilisateur
app.post('/users', async (req, res) => {
  const { nom, prenom } = req.body;
  if (!nom || !prenom) {
    return res.status(400).json({ error: 'Le nom et le prénom sont requis.' });
  }

  try {
    await pool.query(
      'INSERT INTO users (nom, prenom) VALUES ($1, $2)',
      [nom, prenom]
    );
    res.status(201).json({ message: 'Utilisateur ajouté avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erreur lors de l\'insertion en base de données' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
>>>>>>> 52ba9809ee8b10b544271134ac3fac99e9ba9dfc
