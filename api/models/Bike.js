/**
 * Bike.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var uuid = require('node-uuid');


module.exports = {

  autoPK: false,
  autoCreatedAt: true,
  autoUpdatedAt: true,
  tableName: 'bikes',
  schema: true,

  attributes: {
    id: {
      type: 'string',
      primaryKey: true,
      unique: true,
      required: true,
      size: 36,
      defaultsTo: function(){ return uuid.v4(); }
    },

    serial: {
      type: 'string',
      size: 50,
      unique: true,
      required: true
    },

    brand: {
      type: 'string',
      size: 30,
      required: true
    },

    model: {
      type: 'string',
      size: 30,
      required: true
    },

    color: {
      type: 'string',
      size: 20,
      required: true
    },

    description: {
      type: 'text',
      required: true
    },

    diameterRim: {
      type: 'string',
      size: 5,
      required: true
    },

    diameterRimUnit: {
      type: 'string',
      size: 10,
      required: true
    },

    dateBought: {
      type: 'datetime',
      required: true
    },

    user: {
      model: 'user',
      required: true
    },

    device: {
      model: 'device'
    }
  }

};
