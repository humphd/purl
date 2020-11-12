const prettier = require("prettier");

function applyDefaults(options) {
  return {
    printWidth: 80,
    tabWidth: 2,
    filepath: "index.html",
    ...options,
  };
}

function format(data, options = {}) {
  options = applyDefaults(options);
  return prettier.format(data, options);
}

module.exports.format = format;
module.exports.applyDefaults = applyDefaults;
