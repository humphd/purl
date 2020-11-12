const file = require("./file");
const url = require("./url");
const prettyPrinter = require("./pretty-printer");

// Accept a URI: URL or file path
function read(uri) {
  if (url.validate(uri)) {
    return url.read(uri);
  }

  if (file.validate(uri)) {
    return file.read(uri);
  }

  throw new Error("invalid uri");
}

async function processUri(uri, width, indent) {
  try {
    const data = await read(uri);

    if (data) {
      const options = { printWidth: width, tabWidth: indent };
      const formatted = prettyPrinter.format(data, options);
      console.log(formatted);
    }
  } catch (err) {
    console.error(`Error processing ${uri}: ${err.message}`);
  }
}

module.exports.processUri = processUri;
