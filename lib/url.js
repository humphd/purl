const got = require('got');

// Must be a valid http:// or https:// based URL
function validate(url) {
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch(err) {
    return false;
  }
}

// Expose a filename version of this url
function toFilename(url) {
  const { pathname } = new URL(url);

  // Deal with missing pathname when getting index page
  if(pathname === '' || pathname.endsWith('/')) {
    return 'index.html';
  }

  return pathname;
}

async function read(url) {
  if(!validate(url)) {
    throw new Error('invalid URL');
  }

  const response = await got(url);
  return {
    data: response.body,
    filepath: toFilename(url)
  }
}

module.exports.validate = validate;
module.exports.read = read;
module.toFilename = toFilename;
