﻿const ud = "2022_0603_2140";
const cn = "txe003";

var port2;
self.addEventListener('message', i);
function i(e) {
	port2 = e.ports[0];
	port2.onmessage = onMessage;
}
function onMessage(s) {
	if(s.data == "getdate"){
		port2.postMessage(ud);
	}
}

const ar2c = async () => {
	const cache = await caches.open(cn);
	await cache.addAll([
		"/txe.html",
		"/txe.css",
		"/txe.js",
		"/wf.css",
	]);
};

self.addEventListener("install", (e) => {
	e.waitUntil(ar2c());
});

const pinc = async (req, res) => {
	const c = await caches.open(cn);
	await c.put(req, res);
}

const c1st = async (req) => {
	const rfc = await caches.match(req);
	if (rfc) {
		return rfc;
	}
	const rfn = await fetch(req);
	pinc(req, rfn.clone())
	return rfn;
};

self.addEventListener('fetch', (e) => {
	e.respondWith(c1st(e.request));
});

self.addEventListener('activate', function(e){
	e.waitUntil(self.clients.claim());
});

const delc = async key => {
	await caches.delete(key)
}

const deloc = async () => {
	const keepl = [cn];
	const keyl = await caches.keys()
	const c2del = keyl.filter(key => !keepl.includes(key))
	await Promise.all(c2del.map(delc));
}

self.addEventListener('activate', (e) => {
	e.waitUntil(deloc());
});
