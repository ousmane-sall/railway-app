import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Erreur lors de la récupération des étudiants :', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Liste des étudiants</h1>
      <ul>
        {students.map((etudiant, index) => (
          <li key={index}>{etudiant.nom} {etudiant.prenom}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
