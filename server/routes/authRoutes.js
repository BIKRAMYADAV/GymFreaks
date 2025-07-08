const User = require('../mongoDB/userModel')
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

module.exports = (app) => {

    //register
    app.post('/register', async (req, res) => {
        console.log('The register is being hit')
        const { name, email, password } = req.body;
        try {
            console.log('not error')
            let user = User.findOne({ email });
            console.log('name: ', name)
            // if (user){
            //     return res.status(400).json({ message: 'user already exists' })
            // } 
              
            const hashed = await bcrypt.hash(password, 10);
            user = new User({ name, email, password: hashed });
            console.log('user: ', user);
            console.log(user)
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
    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        try {

            let user = await User.findOne({ email });
            console.log('user found: ', user);
            if (!user) return res.status(400).json({ message: 'invalid credentials' });

            const isMatched = await bcrypt.compare(password, user.password);
            console.log(isMatched)
            if (!isMatched) return res.status(400).json({ message: 'invalid credentials' });

            const token = generateToken(user._id);
            res.status(200).json({ user: { id: user._id, name: user.name, email }, token });
        } catch (error) {
            console.error('There was an error while logging in', error);
            res.status(500).json({ message: 'internal server error' });
        }
    })
}