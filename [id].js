export async function onRequest(context) {
  const { params, request } = context;
  const id = params.id;
  
  // Proxy the request to the worker
  const workerUrl = `https://nextgen-ai-api.kitentyaluth.workers.dev/property/${id}`;
  
  try {
    const resp = await fetch(workerUrl, {
      method: request.method,
      headers: request.headers,
    });
    
    // Return the response with the original domain preserved
    const html = await resp.text();
    return new Response(html, {
      status: resp.status,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'no-cache',
      }
    });
  } catch(e) {
    return new Response('Error loading property page. Please try again.', { status: 500 });
  }
}
