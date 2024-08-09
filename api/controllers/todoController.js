// controllers/todoController.js
let { todos, currentId } = require('../models/todo');

// Créer une tâche
const createTodo = (req, res) => {
  const { text, completed } = req.body;
  if (typeof text !== 'string' || typeof completed !== 'boolean') {
    return res.status(400).send('Invalid data format');
  }
  const newTodo = { id: currentId++, text, completed };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

// Lire toutes les tâches
const getAllTodos = (req, res) => {
  res.json(todos);
};

// Lire une tâche spécifique
const getTodoById = (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).send('Todo not found');
  }
  res.json(todo);
};

// Mettre à jour une tâche
const updateTodo = (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).send('Todo not found');
  }
  const { text, completed } = req.body;
  if (typeof text !== 'string' || typeof completed !== 'boolean') {
    return res.status(400).send('Invalid data format');
  }
  todo.text = text;
  todo.completed = completed;
  res.json(todo);
};

// Supprimer une tâche
const deleteTodo = (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    return res.status(404).send('Todo not found');
  }
  const deletedTodo = todos.splice(todoIndex, 1);
  res.json(deletedTodo);
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo
};
