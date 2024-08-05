const router = require('express').Router();
const { User } = require('../../models');

// User signup route
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(201).json({
        user: {
          id: userData.id,
          email: userData.email,
        },
        message: 'User created successfully!',
      });
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(400).json({ message: 'Error creating user', error: err });
  }
});

// User login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      return res.status(401).json({ message: 'Incorrect email or password, please try again' });
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Incorrect email or password, please try again' });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({
        user: {
          id: userData.id,
          email: userData.email,
        },
        message: 'You are now logged in!',
      });
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(400).json({ message: 'Error logging in', error: err });
  }
});

// User logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).json({ message: 'No user is currently logged in.' });
  }
});

module.exports = router;
