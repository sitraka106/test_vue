// scripts/seedDefaultUser.js
const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Assurez-vous que le chemin est correct et que User est correctement exporté

const seedDefaultUser = async () => {
  try {
    // Vérifiez si un utilisateur avec cet e-mail existe déjà
    const existingAdmin = await User.findOne({ where: { email: 'admin@gmail.com' } });

    if (!existingAdmin) {
      // Créez un utilisateur par défaut
      const user = await User.create({
        name: 'Admin',
        lastname: 'istrator',
        email: 'admin@gmail.com',
        password: 'password', // Utilisez un mot de passe sécurisé pour la production
        role: 'admin',
      });

      console.log('Default user created:', user);
    } else {
      console.log('Default user already exists');
    }


    // Vérifiez si un utilisateur avec cet e-mail existe déjà
    const existingUser = await User.findOne({ where: { email: 'user@gmail.com' } });

    if (!existingUser) {
      // Créez un utilisateur par défaut
      const user = await User.create({
        name: 'User',
        lastname: 'Simple',
        email: 'user@gmail.com',
        password: 'password', // Utilisez un mot de passe sécurisé pour la production
        role: 'user',
      });

      console.log('Default user created:', user);
    } else {
      console.log('Default user already exists');
    }
  } catch (error) {
    console.error('Error creating default user:', error);
  }
};

// Exécuter le script lorsque ce fichier est invoqué
if (require.main === module) {
    seedDefaultUser().then(() => {
      process.exit(0);
    });
  }