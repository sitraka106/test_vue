const { Task } = require('../models');

exports.getAllTasks = async (req, res) => {
    try {
        let tasks;
        if (req.user.role === 'admin') {
            tasks = await Task.findAll();
        } else {
            tasks = await Task.findAll({ where: { Pid_person: req.user.id } });
        }
        res.send(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Affiche une tâche spécifique (si elle appartient à l'utilisateur connecté)
exports.getTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).send({ error: 'Task not found.' });
        }

        // Vérifie si l'utilisateur est le propriétaire de la tâche ou un admin
        if (req.user.role !== 'admin' && task.Pid_person !== req.user.id) {
            return res.status(403).send({ error: 'Access denied.' });
        }

        res.send(task);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send(task);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Met à jour une tâche (l'utilisateur connecté doit être le propriétaire)
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).send({ error: 'Task not found.' });
        }

        // Vérifie si l'utilisateur est le propriétaire de la tâche ou un admin
        if (req.user.role !== 'admin' && task.Pid_person !== req.user.id) {
            return res.status(403).send({ error: 'Access denied.' });
        }

        // Si c'est un utilisateur normal, il ne peut modifier que le statut de la tâche
        if (req.user.role !== 'admin') {
            if (req.body.status) {
                task.status = req.body.status;
                await task.save();
            } else {
                return res.status(403).send({ error: 'You can only update the status of your task.' });
            }
        } else {
            await task.update(req.body);
        }

        res.send(task);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).send({ error: 'Task not found.' });
        }
        await task.destroy();
        res.send({ message: 'Task deleted successfully.' });
    } catch (err) {
        res.status(500).send(err);
    }
};