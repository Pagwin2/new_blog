// Cannot use Set-Cookie header for security reasons, use IndexedDB instead

self.addEventListener("fetch", event =>{
    
    //TODO: make an endpoint to set the localStorage up then set the form to go to there and have it HTTP 302 or 307 with handle_html for html responses and handle_redirect for the other case
    event.respondWith((async ()=>{
        const resp = await fetch(event.request);
        const body = await resp.text();
        return new Response(body.replace("<body>", '<body class="toggled">'), {
            headers:resp.headers,
            status: resp.status
        });
    })());
})

async function handle_redirect(req){
    const go_back_to = req.referrer;
    const db_req = self.indexedDB.open("light-dark-store");
    const up_promise = new Promise((res)=>{
        db_req.onupgradeneeded = (event) => {
            const db = event.target.result;
            await IDB_cond_create(db, "light-dark-store", {});
            res();
        }
    };
    const suc_promise = new Promise((res)=>{
        db_req.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction("light-dark-store");
            transaction.oncomplete = res;

            transaction.objectStore("light-dark-store", "readwrite");
            toggleLightDark(transaction);
            transaction.commit();
        };
    };
    await Promise.all([up_promise, suc_promise])
}
function IDB_cond_create(db, objectStoreName, opts={}){
    return new Promise((res)=>{
        if(!db.objectStoreNames.contains(objectStoreName)){
            db.createObjectStore(objectStoreName, opts);
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

async function handle_html(req){
    // TODO: read from indexDB to figure out if we fiddle with the body classes or not
}
