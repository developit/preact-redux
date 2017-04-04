import config from './rollup.config';
const packageJson = require('./package.json');

config.entry = 'src/es6';
config.format = 'es';
config.exports = 'auto';
config.dest = packageJson['jsnext:main'];

export default config;
