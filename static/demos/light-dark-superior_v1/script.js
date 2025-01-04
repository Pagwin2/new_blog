"use strict";

const toggle_button = document.body.querySelector("#light_dark_toggle");
const root = document.body.parentElement;

toggle_button.addEventListener("click", (event) => {

    // js will handle the needed logic so no need for a HTTP form submission
    event.preventDefault();


    // !== could be used but the check is to see if the attribute is "true"
    // this writing is intend to make that clearer
    const theme_toggled = !(root.getAttribute("toggletheme")?.at(0) === "t");

    // set the cookie so backend/service worker can do it's thing
    // cookies have other options you may wanna set especially
    // if you're using them for anything else but for this
    // use case I see no reason to care
    document.cookie = `theme_toggled=${theme_toggled}`;


    root.setAttribute("toggletheme", theme_toggled);
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
        scope: "/static/demos/light-dark-superior_v1/"
    });
}
