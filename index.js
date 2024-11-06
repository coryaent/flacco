const http = require('node:http');
const { createProxyMiddleware } = require('http-proxy-middleware');

const options = {
  target: `"${process.env.FLACCO_M3DB_TARGET}"`,
  pathRewrite: {
    '^/': '/api/v1/influxdb/', // add base path
  },
  changeOrigin: true,
  logger: console,
  on: {
    error(err, req, res) {
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      res.end('Something went wrong.');
    },
  }
};

const apiProxy = createProxyMiddleware(options);

const server = http.createServer(apiProxy);

server.listen (Number.parseInt (process.env.FLACCO_LISTEN_PORT), process.env.FLACCO_LISTEN_ADDRESS);
