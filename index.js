const { processUri } = require('./lib/resource');

const argv = require('yargs')
  .scriptName('purl')
  .usage('$0 <args> uri [...uri]')
  .option('w', {
    describe: 'max width of final output',
    alias: 'width',
    default: 80,
    type: 'number'
  })
  .option('i', {
    describe: 'indent width for each line',
    alias: 'indent',
    default: 2,
    type: 'number'
  })
  // We expect to get 1 or more URLs
  .demandCommand(1)
  .help()
  .argv;

async function main(uris, width, indent) {
  await Promise.all(uris.map(uri => processUri(uri, width, indent)));
  process.exit();
}

main(argv._, argv.width, argv.indent);
