/**
 * TrackerController
 *
 * @description :: Server-side logic for managing trackers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  find: function(req, res) {
    Location.find().exec((err, locations) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      return res.status(200).json({ locations: locations });
    });
  },

  findOne: function(req, res) {
    if (!req.params.id) {
      return res.status(401).json({ err: 'locationId is required' });
    }

    Location.findOne({ id: req.params.id }).exec((err, location) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      return res.status(200).json({ location: location });
    });
  },

  create: function(req, res) {
    Location.create(req.body).exec((err, newLocation) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      return res.status(201).json({ newLocation: newLocation });
    });
  },

  update: function(req, res) {
    if (!req.params.id) {
      return res.status(401).json({ error: 'locationId is required' });
    }

    Location.findOne({ id: req.params.id }).exec((err, location) => {
      if (err) {
        return res.status(500).json({ error: err });
      } else if (!location) {
        return res.status(401).json({ error: 'Location not found with ID ' + req.params.id });
      }

      let data = req.body;
      Location.update({ id: req.params.id }, data).exec((err, updatedLocation) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        return res.status(200).json({ updatedLocation: updatedLocation });
      });
    });
  },

  destroy: function (req, res) {
    if (!req.params.id) {
      return res.status(401).json({ error: 'LocationId is required' });
    }

    Location.findOne({ id: req.params.id }).exec((err, location) => {
      if (err) {
        return res.status(500).json({ error: err });
      } else if (!location) {
        return res.status(401).json({ error: 'Location not found with ID ' + req.params.id });
      }

      Location.destroy({ id: req.params.id }).exec((err) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        return res.status(200).json({ deletedLocation: location });
      });
    });
  }
};

