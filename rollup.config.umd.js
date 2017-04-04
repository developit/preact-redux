import config from './rollup.config';
const packageJson = require('./package.json');

config.entry = 'src/index';
config.format = 'umd';
config.exports = 'default';
config.dest = packageJson['main'];
config.moduleName = packageJson['amdName'];

export default config;
