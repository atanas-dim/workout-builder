if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,t)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let a={};const r=e=>i(e,c),o={module:{uri:c},exports:a,require:r};s[c]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(t(...e),a)))}}define(["./workbox-1846d813"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/168-9a2b71b20e87c8ea.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/27-f4b686983dd3e9dc.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/29107295-fbcfe2172188e46f.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/3-925b00ed51fe2b50.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/37-9c7fd9c93f3cbc60.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/453-bb0dd6ad1828b549.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/522-f369ecf685f3b61e.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/bee240a3-e7f541281d9837c3.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/main-073772792dee32dd.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/pages/_app-bdfb0f51363f7bfe.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/pages/_error-1995526792b513b2.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/pages/index-ddcc5749cd6befe1.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/pages/login-9013a20db947580f.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/pages/register-6e8170b6fb8faa36.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/pages/routine-editor-77bf5a414d326690.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/pages/welcome-6ed775a4facbaf85.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/pages/workout-editor-8dd88b5e3c686636.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/pages/workouts-b93dc4e402266ac7.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/chunks/webpack-434fefa8f39d8fbc.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/css/cebb0ab1000f8244.css",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/hLwNK5TpFIWBjfiEzwHQG/_buildManifest.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/hLwNK5TpFIWBjfiEzwHQG/_middlewareManifest.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/_next/static/hLwNK5TpFIWBjfiEzwHQG/_ssgManifest.js",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/favicon.ico",revision:"2399f6a597c7d5f5fdb5c6a1538d3735"},{url:"/icons/icon-128.png",revision:"5df478bd36fd08f009bfdf79b149d770"},{url:"/icons/icon-144.png",revision:"4c0482b3ec02f711e9aedbdc412a024b"},{url:"/icons/icon-152.png",revision:"0faf0f1c679a2505ff0bd1737a5ea5c2"},{url:"/icons/icon-192.png",revision:"6affc75a8180badfc63eeed028656ff8"},{url:"/icons/icon-384.png",revision:"f9de861dd53b92a471bd02f762d97b21"},{url:"/icons/icon-512.png",revision:"abebe9addeff52e4c598c175a1ad52ad"},{url:"/icons/icon-72.png",revision:"1849fa8638d611a2781d8b74eb663b53"},{url:"/icons/icon-96.png",revision:"ee8f720417ba2a1578485ecf869966bf"},{url:"/images/exercise-placeholder.jpg",revision:"ab8e70e01469b88dac7df9092e0e6ef9"},{url:"/login",revision:"hLwNK5TpFIWBjfiEzwHQG"},{url:"/manifest.json",revision:"73c345466df6680c698fd8c96c1f93fd"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
