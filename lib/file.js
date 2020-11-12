const fs = require('fs/promises');
const { parse, basename } = require('path');

// Must be a valid path
function validate(path) {
  try {
    return !!parse(path);
  } catch(err) {
    return false;
  }
}

// Expose a filename version of this
function toFilename(path) {
  return basename(path);
}

async function read(path) {
  if(!validate(path)) {
    throw new Error('invalid path');
  }

  const data = await fs.readFile(path, 'utf8');
  return {
    data,
    filepath: toFilename(path)
  }
}

module.exports.validate = validate;
module.exports.read = read;
module.exports.toFilename = toFilename
