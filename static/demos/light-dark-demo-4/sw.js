// Cannot use Set-Cookie header for security reasons, use IndexedDB instead

self.addEventListener("fetch", event =>{
    
    //TODO: make an endpoint to set the localStorage up then set the form to go to there and have it HTTP 302 or 307 with handle_html for html responses and handle_redirect for the other case
    event.respondWith((async ()=>{
        const resp = await fetch(event.request);
        const resp2 = resp.clone();
        const resp3 = resp2.clone();
        const body = await resp2.text();
        const url = new URL(event.request.url);
        console.log(url.pathname);
        if(url.pathname.endsWith("light-dark-toggle")){
            return await handle_redirect(event.request);
        }
        else {
            return await handle_html(event.request, resp3, body);
        }
    })());
})

async function handle_redirect(req){
    const go_back_to = req.referrer;
    const db_req = self.indexedDB.open("light-dark-store");
    const up_promise = new Promise((res)=>{
        db_req.onupgradeneeded = (event) => {
            const db = event.target.result;
            IDB_cond_create(db, "light-dark-store", {keyPath: 'id'}).then(res);
        }
    });
    const suc_promise = new Promise((res)=>{
        db_req.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction("light-dark-store", "readwrite");
            transaction.oncomplete = res;

            transaction.objectStore("light-dark-store", "readwrite");
            toggleLightDark(transaction)
                .then(transaction.commit.bind(transaction))
                .then(res);
        };
    });
    await Promise.all([up_promise, suc_promise]);
    const referrer = request.headers.get('Referer') || '/';
    return new Response("You should be getting redirected back to the page you came from shortly",{
        status: 302,
        headers: {
            'Location': referrer
        }
    });
}
function IDB_cond_create(db, objectStoreName, opts={}){
    return new Promise((res)=>{
        if(!db.objectStoreNames.contains(objectStoreName)){
            db.createObjectStore(objectStoreName, opts);
        }
        res();
    });
}
function toggleLightDark(transaction){
    return new Promise((res)=>{
        const obj_store = transaction.objectStore("light-dark-store");
        const grab = obj_store.get(1);
        grab.onsuccess = (event)=>{
            const val = event.result;
            if(val){
                const yeet = obj_store.delete(1);
                yeet.onsuccess = res;
            }
            else {
                const plonk = obj_store.add({id:1});
                plonk.onsuccess = res;
            }
        }
    });
}

async function handle_html(req, resp, body){
    const db_req = self.indexedDB.open("light-dark-store");
    const up_promise = new Promise((res)=>{
        db_req.onupgradeneeded = (event) => {
            const db = event.target.result;
            IDB_cond_create(db, "light-dark-store", {}).then(res);
        }
    });
    const toggled = await new Promise((res)=>{
        db_req.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction("light-dark-store");
            transaction.oncomplete = res;

            const obj_store = transaction.objectStore("light-dark-store", "readonly");
            const grab = obj_store.get(1);
            grab.onsuccess = (event) => {res(!!event.result)};
        };
    });

    if(!toggled) return resp;

    return new Response(body.replace("<body>", '<body class="toggled">'), {
            headers:resp.headers,
            status: resp.status
        });
}
