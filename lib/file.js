const fs = require("fs").promises;
const { parse } = require("path");

// Must be a valid path
function validate(path) {
  // Technically, this is valid, but we can't use it
  if (path === "") return false;

  try {
    return !!parse(path);
  } catch (err) {
    return false;
  }
}

async function read(path) {
  if (!validate(path)) {
    throw new Error("invalid path");
  }

  const data = await fs.readFile(path, "utf8");
  return data;
}

module.exports.validate = validate;
module.exports.read = read;
