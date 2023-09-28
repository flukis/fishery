const CACHE_ID = "fishery-stein-http-cache";
const CACHE_VERSION = 1;
const CACHE_NAME = `${CACHE_ID}-${CACHE_VERSION}`;

async function fetchAround(req) {
  const [cache, res] = await Promise.all([caches.open(CACHE_NAME), fetch(req)]);
  await cache.put(req, res.clone());
  return res;
}

async function fetchThrough(req) {
  const cache = await caches.open(CACHE_NAME);
  const cacheMatch = await cache.match(req);
  if (typeof cacheMatch !== "undefined") {
    return cacheMatch;
  }
  const res = await fetch(req);
  await cache.put(req, res.clone());
  return res;
}

self.addEventListener("message", async (event) => {
  const { type, url } = event.data;

  if (type === "around") {
    const response = await fetchAround(url);
    self.postMessage(await response.json());
  } else if (type === "through") {
    const response = await fetchThrough(url);
    self.postMessage(await response.json());
  }
});
