self.addEventListener("fetch", event =>{
    
    event.respondWith((async ()=>{
        const resp = await fetch(event.request);
        const body = await resp.text();
        new Response(body.replace("<body>", '<body class="toggled">'), {
            ...resp
        });
    })());
})
