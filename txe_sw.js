files = [
	"/txe.html",
	"/txe.css",
	"/txe.js",
	"/wf.css",
	"/nm-r.woff",
	"/mies.woff"
];



self.addEventListener('install', function(e){
	e.waitUntil(
		caches.open('txe001').then(function(cache){
				return cache.addAll(files);
			});
		}).then(function(){
			return self.skipWaiting();
		})
	);
});

self.addEventListener('fetch', function(e){
	e.respondWith(
		caches.match(e.request).then(function(response){
			if (response){
				return response;
			}
			return fetch(e.request);
		});
	);
});

self.addEventListener('activate', function(e){
	e.waitUntil(self.clients.claim());
});
