// const allowedCors = [
//   'https://praktikum.tk',
//   'http://praktikum.tk',
//   'localhost:3000',
// ];

// const cors = (req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     const requestHeaders = req.headers['access-control-request-headers'];

//     if (method === 'OPTIONS') {
//       res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//       res.header('Access-Control-Allow-Headers', requestHeaders);
//       return res.end();
//     }
//   }
//   return next();
// };

// // res.header('Access-Control-Allow-Origin', "*");

// module.exports = cors;
