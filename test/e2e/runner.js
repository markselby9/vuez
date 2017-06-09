/* eslint-disable no-unused-expressions,no-var */
const spawn = require('cross-spawn');

var args = process.argv.slice(2);

const server = args.indexOf('--dev') > -1
    ? null
    : require('../../examples/server');

if (args.indexOf('--config') === -1) {
    args = args.concat(['--config', 'test/e2e/nightwatch.config.js']);
}
if (args.indexOf('--env') === -1) {
    args = args.concat(['--env', 'phantomjs']);
}
const i = args.indexOf('--test');
if (i > -1) {
    args[i + 1] = `test/e2e/specs/${args[i + 1]}`;
}
if (args.indexOf('phantomjs') > -1) {
    process.env.PHANTOMJS = true;
}

const runner = spawn('./node_modules/.bin/nightwatch', args, {
    stdio: 'inherit',
});

runner.on('exit', (code) => {
    server && server.close();
    process.exit(code);
});

runner.on('error', (err) => {
    server && server.close();
    throw err;
});
