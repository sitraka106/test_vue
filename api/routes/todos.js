const express = require('express');
const router = express.Router();
const {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader === 'Bearer mysecrettoken') {
    next(); // L'utilisateur est authentifié, continuer
  } else {
    res.status(401).send('Unauthorized');
  }
};
// Définition des routes
router.post('/'/*, authMiddleware*/, createTodo);
router.get('/'/*, authMiddleware*/, getAllTodos);
router.get('/:id',/* authMiddleware,*/ getTodoById);
router.put('/:id', /*authMiddleware,*/ updateTodo);
router.delete('/:id',/* authMiddleware,*/ deleteTodo);

module.exports = router;
