/**
 * Tracker.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var uuid = require('node-uuid');

module.exports = {

  autoPK: false,
  autoCreatedAt: true,
  autoUpdatedAt: false,
  tableName: 'locations',
  schema: true,

  attributes: {
    id: {
      type: 'string',
      size: 36,
      primaryKey: true,
      required: true,
      defaultsTo: function() { return uuid.v4(); }
    },

    latitude: {
      type: 'string',
      size: 100,
      required: true
    },

    longitude: {
      type: 'string',
      size: 100,
      required: true
    },

    device: {
      model: 'device'
    },

    bike: {
      model: 'bike'
    }
  }
};

