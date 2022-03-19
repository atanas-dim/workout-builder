const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    runtimeCaching,
    register: false,
    skipWaiting: false,
    disable: process.env.NODE_ENV === "development",
    sw: "/sw.js",
    dynamicStartUrlRedirect: "/login",
  },
});
