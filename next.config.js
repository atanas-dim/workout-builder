const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    runtimeCaching,
    register: true,
    disable: process.env.NODE_ENV === "development",
    sw: "/sw.js",
    dynamicStartUrlRedirect: "/login",
  },
  // target: "serverless",
  // async rewrites() {
  //   return [
  //     // Rewrite everything to `pages/index`
  //     {
  //       source: "/:any*",
  //       destination: "/",
  //     },
  //   ];
  // },
});
