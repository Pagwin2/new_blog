"use strict";

const toggle_button = document.body.querySelector("#light_dark_toggle");
const css_state_checkbox = document.body.querySelector("#css_state");

// this does nothing but I was hoping it would let my LSP figure out 
// that css_state_checkbox is an input element so the remaining code 
// is valid
// Real use case might still find this useful as self documenting code
console.assert(css_state_checkbox instanceof HTMLInputElement);

toggle_button.addEventListener("click", (event) => {

    // js will handle the needed logic so no need for a HTTP form submission
    event.preventDefault();


    const theme_toggled = !css_state_checkbox.checked;

    // set the cookie so backend/service worker can do it's thing
    // cookies have other options you may wanna set especially
    // if you're using them for anything else but for this
    // use case I see no reason to care
    document.cookie = `theme_toggled=${theme_toggled}`;


    css_state_checkbox.checked = theme_toggled;
});

// If you wanna implement this for a site with a backend
// then feel free to ignore everything below I need it because
// I'm using github pages to host this rather than a proper
// backend
if (!("serviceWorker" in navigator)) {
    alert("Your browser doesn't support service workers so this demo won't work properly.");

}
else setupServiceWorker();
async function setupServiceWorker() {
    await navigator.serviceWorker.register("sw.js", {
        // we only need to interact with index.html for this demo
        scope: "./index.html"
    });
}
