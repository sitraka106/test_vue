const express = require('express');
const taskController = require('../controllers/taskController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTask);
router.post('/', adminMiddleware, taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', adminMiddleware, taskController.deleteTask);

module.exports = router;