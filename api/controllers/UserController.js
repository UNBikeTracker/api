/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req, res) {
    User.find().exec((err, users) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      return res.status(200).json({ users: users });
    });
  },

  findOne: function(req, res) {
	  User.findOne({ id: req.params.id }).exec((err, user) => {
	    if (err) {
	      return res.status(500).json({ err: err});
      }

      if (user) {
	      return res.status(200).json({ user: user});
      } else {
        return res.status(200).json({ message: 'User not found with ID ' + req.params.id });
      }
    });
  },

  create: function(req, res) {
    return res.status(402).json({ error: 'Forbidden' });
  },

  update: function(req, res) {
    User.findOne({ id: req.params.id }).exec((err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      if (!user) {
        return res.status(401).json({ message: 'User not Found with ID ' + req.params.id });
      }

      let data = req.body;
      User.update({ id: req.params.id }, data).exec((err, userUpdated) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        return res.status(200).json({ userUpdated: userUpdated });
      });
    });
  },

  destroy: function(req, res) {
    User.findOne({ id: req.params.id }).exec((err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      if (! user) {
        return res.status(401).json({ message: 'User not Found with ID ' + req.params.id });
      }

      User.destroy({ id: req.params.id }).exec((err, userDeleted) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        return res.status(200).json({ userDeleted: userDeleted });
      });
    });
  }
};

