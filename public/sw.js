if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let a={};const c=e=>i(e,t),o={module:{uri:t},exports:a,require:c};s[t]=Promise.all(n.map((e=>o[e]||c(e)))).then((e=>(r(...e),a)))}}define(["./workbox-1846d813"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/168-d3f2441ec453e1c2.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/18-9d92396cc4b8659f.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/29107295-a2d0c8e72019a3ed.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/466-55295c3204df3b39.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/523-6950e202b4bd1329.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/611-e2cb86ad6c18c06d.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/72-9dad1043b0615b9b.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/bee240a3-ac4ef186a20d33d1.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/framework-91d7f78b5b4003c8.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/main-d434a5b88dc97aac.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/pages/_app-8d9b7f4eed04c002.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/pages/index-e0acc193ce1159a9.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/pages/login-943da7ff00b15402.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/pages/register-afb52741cb9d1e27.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/pages/routine-editor-56f6d5b0ef01dfe4.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/pages/welcome-ef75b2eb53709eaf.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/pages/workout-editor-ed85802aae0aa940.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/pages/workouts-f63c158218ef9692.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/chunks/webpack-c66a1cc0a3689c22.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/css/7ed17e99eafdb6a2.css",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/xid6IrRDwO4r_2JIGJ00H/_buildManifest.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/xid6IrRDwO4r_2JIGJ00H/_middlewareManifest.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/_next/static/xid6IrRDwO4r_2JIGJ00H/_ssgManifest.js",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/favicon.ico",revision:"823e5f66387cb5aa5ffa8400a97ddae6"},{url:"/icons/icon-128.png",revision:"db9c41cb38133cda51d7d565ec48295e"},{url:"/icons/icon-144.png",revision:"d64d74f9a7ae206921d9774b0dd38663"},{url:"/icons/icon-152.png",revision:"6e0f6f5eec9aa6ba7f3f2848cd062661"},{url:"/icons/icon-192.png",revision:"269eefb72c17d496d6e0a71d3109cea0"},{url:"/icons/icon-384.png",revision:"fd9f1ef184e047a5bf0128e19c57e809"},{url:"/icons/icon-512.png",revision:"d906b12803bbc559baaf93896d1f3188"},{url:"/icons/icon-72.png",revision:"1ff39d97c230cfd5d3e6ecfae434cf97"},{url:"/icons/icon-96.png",revision:"18f76af996a48f4df4556399e671cb78"},{url:"/images/exercise-placeholder.jpg",revision:"ab8e70e01469b88dac7df9092e0e6ef9"},{url:"/login",revision:"xid6IrRDwO4r_2JIGJ00H"},{url:"/manifest.json",revision:"8e5d9a1897721b732cf1aacad1e2cdab"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
