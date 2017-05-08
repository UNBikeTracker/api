/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	signin: function(req, res) {
    let username, password;

    if (req.body) {
      username = req.body.username;
      password = req.body.password;
    }

    if (!username || !password) {
      return res.status(401).json({ error: 'Username and Password are required.' });
    }

    User.findOne({ username: username }).exec((err, user) => {

      if (!user) {
        return res.status(401).json({ message: 'Username or Password invalid.' });
      }

      user.comparePassword(password, function(err, valid) {
        if (err) {
          return res.status(401).json({ error: err });
        }

        if (! valid) {
          return res.status(401).json({ message: 'Username or Password invalid.' });
        } else {

          let security = Math.random().toString(36).slice(2);
          let payload = user.id + '_' + security;

          token = TokenAuth.generateToken({ id: payload });
          let expired = new Date();
          expired.setHours(expired.getHours() + 1);

          Auth.create({
            userId: user.id,
            token: token,
            expiredAt: expired
          }).exec((err, newAuth) => {
            return res.status(200).json({
              user: user,
              token: token
            });
          });
        }
      });
    });
  },

  signup: function(req, res) {

    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, { error: 'Passwords doesn\'t match.' });
    }

    User.create(req.body).exec((err, newUser) => {
      if (err) {
        sails.log(err);
        return res.status(500).json({ error: err });
      }

      return res.status(200).json({ newUser: newUser });
    });

  },

  forgot: function(req, res) {
    return res.json({ res: 'Forgot works!' });
  },

  check: function(req, res) {
    let token;

    if (req.body) {
      token = req.body.token;
    }

    if (!token) {
      return res.status(401).json({ error: 'Token is required' });
    }

    Auth.findOne({ token: token }).exec((err, auth) => {

      if (err) {
        return res.status(401).json({error: err});
      }

      if (!auth) {
        return res.status(401).json({ error: 'Token is not valid.' });
      }

      now = new Date();
      if (now > auth.expiredAt) {

        Auth.destroy({ sessionId: auth.sessionId }).exec((err) => {
          if (err) {
            return res.status(401).json({ error: err });
          }

          return res.json({ error: 'Token expired.' });
        });
      } else {
        let expired = new Date();
        expired.setHours(expired.getHours() + 1);

        auth.expiredAt = expired;
        auth.save();

        return res.status(200).json({ message: 'Valid Token' });
      }
    });
  },

  logout: function(req, res) {

      let token;

      if (req.body) {
        token = req.body.token;
      }

      if (!token) {
        return res.status(401).json({ error: 'Token is required' });
      }

      Auth.findOne({ token: token }).exec((err, auth) => {
        if (err) {
          return res.status(401).json({ error: err });
        }

        if (! auth) {
          return res.status(401).json({ error: 'Token is not valid.' });
        }

        Auth.destroy({ token: token }).exec((err) => {
          if (err) {
            return res.status(401).json({ error: err });
          }

          return res.status(200).json({ message: 'Auth removed' });

        });
      });
  }

};
