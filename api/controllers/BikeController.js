/**
 * BikeController
 *
 * @description :: Server-side logic for managing bikes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/*
* ,
* */

module.exports = {

  find: function (req, res) {
    Bike.find().exec((err, bikes) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      return res.status(200).json({ bikes: bikes });
    });
  },

  findOne: function(req, res) {
    if (! res.params.id) {
      return res.status(400).json({ error: 'bikeId is required' });
    }

    Bike.findOne({ id: req.params.id }).exec((err, bike) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      return res.status(200).json({ bike: bike });
    });
  },

  findByUser: function(req, res) {
    if (! req.params.userId) {
      return res.status(401).json({ error: 'user is required' });
    }

    Bike.find({ user: req.params.userId }).exec((err, bikes) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      return res.status(200).json({ bikes: bikes });
    });
  },

  create: function (req, res) {
    Bike.create(req.body).exec((err, newBike) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      return res.status(200).json({ newBike: newBike });
    })
  },

  update: function (req, res) {
    Bike.findOne({ id: req.params.id }).exec((err, bike) => {
      if(err) {
        return res.status(500).json({ error: err });
      } else if (!bike) {
        return res.status(200).json({ message: "Bike not found with ID " + req.params.id });
      }

      let data = req.body;
      Bike.update({ id: req.params.id }, data).exec((err, bikeUpdated) => {
        if(err) {
          return res.status(500).json({ error: err });
        }

        return res.status(200).json({ bikeUpdated: bikeUpdated})
      });
    });
  },

  destroy: function(req, res) {
    Bike.findOne({ id: req.params.id }).exec((err, bike) => {
      if (err) {
        return res.status(500).json({ error: err });
      } else if (!bike) {
        return res.status(401).json({ message: 'Bike not found with ID ' + req.params.id });
      }

      Bike.destroy({ id: req.params.id }).exec((err) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        return res.status(200).json({ bikeDeleted: bike });
      });
    });
  }

};

