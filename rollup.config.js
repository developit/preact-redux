import fs from 'fs';
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import es3 from 'rollup-plugin-es3';

var babelRc = JSON.parse(fs.readFileSync('.babelrc','utf8'));

var external = [
	'redux',
	'preact'
];

export default {
	exports: 'named',
	external: external,
	useStrict: false,
	plugins: [
		alias({
			'react-redux': 'node_modules/react-redux/src/index.js',
			'react': __dirname+'/src/compat.js',
			'invariant': __dirname+'/src/empty.js'
		}),
		nodeResolve({
			jsnext: true,
			module: true,
			skip: ['react', 'preact'],
			preferBuiltins: false
		}),
		commonjs({
			include: 'node_modules/**',
			exclude: [ 'node_modules/react-redux/**']
		}),
		babel({
			babelrc: false,
			presets: ['es2015-minimal-rollup'].concat(babelRc.presets.slice(1)),
			plugins: babelRc.plugins
		}),
		es3()
	]
};
