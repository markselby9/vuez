var path = require('path');

var browsers = ['Chrome'];
// trvis env

if (process.env.TRAVIS) {
		browsers = ['Chrome_travis_ci'];
}

module.exports = function (config) {
		config.set({
				browsers: browsers,
				// custom launchers
				customLaunchers: {
						Chrome_travis_ci: {
								base: 'Chrome',
								flags: ['--no-sandbox']
						}
				},
				coverageReporter: {
						reporters: [
								{type: 'html', subdir: 'html'},
								{type: 'lcovonly', subdir: '.'},
						],
				},
				files: [
						'tests.webpack.js',
				],
				frameworks: [
						'jasmine',
				],
				preprocessors: {
						'tests.webpack.js': ['webpack', 'sourcemap'],
				},
				reporters: ['progress', 'coverage'],
				webpack: {
						cache: true,
						devtool: 'inline-source-map',
						module: {
								preLoaders: [
										{
												test: /\.spec.js$/,
												include: /test/,
												exclude: /(bower_components|node_modules)/,
												loader: 'babel',
												query: {
														cacheDirectory: true,
												},
										},
										{
												test: /\.js?$/,
												include: /src/,
												exclude: /(node_modules|bower_components|__tests__)/,
												loader: 'babel-istanbul',
												query: {
														cacheDirectory: true,
												},
										},
								],
								loaders: [
										{
												test: /\.js$/,
												include: path.resolve(__dirname, '../src'),
												exclude: /(bower_components|node_modules|__tests__)/,
												loader: 'babel',
												query: {
														cacheDirectory: true,
												},
										},
								],
						},
				},
		});
};
