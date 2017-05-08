/**
 * DeviceController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  find: function (req, res) {
	  Device.find().exec((err, devices) => {
	    if(err) {
        return res.status(500).json({ error: err });
      }

      return res.status(200).json({ devices: devices });
    })
  },

  findOne: function (req, res) {
    if (!req.params.id) {
      return res.status(500).json({ error: 'Devices not found with ID ' + req.params.id });
    }

    Device.findOne({ id: req.params.id }).exec((err, devices) => {
      if(err) {
        return res.status(500).json({ error: err });
      }

      return res.status(200).json({ devices: devices });
    })
  },

  create: function (req, res) {
    Device.create(req.body).exec((err, newDevice) => {
      if(err) {
        return res.status(500).json({ error: err });
      }

      return res.status(200).json({ newDevice: newDevice });
    })
  },

  update: function (req, res) {
	  Device.findOne({ id: req.params.id }).exec((err, device) => {
	    if(err) {
        return res.status(500).json({ error: err });
      } else if(!device) {
        return res.status(401).json({ error: 'Device not found with ID ' + req.params.id });
      }

      data = req.body;
      Device.update({ id: req.params.id }, data).exec((err, updatedDevice) => {
        if(err) {
          return res.status(500).json({ error: err });
        }

        return res.status(200).json({ updatedDevice: updatedDevice });
      })
    });
  },

  destroy: function (req, res) {
    Device.findOne({ id: req.params.id }).exec((err, device) => {
      if(err) {
        return res.status(500).json({ error: err });
      } else if(!device) {
        return res.status(401).json({ error: "Device not found with ID " + req.params.id });
      }

      data = req.body;
      Device.destroy({ id: req.body.id }).exec((err) => {
        if(err) {
          return res.status(500).json({ error: err });
        }

        return res.status(200).json({ deletedDevice: device });
      })
    })
  }
};

