const cacheName = "Demo-1";

// définir les fichiers à mettre en cache
const assets =[
    "/",
    "manifest.json",
    "/index.html",
    //"css/style.css",
    "/images/pwa-logo.png",
];

// pendant l instalation du service worker 
// declare notre cache

// function affiche async() {
//     console.log('hello');
// }
const affiche = async()=>{
    console.log('hello');
}

self.addEventListener('install', async(event) =>{
     const mettreEnCache = async()=>{
        // je viens cherche l objet cache
        //const cache = await caches.open('Demo-1');
        const cache = await caches.open(cacheName);

        // mettre en cache
        //cache.addAll(assets);
        for ( let a of assets){
            cache.add(a);
        }
    }
    event.waitUntil(mettreEnCache());
});

// -----------------------------------------------
// interception
// -----------------------------------------------
self.addEventListener ('fetch', async (event)=>{
    const interception = async ()=>{
        //est ce que c'est dans le cache  ?
        const cacheResponse = await caches.match(event.request);
        if (cacheResponse){
            console.log('ce fichier est ds le cache !',event.request);
            return cacheResponse;
        }else{
            return fetch(event.request);
        }
    }
    event.respondWith(interception())
});