const User = require('../mongoDB/userModel')
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

module.exports = (app) => {

    //register
    app.post('/register', async (req, res) => {
        const { name, email, password } = req.body;
        try {
            let user = User.findOne({ email });
            if (user) return res.status(400).json({ message: 'user already exists' })

            const hashed = await bcrypt.hash(password, 10);
            user = new User({ name, email, password: hashed });
            await user.save();
            const token = generateToken(user._id);
            res.status(201).json({ user: { id: user._id, name, email }, token });
        } catch (error) {
            console.error('There was an error in registering the user: ', error);
            res.status(500).json({
                message: 'registration failed',
                error
            })
        }
    })

    //login
    app.post('login', async (req, res) => {
        const { email, password } = req.body;
        try {

            let user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'invalid credentials' });

            const isMatched = await bcrypt.compare(user.password, password);
            if (!isMatched) return res.status(400).json({ message: 'invalid credentials' });

            const token = generateToken(user._id);
            res.status(200).json({ user: { id: user._id, name: user.name, email }, token });
        } catch (error) {
            console.error('There was an error while logging in', error);
            res.status(500).json({ message: 'internal server error' });
        }
    })
}