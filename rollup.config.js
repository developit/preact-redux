import fs from 'fs';
import memory from 'rollup-plugin-memory';
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import es3 from 'rollup-plugin-es3';

var babelRc = JSON.parse(fs.readFileSync('.babelrc','utf8'));

var external = [
	'redux',
	'preact'
];

export default {
	exports: 'default',
	external: external,
	useStrict: false,
	plugins: [
		memory({
			path: 'src/index',
			contents: "import * as lib from './index'; export default lib;"
		}),
		{
			// This insane thing transforms Lodash CommonJS modules to ESModules. Doing so shaves 500b (20%) off the library size.
			load: function(id) {
				if (id.match(/\blodash\b/)) {
					return fs.readFileSync(id, 'utf8')
						.replace(/\b(?:var\s+)?([\w$]+)\s*=\s*require\((['"])(.*?)\2\)\s*[,;]/g, 'import $1 from $2$3$2;')
						.replace(/\bmodule\.exports\s*=\s*/, 'export default ');
				}
			}
		},
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
			presets: [
				['es2015', {
					loose: true,
					modules: false
				}]
			].concat(babelRc.presets.slice(1)),
			plugins: babelRc.plugins
		}),
		replace({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		es3()
	]
};
