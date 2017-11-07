const parseCookies = (req, res, next) => {
  let cookieJar = {};
  let cookieMatrix;
  if (req.headers.cookie) {
    let cookieSplit = req.headers.cookie.split('; ');
    cookieMatrix = cookieSplit
      .map(cookie => cookie = cookie.split('='))
      .forEach(line => {
        cookieJar[line[0]] = line[1];
      });
  }
  req.cookies = cookieJar;
  next();
};

module.exports = parseCookies;