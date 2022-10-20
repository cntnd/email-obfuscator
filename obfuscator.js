document.addEventListener("DOMContentLoaded", function (event) {
    document.querySelectorAll(".email").forEach((element, key) => {
        deobfuscate(element);
    });
});

function deobfuscateInText(selector) {
    document.querySelectorAll(selector).forEach((block, key) => {
        const regex = /([^\s]+)\w+\[at\]([^\s]+)\w+\[dot\]+\w([^\s]+)/ig;
        let content = block.innerHTML;
        if (content!==undefined) {
            content.match(regex).forEach((element, key) => {
                let html = generate(element.replace(/\[at\]/ig, '@').replace(/\[dot\]/ig, '.'), undefined, "email");
                content = content.replace(element, html.outerHTML);
            });
            block.innerHTML = content;
        }
    });
}

function deobfuscate(element) {
    let config = element.dataset;
    let css = element.classList;
    let content = element.textContent.replace(/\s+/g, '');
    let html = generate(content.replace(/\[at\]/ig, '@').replace(/\[dot\]/ig, '.'), config, css);
    element.replaceWith(html);
}

function generate(value, config, css) {
    let href = 'mailto:' + value;
    let display = value;
    const template = document.createElement('a');

    // css
    if (css !== undefined){
        template.classList = css;
    }
    // config
    if (config!==undefined){
        if (config.subject) {
            href = href + '?subject=' + config.subject;
        }
        // Body
        if (config.body) {
            let sep = '?';
            if (href.charAt(href.length - 1) === '?') {
                sep = '&';
            }
            href = href + sep + 'body=' + config.body;
        }
        // CC
        if (config.cc) {
            let sep = '?';
            if (href.charAt(href.length - 1) === '?') {
                sep = '&';
            }
            href = href + sep + 'cc=' + config.cc;
        }
        // BCC
        if (config.bcc) {
            let sep = '?';
            if (href.charAt(href.length - 1) === '?') {
                sep = '&';
            }
            href = href + sep + 'bcc=' + config.bcc;
        }
        // Display
        if (config.display) {
            display = config.display;
        }
        // css
        if (config.classReplace) {
            template.classList = config.classReplace;
        }
    }
    template.textContent = display;
    template.setAttribute('href', href);
    return template;
}