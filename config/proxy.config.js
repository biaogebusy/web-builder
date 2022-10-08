const PROXY_CONFIG = [
  {
    context: [
      "/api",
      "/session",
      "/user",
      "/sites",
      "/admin",
      "/manage",
      "/system",
      "/core",
      "/libraries",
      "/modules",
      "/themes",
      "/shs-term-data",
      "/contextual",
      "/webform_rest",
      "/quickedit",
      "/history",
      "/media-library",
      "/autocomplete",
      "/entity_reference_autocomplete",
      "/views/ajax",
      "/batch",
      "/editor",
      "/export",
    ],
    target: "https://api.zhaobg.com",
    secure: false,
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
