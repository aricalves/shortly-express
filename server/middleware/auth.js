const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  
  if (!req.cookies || !req.cookies.shortlyid) {
    models.Sessions.create()
      .then(({insertId}) => models.Sessions.get({id: insertId}))
      .then(session => {
        req.session = session; 
        res.cookies = {
          shortlyid: {
            value: session.hash
          }
        };
        session.userId = 1; // sessions.id
        session.user = { username: 'BillZito'}; // req.body.username
        next();
      })
      .catch((err) => {
        console.log(err);
      });
      
  } else {
    
    models.Sessions.get({hash: req.cookies.shortlyid })
      .then(session => {
        req.session = session;
        next();
      })
      .catch(() => {
        models.Sessions.create() 
          .then(({insertId}) => models.Sessions.get({id: insertId}))
          .then(session => {
            res.cookies = {
              shortlyid: {
                value: session.hash
              }
            };
            req.session = session; 
            next();
          });
      });
  }
  
  
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

