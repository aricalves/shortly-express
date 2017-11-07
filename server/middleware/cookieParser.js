const parseCookies = (req, res, next) => {
  let cookieObj = {};
  let cookieMatrix;
  if (req.headers.cookie) {
    let cookieSplit = req.headers.cookie.split('; ');
    cookieMatrix = cookieSplit
      .map(cookie => cookie = cookie.split('='))
      .forEach(cookieLine => {
        cookieObj[cookieLine[0]] = cookieLine[1];
      });
  }
  req.cookies = cookieObj;
  next();
};

module.exports = parseCookies;