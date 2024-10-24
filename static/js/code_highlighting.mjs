// setup web worker to avoid causing issues for the rendering thread
async function setup(){
    // start fetching css sooner rather than latter
    const baseCssProm = fetch("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css").then(res=>res.text());
    const lightCssProm = fetch("/static/css/light-code.css").then(res=>res.text());
    const darkCssProm = fetch("/static/css/dark-code.css").then(res=>res.text());

    const code = document.querySelectorAll("pre.sourceCode");
    const worker = new Worker('/static/js/code_highlighting_worker.mjs');
    worker.onmessage = (event) => { 
        const [index, newTxt] = event.data;
        code[index].innerHTML = newTxt;
    }
    for(let i = 0;i<code.length;i++){
        worker.postMessage([i, code[i].textContent]);
    }
    for(const c of code){
        c.classList.add("hljs");
    }

    // setting up the css for highlighting with previously fetched css
    const baseStylesheet = new CSSStyleSheet();
    const lightThemeSheet = new CSSStyleSheet();
    const darkThemeSheet = new CSSStyleSheet();

    //shenanigans done to avoid awaiting each promise sequentially
    await Promise.all([
        (async()=>{return await baseStylesheet.replace(await baseCssProm)})(),
        (async()=>{return await lightThemeSheet.replace(await lightCssProm)})(),
        (async()=>{return await darkThemeSheet.replace(await darkCssProm)})(),
    ]);
    document.adoptedStyleSheets.push(baseStylesheet);
    document.adoptedStyleSheets.push(lightThemeSheet);
    document.adoptedStyleSheets.push(darkThemeSheet);

}
addEventListener('load', setup);
if(document.readyState == "complete") await setup();
