
const staticCacheName = 'site-static';
////
const staticAssets = [
    '/',
    '/index.html',
    '/pages/restoran.html',
    '/manifest.json',
    '/js/app.js',
    '/img/android-icon-36x36.png',
    '/img/android-icon-48x48.png',
    '/img/android-icon-72x72.png',
    '/img/android-icon-96x96.png',
    '/img/android-icon-144x144.png',
    '/img/android-icon-192x192.png',
    '/img/icon.png',
    '/img/retro2.jpg',
    '/css/w3.css',
    '/css/styles.css',
    '/img/pizza.jpg',
    '/img/chef.jpg',
    '/img/onepage_restaurant.jpg',
    '/img/map.jpg',
    '/fonts/AmaticSC-Regular.ttf',
    '/fonts/AmaticSC-Bold.ttf',
];


self.addEventListener('install', async eventObject => {
   

    // kreiramo kes, ako postoji otvaramo
    const cache = await caches.open(staticCacheName);
    // dodajemo asete u kes
    await cache.addAll(staticAssets);


    return self.skipWaiting();
   
}); 


self.addEventListener('activate', eventObject => {
    //console.log("Service worker has been activated.");
});
//asdas
self.addEventListener('fetch', eventObject => {
   // console.log("Fetch event.", eventObject);
    // fetch event ima properti request - taj request se salje serveru
    const zahtev = eventObject.request;
    eventObject.respondWith(vratiIzKesMemorije(zahtev));
  
});


async function vratiIzKesMemorije(zahtev) {
    const kes = await caches.open(staticCacheName);
    const kesiraniPodaci = await kes.match(zahtev);
    // ako nemamo zahtevan resurs u kesu onda saljemo zahtev serveru
    // u ovom slucaju svi zahtevani podaci su vec u kes memoriji, ali bez fetch() dela 
    // dobijao sam gresku
    // GET chrome-extension://elgalmkoelokbchhkhacckoklkejnhcd/build/ng-validate.js net::ERR_FAILED
    return kesiraniPodaci || fetch(zahtev);
}


