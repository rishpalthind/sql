const express = require('express');
const sequelize = require('./database'); // Adjust the path as needed
const User = require('./models/user.js'); // Adjust the path as needed

const app = express();
app.use(express.json());

app.get('/', function (req, res) {
    res.send('App running');
});

// Sync the database models (create tables) and start the server
sequelize.sync()
  .then(() => {
    app.listen(5005, () => {
      console.log('Server is running on port 5005');
    });
  })
  .catch((error) => {
    console.error('Database synchronization error:', error);
  });

app.post("/users", async (req, res) => {
    const { name, rollNo, course, password } = req.body;
    try {
        const user = await User.create({ name, rollNo, course, password });
        return res.status(201).json(user);
    } catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ error: 'User creation failed' });
    }
});
