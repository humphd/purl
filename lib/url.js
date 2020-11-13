const got = require("got");

// Must be a valid http:// or https:// based URL
function validate(url) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch (err) {
    return false;
  }
}

async function read(url) {
  if (!validate(url)) {
    throw new Error("invalid url");
  }

  const response = await got(url);
  return '';
}

module.exports.validate = validate;
module.exports.read = read;
