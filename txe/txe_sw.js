const ud = "2022_0925_2032"; //＊＊＊更新日時＊＊＊

const cn = "txe001";
const fls = [
	"/txe/txe.html",
	"/txe/txe.css",
	"/txe/txe.js",
	"/txe/wf.css"
];

self.addEventListener('message', e =>  {
	if(e.data == "getdate"){
		self.clients.matchAll().then(clients =>
		clients.forEach(client => client.postMessage(ud)));
	}
});


self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open(cn).then(function(c) {
			return c.addAll(fls);
		}).then(function() {
			return self.skipWaiting();
		})
	);
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

const delc = async key => {
	await caches.delete(key)
}

const deloc = async () => {
	const keepl = [cn];
	const keyl = await caches.keys()
	const c2del = keyl.filter(key => !keepl.includes(key))
	await Promise.all(c2del.map(delc));
}

self.addEventListener('activate', function(e){
	e.waitUntil(self.clients.claim());
	e.waitUntil(deloc());
});
