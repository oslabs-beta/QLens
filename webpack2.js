// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   mode: process.env.NODE_ENV,
//   entry: './public/index.js',
//   target: 'electron-renderer',
//   output: {
//     path: path.resolve(__dirname, '/build'),
//     filename: 'electron.js'
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './public/index.html'
//     })
//   ],
//   devServer: {
//     publicPath: '/build/',
//     proxy: {
//       '/api': 'http://localhost:3000',
//     }
//   },
//   node: {global: true},
//   module: {
//     rules: [
//       {
//         test: /\.jsx?/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react']
//           }
//         }
//       },
//       {
//         test: /\.s[ac]ss$/i,
//         use: [
//           // Creates `style` nodes from JS strings
//           process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : "style-loader",
//           // Translates CSS into CommonJS
//           "css-loader",
//           // Compiles Sass to CSS
//           "sass-loader",
//         ],
//       },
//     ]
//   }
// }


// "test": "echo \"Error: no test specified\" && exit 1",
// "start": "npm run build && electron ./dist/electron.js",
// "build": "NODE_ENV=production webpack",
// "build-windows": "cross-env NODE_ENV=production webpack",
// "windows": "concurrently \"cross-env NODE_ENV=development webpack-dev-server --open\" \"nodemon server/server.js\"",
// "dev": "NODE_ENV=development nodemon server/server.js & webpack serve --open --hot"

// "start": "npm run build && electron .",
// "dev:electron": "NODE_ENV=development webpack --config webpack.electron.config.js --mode development && electron .",
// "dev:react": "NODE_ENV=development webpack serve --config webpack.react.config.js --mode development",
// "build:electron": "NODE_ENV=production webpack --config webpack.electron.config.js --mode production",
// "build:react": "NODE_ENV=production webpack --config webpack.react.config.js --mode production",
// "build": "npm run build:electron && npm run build:react",
// "pack": "electron-builder --dir",
// "dist": "electron-builder"

// use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],