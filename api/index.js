require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');
const seedDefaultUser = require('./seeds/seedDefaultUser'); // Assurez-vous que le chemin est correct

const app = express();
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3001', // Remplacez par le domaine de votre application React
  optionsSuccessStatus: 200 // Pour les navigateurs anciens
};
app.use(cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Synchronisation de la base de données
sequelize.sync()
.then(() => {
    console.log('Database synchronized');
}).catch(err => console.log('Error: ' + err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
