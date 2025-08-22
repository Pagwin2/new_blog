// Cannot use Set-Cookie header for security reasons, use IndexedDB instead

self.addEventListener("fetch", event =>{
    
    //TODO: make an endpoint to set the localStorage up then set the form to go to there and have it HTTP 302 or 307
    event.respondWith((async ()=>{
        const resp = await fetch(event.request);
        const body = await resp.text();
        return new Response(body.replace("<body>", '<body class="toggled">'), {
            headers:resp.headers,
            status: resp.status
        });
    })());
})
