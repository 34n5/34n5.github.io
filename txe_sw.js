const ar2c = async (r) => {
	const cache = await caches.open("txe001");
	await cache.addAll(r);
};

self.addEventListener("install", (e) => {
	e.waitUntil(
		ar2c([
			"/txe.html",
			"/txe.css",
			"/txe.js",
			"/wf.css",
			"/nm-r.woff",
			"/mies.woff",
		])
	);
});

const pinc = async (req, res) => {
	const c = await caches.open("txe001");
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
	const keepl = ['txe001'];
	const keyl = await caches.keys()
	const c2del = keyl.filter(key => !keepl.includes(key))
	await Promise.all(c2del.map(delc));
}

self.addEventListener('activate', (e) => {
	e.waitUntil(deloc());
});
