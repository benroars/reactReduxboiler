import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import express from 'express';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import webpackConfig from '../webpack.config';
import environment from 'dotenv';

const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = !isProduction;

const app = express();

// Webpack dev server
if (isDeveloping) {
  environment.config({ path: './env/development.env' });
  const WEBPACK_PORT = 3001;
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  }));

  app.use(webpackHotMiddleware(compiler));
  app.listen(WEBPACK_PORT, 'localhost', (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(`WebpackDevServer listening at localhost:${WEBPACK_PORT}`);
  });
} else {
  environment.config({ path: './env/production.env' });
}

const publicPath = path.resolve(__dirname, '../');
app.use(bodyParser.json({ type: 'application/json' }))
app.use(express.static(publicPath));

const port = isProduction ? (process.env.PORT || 80) : 3000;

// RESTapi Routes
require('./routes/auth-routes.js')(app);
require('./routes/api-routes.js')(app);

// Used to handle URL correctly since client uses Browser History
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../', 'index.html'));
})

// We need to use basic HTTP service to proxy websocket requests from webpack
const server = http.createServer(app);

server.listen(port, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server running on port  ${port}`);
});

