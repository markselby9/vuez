var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;
const plugins = [];
if (NODE_ENV === 'production') {
		plugins.push(new LodashModuleReplacementPlugin);
}

module.exports = {
		module: {
				loaders: [{
						test: /\.js$/,
						exclude: /(bower_components|node_modules)/,
						loader: 'babel',
						options: {
								plugins: NODE_ENV === 'production' ? ['lodash'] : [],
								presets: ['es2015'],
						},
				}],
		},
		plugins,
		output: {
				libraryTarget: 'umd',
				library: 'vuez',
		},
		resolve: {
				extensions: [
						'',
						'.js',
				],
		},
};
