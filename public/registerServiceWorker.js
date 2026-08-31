// self-destroying worker to remove old worker from previous PWA site at ryanpaixao.com

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', async () => {
  await self.registration.unregister()
  const keys = await caches.keys()
  await Promise.all(keys.map((k) => caches.delete(k)))
  const clients = await self.clients.matchAll({ type: 'window' })
  clients.forEach((c) => c.navigate(c.url))
})