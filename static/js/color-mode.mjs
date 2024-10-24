// this script is intentionally not a module so it'll block loading the document until we set color mode

// shamelessly stolen from https://www.joshwcomeau.com/react/dark-mode/
function getInitialColorMode() {
  const persistedColorPreference =
    window.localStorage.getItem('color-mode');
  const hasPersistedPreference =
    typeof persistedColorPreference === 'string';

  // If the user has explicitly chosen light or dark,
  // let's use it. Otherwise, this value will be null.
  if (hasPersistedPreference) {
    return persistedColorPreference;
  }

  // If they haven't been explicit, let's check the media query
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const hasMediaQueryPreference = typeof mql.matches === 'boolean';

  if (hasMediaQueryPreference) {
    return mql.matches ? 'dark' : 'light';
  }

  // If they are using a browser/OS that doesn't support
  // color themes, let's default to 'light'.
  return 'light';
}
function setMode(mode){
    if(document.body.classList.contains("light")){
        document.body.classList.replace("light", mode);
    }
    else if (document.body.classList.contains("dark")){
        document.body.classList.replace("dark", mode);
    }
    else {
        document.body.classList.add(color_mode);
    }
    localStorage.setItem("color-mode", mode);
}
// repeats set code but who cares, the logic is different
function toggleMode(){
    let mode;
    if(document.body.classList.contains("light")){
        document.body.classList.replace("light", "dark");
        mode = "dark";
    }
    else if (document.body.classList.contains("dark")){
        document.body.classList.replace("dark", "light");
        mode = "light";
    }
    else {
        throw new Error("cannot toggle theme it isn't set yet");
    }
    localStorage.setItem("color-mode", mode);
}

// start grabbing the css in the background
const bg_css = (async ()=>{
    const css_txt = fetch("/static/css/default.css").then(res=>res.text());
    const css = new CSSStyleSheet();
    await css.replace(await css_txt);
    return css;
})();

// set color mode
const color_mode = getInitialColorMode();
setMode(color_mode);

// now that color mode is set lets go actually set the css
document.adoptedStyleSheets.push(await bg_css);
