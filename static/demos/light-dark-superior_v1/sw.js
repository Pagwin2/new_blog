"use strict";

// @returns Response
// https://developer.mozilla.org/en-US/docs/Web/API/Response
async function fetchResponse(event) {
    //https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/request
    //https://developer.mozilla.org/en-US/docs/Web/API/Request
    const { request } = event;
    const resp = await fetch(request);
    const body = await resp.text();
    const cookies = resp.headers.getSetCookie();
    let theme_toggled = false;
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key != "theme_toggled") {
            continue;
        }
        theme_toggled = value[0] === "t";
    }
    // this is a brittle way of accomplishing our desired behavior
    body.replace(`<input id="css_state" type="checkbox" hidden>`,
        `<input id="css_state" type="checkbox" hidden ${theme_toggled ? "checked" : ""}>`);
    console.log(body);
    return new Response(body, resp);
}

self.addEventListener('fetch', (event) => {
    if (!event.request.url.endsWith(".html")) return;
    //https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith
    event.respondWith(fetchResponse(event));
})
