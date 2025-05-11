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
  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Bienvenue à l'EPT</title>
      <style>
        body {
          background: linear-gradient(to right, #1e3c72, #2a5298);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          text-align: center;
        }
        .container {
          max-width: 800px;
          padding: 20px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
        h1 {
          font-size: 2.5em;
          margin-bottom: 0.5em;
        }
        p {
          font-size: 1.3em;
          line-height: 1.6;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Bienvenue sur le site de l’EPT !</h1>
        <p>Je vous souhaite la plus chaleureuse bienvenue sur le site personnel de Ousmane Sall, élève ingénieur à l’École Polytechnique de Thiès (EPT), la première école de formation d’ingénieurs de conception au Sénégal.</p>
      </div>
    </body>
    </html>
  `);
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
