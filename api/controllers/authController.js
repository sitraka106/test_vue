const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.signup = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        // return res.send({user: {name: user.name, role : user.role}});
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).send({ error: 'Invalid login credentials.' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.send({user: {name: user.name, role : user.role, lastname: user.lastname}, token });
    } catch (err) {
        return res.send({err});
        res.status(500).send(err);
    }
};