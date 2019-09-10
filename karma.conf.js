module.exports = function(config) {
	config.set({
		frameworks: ['mocha', 'chai-sinon', 'source-map-support'],
		reporters: ['mocha'],
		browsers: ['PhantomJS'],

		files: ['test/**/*.js'],

		preprocessors: {
			'{src,test}/**/*.js': ['webpack', 'sourcemap'],
			'test/**/*.js': ['sourcemap']
		},

		webpack: {
			mode: "development",
			module: {
				rules: [{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				}]
			},
			resolve: {
				alias: {
					src: __dirname+'/src'
				}
			},
			devtool: 'inline-source-map'
		},

		webpackMiddleware: {
			noInfo: true
		}
	});
};
