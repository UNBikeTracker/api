/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  // Auth URLs
  'POST /auth/signin': 'AuthController.signin',
  'POST /auth/signup': 'AuthController.signup',
  'POST /auth/check': 'AuthController.check',
  'POST /auth/forgot': 'AuthController.forgot',
  'POST /auth/logout': 'AuthController.logout',

  // Bike URLs
  'GET /bike': 'BikeControler.find',
  'GET /bike/{id}': 'BikeControler.findOne',
  'GET /bike/{userId}': 'BikeControler.findByUser',
  'POST /bike': 'BikeControler.create',
  'PUT /bike/{id}': 'BikeControler.update',
  'DELETE /bike/{id}': 'BikeControler.destroy',

  // Device URLs
  'GET /device': 'DeviceController.find',
  'GET /device/{id}': 'DeviceController.findOne',
  'POST /device': 'DeviceController.create',
  'PUT /device/{id}': 'DeviceController.update',
  'DELETE /device/{id}': 'DeviceController.destroy',

  // Location URLs
  'GET /location': 'LocationController.find',
  'GET /location/{id}': 'LocationController.findOne',
  'POST /location': 'LocationController.create',
  'PUT /location/{id}': 'LocationController.update',
  'DELETE /location/{id}': 'LocationController.destroy',

  // User URLs
  'GET /user': 'UserController.find',
  'GET /user/{id}': 'UserController.findOne',
  'PUT /user/{id}': 'UserController.update',
  'DELETE /user/{id}': 'UserController.destroy'

};
