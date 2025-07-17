addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const response = await fetch(request)
  const newHeaders = new Headers(response.headers)

  // Allow only fawanews.co.uk to embed your iframe
  newHeaders.set('Content-Security-Policy', "frame-ancestors https://fawanews.co.uk")
  newHeaders.set('X-Frame-Options', 'ALLOW-FROM https://fawanews.co.uk')

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  })
}
