const PROXY_CONFIG = [
  {
    context: ["/api", "/sites"],
    target: "https://api.zhaobg.com",
    secure: false,
    logLevel: "debug",
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
