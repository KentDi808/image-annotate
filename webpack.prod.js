var config = {
	entry: './source/index.js',

	output: {
		path: __dirname + '/production',
		filename: 'index.js',
	},

	devServer: {
		inline: true,
		port: 8080
	},
	
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				query: {
					presets: [['env', {'targets': {'browsers': ['last 2 versions']}}], 'react', 'stage-0'],
					plugins: ['transform-decorators-legacy']
				}
			}
		]
	}
}

module.exports = config;