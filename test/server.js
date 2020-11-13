//www.npmjs.com/package/serve-static#serve-files-with-vanilla-nodejs-http-server
const finalhandler = require("finalhandler");
const http = require("http");
const serveStatic = require("serve-static");

// Serve test/ folder
const serve = serveStatic("test", { index: ["index.html", "index.htm"] });

const server = http.createServer(function onRequest(req, res) {
  serve(req, res, finalhandler(req, res));
});

module.exports = {
  start: (port) => server.listen(port || 3333),
  stop: () => server.close(),
};
