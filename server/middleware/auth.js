const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  
  if (!req.cookies || !req.cookies.shortlyid) {
    // if no cookie, make session
    models.Sessions.create()
      .then(({insertId}) => models.Sessions.get({id: insertId}))
      .then(session => {
        req.session = session; 
        res.cookie('shortlyid', session.hash);
        next();
      })
      .catch((err) => {
        console.log(err);
      });
      
  } else {
    
    models.Sessions.get({hash: req.cookies.shortlyid })
      .then(session => {
        if (!session) {
          throw new Error('malicious session');
        }
        req.session = session;
        next();
      })
      .catch(() => {
        // if malicious
        models.Sessions.create() 
          .then(({insertId}) => models.Sessions.get({id: insertId}))
          .then(session => {
            res.cookie('shortlyid', session.hash);
            req.session = session; 
            next();
          });
      });
  }
  
  
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

