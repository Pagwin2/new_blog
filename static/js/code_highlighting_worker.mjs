onmessage = (event) => {
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js');
    
    const [index, txt] = event.data;
    const result = self.hljs.highlightAuto(txt);
    postMessage([index, result.value]);
};
