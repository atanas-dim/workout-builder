if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,t)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const o=e=>n(e,a),r={module:{uri:a},exports:c,require:o};s[a]=Promise.all(i.map((e=>r[e]||o(e)))).then((e=>(t(...e),c)))}}define(["./workbox-1846d813"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/236-d07155221ff3de03.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/chunks/29107295-a2d0c8e72019a3ed.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/chunks/614-63939b3689e5b328.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/chunks/806-4b94c1c4a867f9d4.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/chunks/954-1d9dac0a9b887e3c.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/chunks/bee240a3-ac4ef186a20d33d1.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/chunks/framework-91d7f78b5b4003c8.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/chunks/main-d434a5b88dc97aac.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/chunks/pages/_app-2645bfa843acbf52.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/chunks/pages/index-08f2597ddaba17f5.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/chunks/pages/login-75cec56f15d374f8.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/chunks/pages/register-a36665ebfccea5ff.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/chunks/pages/welcome-ef75b2eb53709eaf.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/chunks/pages/workout-editor-3161092b87d5d7ac.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/chunks/pages/workouts-73f68c2dd55dfdff.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/chunks/webpack-c66a1cc0a3689c22.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/css/a96c2709ee53cb92.css",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/zRhm8FYqe6w4-RR80OqsU/_buildManifest.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/zRhm8FYqe6w4-RR80OqsU/_middlewareManifest.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/_next/static/zRhm8FYqe6w4-RR80OqsU/_ssgManifest.js",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/favicon.ico",revision:"dc93ebaaa8e4c8362ee34a7851f26011"},{url:"/icons/icon-128.png",revision:"631be620afe1b386ff76a01b259b4730"},{url:"/icons/icon-144.png",revision:"82c596905f1866b0c72e36815d477efc"},{url:"/icons/icon-152.png",revision:"5558d3ec9860bb573421c7e1ef213e54"},{url:"/icons/icon-192.png",revision:"5ff00c24696f08e14f688a0fbd056092"},{url:"/icons/icon-384.png",revision:"9de3f34e3bd55a840342308a52bd9c56"},{url:"/icons/icon-512.png",revision:"a72f79a81180588ae86f1ab819ca48b1"},{url:"/icons/icon-72.png",revision:"b5803c3781164d57459d3d43b7f70c8f"},{url:"/icons/icon-96.png",revision:"6f6e56892afce0255f0de0d024d8f415"},{url:"/images/exercise-placeholder.jpg",revision:"ab8e70e01469b88dac7df9092e0e6ef9"},{url:"/login",revision:"zRhm8FYqe6w4-RR80OqsU"},{url:"/logo.svg",revision:"2b8b3261b640345aeb3e1100bfac86a4"},{url:"/manifest.json",revision:"09aa219b84082525cc08fc80e1e1d2a6"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
