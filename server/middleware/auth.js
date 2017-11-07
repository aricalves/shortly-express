const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (!req.cookie) {
    models.Sessions.create()
      .then(({insertId}) => models.Sessions.get({id: insertId}))
      .then(session => {
        req.session = session;
        res.cookies = {
          shortlyid: {
            value: session.hash
          }
        };
        next();
      })
      .catch(err => console.log(err));
  }
  
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

